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
exports.newBloc = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const vscode = __importStar(require("vscode"));
const bloc_template_js_1 = require("../templates/feature/presentation/bloc/bloc.template.js");
const bloc_event_template_js_1 = require("../templates/feature/presentation/bloc/bloc_event.template.js");
const bloc_state_template_js_1 = require("../templates/feature/presentation/bloc/bloc_state.template.js");
const is_name_valid_js_1 = require("../utils/is-name-valid.js");
const show_input_box_js_1 = require("../utils/show-input-box.js");
async function newBloc(context) {
    let generateFolder = vscode.commands.registerCommand("vscode-ext-aldev.newBloc", async (uri) => {
        // Menampilkan form input
        let inputName = await (0, show_input_box_js_1.showInputBox)("Bloc name");
        // Cek apakah inputName valid
        if (!(0, is_name_valid_js_1.isNameValid)(inputName)) {
            vscode.window.showErrorMessage("The name must not be empty");
            return;
        }
        // Uri menyediakan path ke folder yang diklik kanan
        const basePath = uri.fsPath;
        function create(basePath, folderName, files) {
            // Path untuk cubit baru
            const folderPath = path.join(basePath, `${folderName}_bloc`);
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
            { name: `${cubitName}_bloc.dart`, content: (0, bloc_template_js_1.getBlocTemplate)(cubitName) },
            { name: `${cubitName}_event.dart`, content: (0, bloc_event_template_js_1.getBlocEventTemplate)(cubitName) },
            { name: `${cubitName}_state.dart`, content: (0, bloc_state_template_js_1.getBlocStateTemplate)(cubitName) },
        ];
        // Membuat struktur folder
        create(basePath, cubitName, files);
        vscode.window.showInformationMessage("Bloc created successfully!");
    });
    context.subscriptions.push(generateFolder);
}
exports.newBloc = newBloc;
//# sourceMappingURL=new-bloc.js.map