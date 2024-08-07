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
exports.newCubit = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const vscode = __importStar(require("vscode"));
const cubit_template_js_1 = require("../templates/feature/presentation/cubit/cubit.template.js");
const cubit_state_template_js_1 = require("../templates/feature/presentation/cubit/cubit_state.template.js");
const is_name_valid_js_1 = require("../utils/is-name-valid.js");
const show_input_box_js_1 = require("../utils/show-input-box.js");
async function newCubit(context) {
    let generateFolder = vscode.commands.registerCommand("vscode-ext-aldev.newCubit", async (uri) => {
        // Menampilkan form input
        let inputName = await (0, show_input_box_js_1.showInputBox)("Cubit name");
        // Cek apakah inputName valid
        if (!(0, is_name_valid_js_1.isNameValid)(inputName)) {
            vscode.window.showErrorMessage("The name must not be empty");
            return;
        }
        const typeOptions = ["Basic", "Pagination"];
        const typeSelected = await vscode.window.showQuickPick(typeOptions, {
            placeHolder: "Select Type",
        });
        if (!(0, is_name_valid_js_1.isNameValid)(typeSelected)) {
            vscode.window.showErrorMessage("The type must not be empty");
            return;
        }
        // Uri menyediakan path ke folder yang diklik kanan
        const basePath = uri.fsPath;
        function create(basePath, folderName, files) {
            // Path untuk cubit baru
            const folderPath = path.join(basePath, `${folderName}_cubit`);
            // Membuat folder jika belum ada
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }
            // Membuat file-file dalam folder
            files.forEach((file) => {
                const filePath = path.join(folderPath, file.name);
                fs.writeFileSync(filePath, file.content);
            });
        }
        const cubitName = inputName?.toLowerCase();
        const files = [
            { name: `${cubitName}_cubit.dart`, content: typeSelected == "Basic" ? (0, cubit_template_js_1.getCubitTemplate)(cubitName) : (0, cubit_template_js_1.getCubitWithPaginationTemplate)(cubitName) },
            { name: `${cubitName}_state.dart`, content: (0, cubit_state_template_js_1.getCubitStateTemplate)(cubitName) },
        ];
        // Membuat struktur folder
        create(basePath, cubitName, files);
        vscode.window.showInformationMessage("Cubit created successfully!");
    });
    context.subscriptions.push(generateFolder);
}
exports.newCubit = newCubit;
//# sourceMappingURL=new-cubit.js.map