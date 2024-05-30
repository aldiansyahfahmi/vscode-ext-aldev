"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDependenciesToYamlString = exports.addDependency = exports.InsertionMethod = void 0;
const fs = __importStar(require("fs"));
const vscode = __importStar(require("vscode"));
const YAML = __importStar(require("yaml"));
const types_1 = require("yaml/types");
const formatIfOpened_1 = require("../helper/formatIfOpened");
const getFileContext_1 = require("../helper/getFileContext");
const getPubspecText_1 = require("../helper/getPubspecText");
const getSettings_1 = require("../helper/getSettings");
const getValue_1 = require("../helper/getValue");
const messaging_1 = require("../helper/messaging");
const pubApi_1 = require("../model/pubApi");
var InsertionMethod;
(function (InsertionMethod) {
    InsertionMethod["ADD"] = "Added";
    InsertionMethod["REPLACE"] = "Replaced";
})(InsertionMethod || (exports.InsertionMethod = InsertionMethod = {}));
async function addDependency(dependencyType) {
    const api = new pubApi_1.PubAPI();
    const context = {
        ...(0, getFileContext_1.getFileContext)(),
        settings: (0, getSettings_1.getSettings)(),
        dependencyType: dependencyType,
    };
    if (!context.openInEditor && !fs.existsSync(context.path)) {
        (0, messaging_1.showError)(new Error("Pubspec file not found in workspace root. " + "Open the pubspec file you would like to edit and try again."));
        return;
    }
    const packageQueries = dependencyType == "dependencies" ? await getPackageNames(context) : await getDevPackageNames(context);
    if (packageQueries.length === 0) {
        return;
    }
    const packagesToAdd = [];
    for (const query of packageQueries) {
        const searchingMessage = setMessage({
            message: `Looking for package '${query}'...`,
        });
        const res = await (0, getValue_1.getValue)(() => api.smartSearchPackage(query));
        if (!res) {
            continue;
        }
        const searchResult = res.result;
        searchingMessage.dispose();
        if (searchResult.packages.length === 0) {
            (0, messaging_1.showInfo)(`Package with name '${packageQueries}' not found.`);
            continue;
        }
        const chosenPackageString = searchResult.packages.length === 1 ? searchResult.packages[0] : await selectFrom(query, searchResult.packages);
        if (!chosenPackageString) {
            continue;
        }
        if (chosenPackageString.startsWith("dart:")) {
            (0, messaging_1.showInfo)('You don\'t need to add a "dart:" package as a dependency; ' + "they're preinstalled and can be imported directly.");
            continue;
        }
        const gettingPackageMessage = setMessage({
            message: `Getting info for package '${chosenPackageString}'...`,
        });
        const chosenPackageResponse = await (0, getValue_1.getValue)(() => api.getPackage(chosenPackageString));
        gettingPackageMessage.dispose();
        if (!chosenPackageResponse) {
            continue;
        }
        packagesToAdd.push(chosenPackageResponse.result);
    }
    if (packagesToAdd.length === 0) {
        return;
    }
    try {
        (0, formatIfOpened_1.formatIfOpened)(context);
        const pubspecString = (0, getPubspecText_1.getPubspecText)(context);
        const pubspecParserResult = addDependenciesToYamlString({
            context,
            pubspecString,
            newPackages: packagesToAdd,
        });
        if (!pubspecParserResult.success) {
            (0, messaging_1.showError)(Error(pubspecParserResult.error));
            return;
        }
        let newPubspecString = pubspecParserResult.result;
        if (context.openInEditor) {
            const originalLines = pubspecString.split("\n");
            vscode.window.activeTextEditor.edit((editBuilder) => {
                editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(originalLines.length - 1, originalLines[originalLines.length - 1].length)), newPubspecString);
            });
        }
        else {
            fs.writeFileSync(context.path, newPubspecString, "utf-8");
        }
        (0, formatIfOpened_1.formatIfOpened)(context);
        const infoText = packagesToAdd.length === 1
            ? `Added/updated '${packagesToAdd[0].name}' (version ${packagesToAdd[0].latestVersion})${!context.settings.sortDependencies ? "" : " and sorted file"}.`
            : `Added/updated ${packagesToAdd.length} packages and sorted file.`;
        (0, messaging_1.showInfo)(infoText);
    }
    catch (error) {
        (0, messaging_1.handleCriticalError)(error);
    }
}
exports.addDependency = addDependency;
function addDependenciesToYamlString({ context, pubspecString, newPackages }) {
    const options = {
        schema: "core",
    };
    const pubspecDoc = YAML.parseDocument(pubspecString, options);
    for (const newPackage of newPackages) {
        const versionString = `${context.settings.useCaretSyntax ? "^" : ""}${newPackage.latestVersion}`;
        const dependencyPath = pubspecDoc.get(context.dependencyType, true);
        const dependencyPathIsEmpty = dependencyPath === null || dependencyPath === undefined;
        const dependencyPathIsYAMLMap = dependencyPath instanceof types_1.YAMLMap;
        if ((dependencyPathIsEmpty || !dependencyPathIsYAMLMap) && !pubspecDoc.contents) {
            pubspecDoc.contents = new types_1.YAMLMap();
        }
        const existingDependencies = dependencyPathIsEmpty ? {} : dependencyPathIsYAMLMap ? dependencyPath.toJSON() : dependencyPath;
        pubspecDoc.set(context.dependencyType, {
            ...existingDependencies,
            [newPackage.name]: versionString,
        });
    }
    const result = pubspecDoc.toString();
    return { success: true, result };
}
exports.addDependenciesToYamlString = addDependenciesToYamlString;
async function getPackageNames(context) {
    const rawResult = "alice,connectivity_plus,dartz,dio,equatable,flutter_bloc,flutter_svg,get_it,shared_preferences,shimmer";
    if (!rawResult) {
        return [];
    }
    return rawResult
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter((s) => s.length > 0);
}
async function getDevPackageNames(context) {
    const rawResult = "build_runner,flutter_gen_runner";
    if (!rawResult) {
        return [];
    }
    return rawResult
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter((s) => s.length > 0);
}
function setMessage({ message, labelIcon = "sync~spin" }) {
    return vscode.window.setStatusBarMessage(`$(${labelIcon}) ${message}`);
}
function selectFrom(original, items) {
    return vscode.window.showQuickPick(items, {
        canPickMany: false,
        matchOnDescription: true,
        placeHolder: `Search results for "${original}"`,
    });
}
//# sourceMappingURL=addDependency.js.map