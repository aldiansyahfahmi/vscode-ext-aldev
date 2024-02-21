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
exports.init = void 0;
const changeCase = __importStar(require("change-case"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const vscode = __importStar(require("vscode"));
const injections_template_js_1 = require("../templates/di/injections.template.js");
const remote_datasource_template_js_1 = require("../templates/feature/data/datasources/remote-datasource.template.js");
const mapper_template_js_1 = require("../templates/feature/data/mapper/mapper.template.js");
const repository_impl_template_js_1 = require("../templates/feature/data/repositories/repository-impl.template.js");
const di_template_js_1 = require("../templates/feature/di/di.template.js");
const repository_template_js_1 = require("../templates/feature/domain/repositories/repository.template.js");
const usecase_template_js_1 = require("../templates/feature/domain/usecases/usecase.template.js");
const screen_template_js_1 = require("../templates/feature/presentation/screen/screen.template.js");
const main_dev_template_js_1 = require("../templates/launcher/main-dev.template.js");
const main_prod_template_js_1 = require("../templates/launcher/main-prod.template.js");
const core_module_template_js_1 = require("../templates/shared_libraries/core/di/core-module.template.js");
const api_interceptors_template_js_1 = require("../templates/shared_libraries/core/network/api-interceptors.template.js");
const dio_handler_template_js_1 = require("../templates/shared_libraries/core/network/dio-handler.template.js");
const api_response_template_js_1 = require("../templates/shared_libraries/core/network/models/api-response.template.js");
const app_constants_template_js_1 = require("../templates/shared_libraries/utils/constants/app-constants.template.js");
const utils_module_template_js_1 = require("../templates/shared_libraries/utils/di/utils-module.template.js");
const exception_template_js_1 = require("../templates/shared_libraries/utils/error/exception.template.js");
const failure_response_template_js_1 = require("../templates/shared_libraries/utils/error/failure-response.template.js");
const navigation_helper_template_js_1 = require("../templates/shared_libraries/utils/navigation/navigation-helper.template.js");
const app_routes_template_js_1 = require("../templates/shared_libraries/utils/navigation/router/app-routes.template.js");
const router_template_js_1 = require("../templates/shared_libraries/utils/navigation/router/router.template.js");
const app_setup_template_js_1 = require("../templates/shared_libraries/utils/setup/app-setup.template.js");
const view_data_state_template_js_1 = require("../templates/shared_libraries/utils/state/view-data-state.template.js");
const usecase_template_js_2 = require("../templates/shared_libraries/utils/usecase/usecase.template.js");
const is_name_valid_js_1 = require("../utils/is-name-valid.js");
const show_input_box_js_1 = require("../utils/show-input-box.js");
async function init(context) {
    let generateFolder = vscode.commands.registerCommand("vscode-ext-aldev.init", async (uri) => {
        // Menampilkan form input
        let inputName = await (0, show_input_box_js_1.showInputBox)("Init name");
        // Cek apakah inputName valid
        if (!(0, is_name_valid_js_1.isNameValid)(inputName)) {
            vscode.window.showErrorMessage("The name must not be empty");
            return;
        }
        const options = ["No", "Yes"];
        const optionsSelected = await vscode.window.showQuickPick(options, {
            placeHolder: "Are you sure you want to init it?",
        });
        if (!(0, is_name_valid_js_1.isNameValid)(optionsSelected)) {
            vscode.window.showErrorMessage("The options must not be empty");
            return;
        }
        if (optionsSelected == "Yes") {
            const stateManagementOptions = ["Bloc", "Riverpod"];
            const stateManagementSelected = await vscode.window.showQuickPick(stateManagementOptions, {
                placeHolder: "Select State Management",
            });
            if (!(0, is_name_valid_js_1.isNameValid)(stateManagementSelected)) {
                vscode.window.showErrorMessage("The state management must not be empty");
                return;
            }
            // Uri menyediakan path ke folder yang diklik kanan
            const basePath = uri.fsPath;
            // Struktur folder utama dan subfolder
            const snakeCase = changeCase.snakeCase(inputName.toLowerCase());
            const structure = {
                app: {
                    files: [`main_app.dart`],
                },
                di: {
                    files: [`injections.dart`],
                },
                launcher: {
                    files: [`main_dev.dart`, `main_prod.dart`],
                },
                features: {
                    [inputName]: {
                        data: {
                            datasources: {
                                remote: { files: [`${snakeCase}_remote_datasource.dart`] },
                                local: { files: [`${snakeCase}_local_datasource.dart`] },
                            },
                            mapper: { files: [`${snakeCase}_mapper.dart`] },
                            models: { body: {}, response: {} },
                            repositories: { files: [`${snakeCase}_repository_impl.dart`] },
                        },
                        di: {
                            files: [`${snakeCase}_dependency.dart`],
                        },
                        domain: {
                            entities: { body: {}, response: {} },
                            repositories: { files: [`${snakeCase}_repository.dart`] },
                            usecases: { files: [`${snakeCase}_usecase.dart`] },
                        },
                        presentation: {
                            [stateManagementSelected == "Riverpod" ? "provider" : stateManagementSelected.toLowerCase()]: {},
                            screen: { files: [`${snakeCase}_screen.dart`] },
                        },
                    },
                },
                shared_libraries: {
                    component: {},
                    core: {
                        di: {
                            files: ["core_modules.dart"],
                        },
                        network: {
                            models: {
                                files: ["api_response.dart"],
                            },
                            files: ["api_interceptors.dart", "dio_handler.dart"],
                        },
                    },
                    utils: {
                        constants: {
                            files: ["app_constants.dart"],
                        },
                        di: {
                            files: ["utils_modules.dart"],
                        },
                        error: {
                            files: ["exception.dart", "failure_response.dart"],
                        },
                        navigation: {
                            router: {
                                files: ["app_routes.dart", `${snakeCase}_router.dart`],
                            },
                            files: ["navigation_helper.dart"],
                        },
                        setup: {
                            files: ["app_setup.dart"],
                        },
                        state: {
                            files: ["view_data_state.dart"],
                        },
                        usecase: {
                            files: ["usecase.dart"],
                        },
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
                else if (fileName.includes("_usecase")) {
                    return (0, usecase_template_js_1.getUseCaseTemplate)(inputName);
                }
                else if (fileName.includes("screen")) {
                    return (0, screen_template_js_1.getScreenTemplate)(inputName);
                }
                else if (fileName.includes("dependency")) {
                    return (0, di_template_js_1.getDiTemplate)(inputName);
                }
                else if (fileName.includes("injections")) {
                    return (0, injections_template_js_1.getInjectionsTemplate)(inputName);
                }
                else if (fileName.includes("main_dev")) {
                    return (0, main_dev_template_js_1.getMainDevTemplate)(inputName);
                }
                else if (fileName.includes("main_prod")) {
                    return (0, main_prod_template_js_1.getMainProdTemplate)(inputName);
                }
                else if (fileName.includes("core_modules")) {
                    return (0, core_module_template_js_1.getCoreModuleTemplate)(inputName);
                }
                else if (fileName.includes("api_response")) {
                    return (0, api_response_template_js_1.getApiResponseTemplate)(inputName);
                }
                else if (fileName.includes("api_interceptors")) {
                    return (0, api_interceptors_template_js_1.getApiInterceptorsTemplate)(inputName);
                }
                else if (fileName.includes("dio_handler")) {
                    return (0, dio_handler_template_js_1.getDioHandlerTemplate)(inputName);
                }
                else if (fileName.includes("app_constants")) {
                    return (0, app_constants_template_js_1.getAppConstantsTemplate)(inputName);
                }
                else if (fileName.includes("utils_module")) {
                    return (0, utils_module_template_js_1.getUtilsModuleTemplate)(inputName);
                }
                else if (fileName.includes("exception")) {
                    return (0, exception_template_js_1.getExceptionTemplate)(inputName);
                }
                else if (fileName.includes("failure_response")) {
                    return (0, failure_response_template_js_1.getFailureResponseTemplate)(inputName);
                }
                else if (fileName.includes("app_routes")) {
                    return (0, app_routes_template_js_1.getAppRoutesTemplate)(inputName);
                }
                else if (fileName.includes("router")) {
                    return (0, router_template_js_1.getRouterTemplate)(inputName);
                }
                else if (fileName.includes("navigation_helper")) {
                    return (0, navigation_helper_template_js_1.getNavigationHelperTemplate)(inputName);
                }
                else if (fileName.includes("app_setup")) {
                    return (0, app_setup_template_js_1.getAppSetupTemplate)(inputName);
                }
                else if (fileName.includes("view_data_state")) {
                    return (0, view_data_state_template_js_1.getViewDataStateTemplate)(inputName);
                }
                else if (fileName.includes("usecase")) {
                    return (0, usecase_template_js_2.getSharedUseCaseTemplate)(inputName);
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
                        Object.keys(value).forEach((subKey) => {
                            if (subKey !== "files") {
                                const newBasePath = createDirectory(basePath, key);
                                create(newBasePath, value);
                            }
                        });
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
            vscode.window.showInformationMessage("Init successfully!");
        }
        else {
            return;
        }
    });
    context.subscriptions.push(generateFolder);
}
exports.init = init;
//# sourceMappingURL=init.js.map