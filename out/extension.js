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
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const command_1 = require("./command");
const new_domain_1 = require("./command/new-domain");
const new_presentation_1 = require("./command/new-presentation");
function activate(context) {
    console.log('Congratulations, your extension "vscode-ext-aldev" is now active!');
    let disposable = vscode.commands.registerCommand("vscode-ext-aldev.helloWorld", () => {
        vscode.window.showInformationMessage("Hello World from vscode-ext-aldev!");
    });
    context.subscriptions.push(disposable);
    (0, command_1.newFeature)(context);
    (0, command_1.newCubit)(context);
    (0, command_1.newBloc)(context);
    (0, command_1.newUseCase)(context);
    (0, command_1.init)(context);
    (0, new_domain_1.newDomain)(context);
    (0, new_presentation_1.newPresentation)(context);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map