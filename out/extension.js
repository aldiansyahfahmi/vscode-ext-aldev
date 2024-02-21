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
const init_js_1 = require("./command/init.js");
const new_bloc_js_1 = require("./command/new-bloc.js");
const new_cubit_js_1 = require("./command/new-cubit.js");
const new_feature_js_1 = require("./command/new-feature.js");
const new_usecase_js_1 = require("./command/new-usecase.js");
function activate(context) {
    console.log('Congratulations, your extension "vscode-ext-aldev" is now active!');
    let disposable = vscode.commands.registerCommand("vscode-ext-aldev.helloWorld", () => {
        vscode.window.showInformationMessage("Hello World from vscode-ext-aldev!");
    });
    context.subscriptions.push(disposable);
    (0, new_feature_js_1.newFeature)(context);
    (0, new_cubit_js_1.newCubit)(context);
    (0, new_bloc_js_1.newBloc)(context);
    (0, new_usecase_js_1.newUseCase)(context);
    (0, init_js_1.init)(context);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map