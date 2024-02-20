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
exports.newFeature = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const vscode = __importStar(require("vscode"));
const is_name_valid_js_1 = require("../utils/is-name-valid.js");
const show_input_box_js_1 = require("../utils/show-input-box.js");
async function newFeature(context) {
    let generateFolder = vscode.commands.registerCommand("vscode-ext-aldev.newFeature", async (uri) => {
        // Menampilkan form input
        let inputName = await (0, show_input_box_js_1.showInputBox)("Enter feature name");
        // Cek apakah inputName valid
        if (!(0, is_name_valid_js_1.isNameValid)(inputName)) {
            vscode.window.showErrorMessage("The name must not be empty");
            return;
        }
        // Uri menyediakan path ke folder yang diklik kanan
        const basePath = uri.fsPath;
        // Struktur folder utama dan subfolder
        const structure = {
            [inputName]: {
                data: ["datasource", "mapper", "models", "repositories"],
                domain: ["entities", "repositories", "usecases"],
                presentation: ["screen"],
            },
        };
        // Fungsi rekursif untuk membuat struktur folder
        function createFolders(base, structure) {
            Object.keys(structure).forEach((folder) => {
                const folderPath = path.join(base, folder);
                if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath, { recursive: true });
                }
                const subStructure = structure[folder];
                // Membuat subfolder
                if (typeof subStructure === "object" && !Array.isArray(subStructure)) {
                    createFolders(folderPath, subStructure);
                }
                else if (Array.isArray(subStructure)) {
                    subStructure.forEach((subFolder) => {
                        const subFolderPath = path.join(folderPath, subFolder);
                        if (!fs.existsSync(subFolderPath)) {
                            fs.mkdirSync(subFolderPath, { recursive: true });
                        }
                    });
                }
            });
        }
        // Membuat struktur folder
        createFolders(basePath, structure);
        vscode.window.showInformationMessage("Feature folders created successfully!");
    });
    context.subscriptions.push(generateFolder);
}
exports.newFeature = newFeature;
//# sourceMappingURL=new-feature.js.map