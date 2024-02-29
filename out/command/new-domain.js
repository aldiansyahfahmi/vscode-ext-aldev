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
exports.newDomain = void 0;
const changeCase = __importStar(require("change-case"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const vscode = __importStar(require("vscode"));
const remote_datasource_template_js_1 = require("../templates/feature/data/datasources/remote-datasource.template.js");
const mapper_template_js_1 = require("../templates/feature/data/mapper/mapper.template.js");
const response_dto_template_js_1 = require("../templates/feature/data/models/response/response-dto.template.js");
const response_entity_template_js_1 = require("../templates/feature/data/models/response/response-entity.template.js");
const repository_impl_template_js_1 = require("../templates/feature/data/repositories/repository-impl.template.js");
const di_template_js_1 = require("../templates/feature/di/di.template.js");
const repository_template_js_1 = require("../templates/feature/domain/repositories/repository.template.js");
const usecase_template_js_1 = require("../templates/feature/domain/usecases/usecase.template.js");
const screen_template_js_1 = require("../templates/feature/presentation/screen/screen.template.js");
const is_name_valid_js_1 = require("../utils/is-name-valid.js");
const show_input_box_js_1 = require("../utils/show-input-box.js");
async function newDomain(context) {
    let generateFolder = vscode.commands.registerCommand("vscode-ext-aldev.newDomain", async (uri) => {
        // Menampilkan form input
        let inputName = await (0, show_input_box_js_1.showInputBox)("Enter domain name");
        // Cek apakah inputName valid
        if (!(0, is_name_valid_js_1.isNameValid)(inputName)) {
            vscode.window.showErrorMessage("The name must not be empty");
            return;
        }
        // Uri menyediakan path ke folder yang diklik kanan
        const basePath = uri.fsPath;
        // Struktur folder utama dan subfolder
        const snakeCase = changeCase.snakeCase(inputName.toLowerCase());
        const structure = {
            [inputName]: {
                data: {
                    datasources: {
                        remote: { files: [`${snakeCase}_remote_datasource.dart`] },
                        local: { files: [`${snakeCase}_local_datasource.dart`] },
                    },
                    mapper: { files: [`${snakeCase}_mapper.dart`] },
                    models: {
                        body: {},
                        response: {
                            files: [`${snakeCase}_response_dto.dart`],
                        },
                    },
                    repositories: { files: [`${snakeCase}_repository_impl.dart`] },
                },
                di: {
                    files: [`${snakeCase}_dependency.dart`],
                },
                domain: {
                    entities: {
                        body: {},
                        response: {
                            files: [`${snakeCase}_response_entity.dart`],
                        },
                    },
                    repositories: { files: [`${snakeCase}_repository.dart`] },
                    usecases: { files: [`${snakeCase}_usecase.dart`] },
                },
            },
        };
        function createDirectory(basePath, name) {
            const dirPath = path.join(basePath, name);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }
            return dirPath;
        }
        function determineFileContent(fileName) {
            // Customize content based on file name
            if (fileName.includes("local")) {
                return "// Local Datasource content here\n";
            }
            else if (fileName.includes("remote")) {
                return (0, remote_datasource_template_js_1.getRemoteDataSourceTemplate)(inputName);
            }
            else if (fileName.includes("mapper")) {
                return (0, mapper_template_js_1.getMapperTemplate)(inputName);
            }
            else if (fileName.includes("repository_impl")) {
                return (0, repository_impl_template_js_1.getRepositoryImplTemplate)(inputName);
            }
            else if (fileName.includes("repository")) {
                return (0, repository_template_js_1.getRepositoryTemplate)(inputName);
            }
            else if (fileName.includes("usecase")) {
                return (0, usecase_template_js_1.getUseCaseTemplate)(inputName);
            }
            else if (fileName.includes("screen")) {
                return (0, screen_template_js_1.getScreenTemplate)(inputName);
            }
            else if (fileName.includes("dependency")) {
                return (0, di_template_js_1.getDiTemplate)(inputName);
            }
            else if (fileName.includes("dto")) {
                return (0, response_dto_template_js_1.getResponseDtoTemplate)(inputName);
            }
            else if (fileName.includes("entity")) {
                return (0, response_entity_template_js_1.getResponseEntityTemplate)(inputName);
            }
            // Default content if no condition matches
            return "// Default content here\n";
        }
        function createFile(basePath, fileName, folderKey) {
            // Create a folder for the file, named after the key in the structure object
            const folderPath = createDirectory(basePath, folderKey);
            // Determine the content based on the file name
            const content = determineFileContent(fileName);
            // Create the file inside the folder named after the key
            const filePath = path.join(folderPath, fileName);
            fs.writeFileSync(filePath, content);
        }
        function create(basePath, obj) {
            Object.keys(obj).forEach((key) => {
                const value = obj[key];
                if (value.hasOwnProperty("files")) {
                    value.files.forEach((file) => {
                        createFile(basePath, file, key); // Pass the key to createFile
                    });
                }
                else if (typeof value === "object" && Object.keys(value).length > 0) {
                    const newBasePath = createDirectory(basePath, key);
                    create(newBasePath, value);
                }
                else {
                    createDirectory(basePath, key);
                }
            });
        }
        // Membuat struktur folder
        create(basePath, structure);
        vscode.window.showInformationMessage("Domain created successfully!");
    });
    context.subscriptions.push(generateFolder);
}
exports.newDomain = newDomain;
//# sourceMappingURL=new-domain.js.map