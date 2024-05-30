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
exports.handleCriticalError = exports.showRetryableError = exports.showError = exports.showInfo = void 0;
const vscode = __importStar(require("vscode"));
const web_1 = require("./web");
var ErrorOptionType;
(function (ErrorOptionType) {
    ErrorOptionType["report"] = "Report issue";
    ErrorOptionType["ignore"] = "Ignore";
    ErrorOptionType["tryAgain"] = "Try Again";
    ErrorOptionType["close"] = "Close";
})(ErrorOptionType || (ErrorOptionType = {}));
let criticalErrorOptions = [{ title: ErrorOptionType.report }, { title: ErrorOptionType.ignore }];
let retryableErrorOptions = [{ title: ErrorOptionType.tryAgain }, { title: ErrorOptionType.close }];
function showInfo(message) {
    return vscode.window.showInformationMessage(message);
}
exports.showInfo = showInfo;
function showError(error, isCritical = false) {
    if (!isCritical) {
        vscode.window.showErrorMessage(error.message);
    }
    else {
        vscode.window
            .showErrorMessage(`A critical error has occurred.\n
      If this happens again, please report it.\n\n

      Error message: ${error.message}`, {}, ...criticalErrorOptions)
            .then((option) => {
            if (option) {
                handleErrorOptionResponse(option.title, error);
            }
        });
    }
}
exports.showError = showError;
async function showRetryableError(error) {
    const response = await vscode.window.showWarningMessage(`An error has occurred:\n${error.message}`, {}, ...retryableErrorOptions);
    return !!response && response.title === ErrorOptionType.tryAgain;
}
exports.showRetryableError = showRetryableError;
function handleErrorOptionResponse(option, error) {
    switch (option) {
        case ErrorOptionType.report:
            (0, web_1.openNewGitIssueUrl)(error);
            break;
        default:
            break;
    }
}
function handleCriticalError(error) {
    if (error instanceof Error) {
        if (error.message.includes("Document with errors cannot be stringified")) {
            showError(new Error("Your pubspec YAML file is invalid or contains errors. " + "Please fix them and try again."));
        }
        else {
            showError(error, true);
        }
    }
    else {
        showError(new Error(`Unknown error: ${error}`), true);
    }
}
exports.handleCriticalError = handleCriticalError;
//# sourceMappingURL=messaging.js.map