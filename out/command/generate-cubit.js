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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newCubit = void 0;
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const vscode = __importStar(require("vscode"));
const is_name_valid_1 = require("../utils/is-name-valid");
const show_input_box_1 = require("../utils/show-input-box");
async function newCubit(context) {
    let generateFolder = vscode.commands.registerCommand("vscode-ext-aldev.newCubit", async (uri) => {
        // Menampilkan form input
        let inputName = await (0, show_input_box_1.showInputBox)("Enter cubit name");
        // Cek apakah inputName valid
        if (!(0, is_name_valid_1.isNameValid)(inputName)) {
            vscode.window.showErrorMessage("The name must not be empty");
            return;
        }
        // Uri menyediakan path ke folder yang diklik kanan
        const basePath = uri.fsPath;
        function createCubit(basePath, folderName, files) {
            // Path untuk folder baru
            const folderPath = path_1.default.join(basePath, folderName);
            // Membuat folder jika belum ada
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }
            // Membuat file-file dalam folder
            files.forEach((file) => {
                const filePath = path_1.default.join(folderPath, file.name);
                fs.writeFileSync(filePath, file.content);
            });
            console.log(`'${folderName} Cubit' berhasil dibuat.`);
        }
        const files = [
            { name: `${inputName}_cubit.dart`, content: "Isi dari file1" },
            { name: `${inputName}_state.dart`, content: "Isi dari file2" },
        ];
        // Membuat struktur folder
        createCubit(basePath, inputName, files);
        vscode.window.showInformationMessage("Feature folders created successfully!");
    });
    context.subscriptions.push(generateFolder);
}
exports.newCubit = newCubit;
//# sourceMappingURL=generate-cubit.js.map