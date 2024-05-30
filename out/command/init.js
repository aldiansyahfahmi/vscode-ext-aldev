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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const vscode = __importStar(require("vscode"));
const main_app_template_js_1 = require("../templates/app/main-app.template.js");
const splash_cubit_template_js_1 = require("../templates/feature/presentation/bloc/splash_cubit/splash_cubit.template.js");
const splash_state_template_js_1 = require("../templates/feature/presentation/bloc/splash_cubit/splash_state.template.js");
const splash_screen_template_js_1 = require("../templates/feature/presentation/screen/splash_screen.template.js");
const index_js_1 = require("../templates/index.js");
const custom_button_template_js_1 = require("../templates/shared_libraries/component/custom_button.template.js");
const custom_circular_progress_indicator_template_js_1 = require("../templates/shared_libraries/component/custom_circular_progress_indicator.template.js");
const custom_dialog_template_js_1 = require("../templates/shared_libraries/component/custom_dialog.template.js");
const custom_scaffold_template_js_1 = require("../templates/shared_libraries/component/custom_scaffold.template.js");
const loading_stack_template_js_1 = require("../templates/shared_libraries/component/loading_stack.template.js");
const shimmer_loading_template_js_1 = require("../templates/shared_libraries/component/shimmer_loading.template.js");
const cached_user_data_template_js_1 = require("../templates/shared_libraries/core/local/models/cached-user-data.template.js");
const network_cubit_template_js_1 = require("../templates/shared_libraries/utils/bloc/network_cubit/network-cubit.template.js");
const cached_helper_template_js_1 = require("../templates/shared_libraries/utils/helper/cached-helper.template.js");
const splash_router_template_js_1 = require("../templates/shared_libraries/utils/navigation/router/splash-router.template.js");
const colors_template_js_1 = require("../templates/shared_libraries/utils/style/colors.template.js");
const typography_template_js_1 = require("../templates/shared_libraries/utils/style/typography.template.js");
const index_js_2 = require("../utils/index.js");
const addDependency_js_1 = require("./addDependency.js");
async function init(context) {
    let generateFolder = vscode.commands.registerCommand("vscode-ext-aldev.init", async (uri) => {
        // // Menampilkan form input
        // let inputName = await showInputBox("Init name");
        // // Cek apakah inputName valid
        // if (!isNameValid(inputName)) {
        //   vscode.window.showErrorMessage("The name must not be empty");
        //   return;
        // }
        // const initTypeOptions = ["Features", "Domain-Presentation"];
        // const initTypeSelected = await vscode.window.showQuickPick(initTypeOptions, {
        //   placeHolder: "Select Init Type",
        // });
        // if (!isNameValid(initTypeSelected)) {
        //   vscode.window.showErrorMessage("The options must not be empty");
        //   return;
        // }
        // const stateManagementOptions = ["Bloc", "Riverpod"];
        // const stateManagementSelected = await vscode.window.showQuickPick(stateManagementOptions, {
        //   placeHolder: "Select State Management",
        // });
        // if (!isNameValid(stateManagementSelected)) {
        //   vscode.window.showErrorMessage("The state management must not be empty");
        //   return;
        // }
        const options = ["No", "Yes"];
        const optionsSelected = await vscode.window.showQuickPick(options, {
            placeHolder: "Are you sure you want to init it?",
        });
        if (!(0, index_js_2.isNameValid)(optionsSelected)) {
            vscode.window.showErrorMessage("The options must not be empty");
            return;
        }
        if (optionsSelected == "Yes") {
            // Uri menyediakan path ke folder yang diklik kanan
            const basePath = uri.fsPath;
            // const structureFeatures = {
            //   app: {
            //     files: [`main_app.dart`],
            //   },
            //   di: {
            //     files: [`injections.dart`],
            //   },
            //   launcher: {
            //     files: [`main_dev.dart`, `main_prod.dart`],
            //   },
            //   features: {
            //     ["Splash"]: {
            //       data: {
            //         datasources: {
            //           remote: { files: [`${snakeCase}_remote_datasource.dart`] },
            //           local: { files: [`${snakeCase}_local_datasource.dart`] },
            //         },
            //         mapper: { files: [`${snakeCase}_mapper.dart`] },
            //         models: { body: {}, response: {} },
            //         repositories: { files: [`${snakeCase}_repository_impl.dart`] },
            //       },
            //       di: {
            //         files: [`${snakeCase}_dependency.dart`],
            //       },
            //       domain: {
            //         entities: { body: {}, response: {} },
            //         repositories: { files: [`${snakeCase}_repository.dart`] },
            //         usecases: { files: [`${snakeCase}_usecase.dart`] },
            //       },
            //       presentation: {
            //         [stateManagementSelected! == "Riverpod" ? "provider" : stateManagementSelected!.toLowerCase()]: {},
            //         screen: { files: [`${snakeCase}_screen.dart`] },
            //       },
            //     },
            //   },
            //   shared_libraries: {
            //     component: {},
            //     core: {
            //       di: {
            //         files: ["core_modules.dart"],
            //       },
            //       network: {
            //         models: {
            //           files: ["api_response.dart"],
            //         },
            //         files: ["api_interceptors.dart", "dio_handler.dart"],
            //       },
            //     },
            //     utils: {
            //       constants: {
            //         files: ["app_constants.dart"],
            //       },
            //       di: {
            //         files: ["utils_modules.dart"],
            //       },
            //       error: {
            //         files: ["exception.dart", "failure_response.dart"],
            //       },
            //       navigation: {
            //         router: {
            //           files: ["app_routes.dart", `${snakeCase}_router.dart`],
            //         },
            //         files: ["navigation_helper.dart"],
            //       },
            //       setup: {
            //         files: ["app_setup.dart"],
            //       },
            //       state: {
            //         files: ["view_data_state.dart"],
            //       },
            //       usecase: {
            //         files: ["usecase.dart"],
            //       },
            //     },
            //   },
            // };
            const structureDomainPresentation = {
                app: {
                    files: [`main_app.dart`],
                },
                di: {
                    files: [`injections.dart`],
                },
                launcher: {
                    files: [`main_dev.dart`, `main_prod.dart`],
                },
                domain: {
                // ['splash']: {
                //   data: {
                //     datasources: {
                //       remote: { files: [`${snakeCase}_remote_datasource.dart`] },
                //       local: { files: [`${snakeCase}_local_datasource.dart`] },
                //     },
                //     mapper: { files: [`${snakeCase}_mapper.dart`] },
                //     models: { body: {}, response: {} },
                //     repositories: { files: [`${snakeCase}_repository_impl.dart`] },
                //   },
                //   di: {
                //     files: [`${snakeCase}_dependency.dart`],
                //   },
                //   domain: {
                //     entities: { body: {}, response: {} },
                //     repositories: { files: [`${snakeCase}_repository.dart`] },
                //     usecases: { files: [`${snakeCase}_usecase.dart`] },
                //   },
                // },
                },
                presentation: {
                    ["splash"]: {
                        // [stateManagementSelected! == "Riverpod" ? "provider" : stateManagementSelected!.toLowerCase()]: {},
                        bloc: {
                            splash_cubit: {
                                files: ["splash_cubit.dart", "splash_state.dart"],
                            },
                        },
                        ui: { files: [`splash_screen.dart`] },
                    },
                    main: {
                        ui: {
                            files: [`main_screen.dart`],
                        },
                    },
                },
                shared_libraries: {
                    component: {
                        button: {
                            files: [`custom_button.dart`],
                        },
                        dialog: {
                            files: [`custom_dialog.dart`],
                        },
                        loading: {
                            files: [`custom_circular_progress_indicator.dart`, `loading_stack.dart`, `shimmer_loading.dart`],
                        },
                        scaffold: {
                            files: [`custom_scaffold.dart`],
                        },
                    },
                    core: {
                        di: {
                            files: ["core_modules.dart"],
                        },
                        local: {
                            models: {
                                files: ["cached_user_data.dart"],
                            },
                        },
                        network: {
                            models: {
                                files: ["api_response.dart"],
                            },
                            files: ["api_interceptors.dart", "dio_handler.dart"],
                        },
                    },
                    utils: {
                        bloc: {
                            network_cubit: {
                                files: ["network_cubit.dart"],
                            },
                        },
                        constants: {
                            files: ["app_constants.dart"],
                        },
                        di: {
                            files: ["utils_modules.dart"],
                        },
                        error: {
                            files: ["exception.dart", "failure_response.dart"],
                        },
                        helper: {
                            files: ["cached_helper.dart"],
                        },
                        navigation: {
                            router: {
                                files: ["app_routes.dart", `splash_router.dart`],
                            },
                            files: ["navigation_helper.dart"],
                        },
                        setup: {
                            files: ["app_setup.dart"],
                        },
                        state: {
                            files: ["view_data_state.dart"],
                        },
                        style: {
                            files: ["colors.dart", "typography.dart"],
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
                    return (0, index_js_1.getRemoteDataSourceTemplate)("splash");
                }
                else if (fileName.includes("mapper")) {
                    return (0, index_js_1.getMapperTemplate)("splash");
                }
                else if (fileName.includes("repository_impl")) {
                    return (0, index_js_1.getRepositoryImplTemplate)("splash");
                }
                else if (fileName.includes("repository")) {
                    return (0, index_js_1.getRepositoryTemplate)("splash");
                }
                else if (fileName.includes("_usecase")) {
                    return (0, index_js_1.getUseCaseTemplate)("splash");
                }
                else if (fileName.includes("main_screen")) {
                    return (0, index_js_1.getScreenTemplate)("main");
                }
                else if (fileName.includes("dependency")) {
                    return (0, index_js_1.getDiTemplate)("splash");
                }
                else if (fileName.includes("injections")) {
                    return (0, index_js_1.getInjectionsTemplate)("splash");
                }
                else if (fileName.includes("main_app")) {
                    return (0, main_app_template_js_1.getMainAppTemplate)("splash");
                }
                else if (fileName.includes("main_dev")) {
                    return (0, index_js_1.getMainDevTemplate)("splash");
                }
                else if (fileName.includes("main_prod")) {
                    return (0, index_js_1.getMainProdTemplate)("splash");
                }
                else if (fileName.includes("core_modules")) {
                    return (0, index_js_1.getCoreModuleTemplate)("splash");
                }
                else if (fileName.includes("api_response")) {
                    return (0, index_js_1.getApiResponseTemplate)("splash");
                }
                else if (fileName.includes("api_interceptors")) {
                    return (0, index_js_1.getApiInterceptorsTemplate)("splash");
                }
                else if (fileName.includes("dio_handler")) {
                    return (0, index_js_1.getDioHandlerTemplate)("splash");
                }
                else if (fileName.includes("app_constants")) {
                    return (0, index_js_1.getAppConstantsTemplate)("splash");
                }
                else if (fileName.includes("utils_module")) {
                    return (0, index_js_1.getUtilsModuleTemplate)("splash");
                }
                else if (fileName.includes("exception")) {
                    return (0, index_js_1.getExceptionTemplate)("splash");
                }
                else if (fileName.includes("failure_response")) {
                    return (0, index_js_1.getFailureResponseTemplate)("splash");
                }
                else if (fileName.includes("app_routes")) {
                    return (0, index_js_1.getAppRoutesTemplate)("splash");
                }
                else if (fileName.includes("navigation_helper")) {
                    return (0, index_js_1.getNavigationHelperTemplate)("splash");
                }
                else if (fileName.includes("app_setup")) {
                    return (0, index_js_1.getAppSetupTemplate)("splash");
                }
                else if (fileName.includes("view_data_state")) {
                    return (0, index_js_1.getViewDataStateTemplate)("splash");
                }
                else if (fileName.includes("usecase")) {
                    return (0, index_js_1.getSharedUseCaseTemplate)("splash");
                }
                else if (fileName.includes("typography")) {
                    return (0, typography_template_js_1.getSharedTypographyTemplate)("splash");
                }
                else if (fileName.includes("cached_helper")) {
                    return (0, cached_helper_template_js_1.getCachedHelperTemplate)("splash");
                }
                else if (fileName.includes("cached_user_data")) {
                    return (0, cached_user_data_template_js_1.getCachedUserDataTemplate)("splash");
                }
                else if (fileName.includes("network_cubit")) {
                    return (0, network_cubit_template_js_1.getNetworkCubitTemplate)("splash");
                }
                else if (fileName.includes("splash_router")) {
                    return (0, splash_router_template_js_1.getSplashRouterTemplate)("splash");
                }
                else if (fileName.includes("splash_state")) {
                    return (0, splash_state_template_js_1.getSplashStateTemplate)("splash");
                }
                else if (fileName.includes("splash_cubit")) {
                    return (0, splash_cubit_template_js_1.getSplashCubitTemplate)("splash");
                }
                else if (fileName.includes("splash_screen")) {
                    return (0, splash_screen_template_js_1.getSplashScreenTemplate)("splash");
                }
                else if (fileName.includes("colors")) {
                    return (0, colors_template_js_1.getColorsTemplate)("splash");
                }
                else if (fileName.includes("custom_button")) {
                    return (0, custom_button_template_js_1.getCustomButtonTemplate)();
                }
                else if (fileName.includes("custom_dialog")) {
                    return (0, custom_dialog_template_js_1.getCustomDialogTemplate)();
                }
                else if (fileName.includes("custom_circular_progress_indicator")) {
                    return (0, custom_circular_progress_indicator_template_js_1.getCustomCircularProgressIndicatorTemplate)();
                }
                else if (fileName.includes("loading_stack")) {
                    return (0, loading_stack_template_js_1.getLoadingStackTemplate)();
                }
                else if (fileName.includes("shimmer_loading")) {
                    return (0, shimmer_loading_template_js_1.getShimmerLoadingTemplate)();
                }
                else if (fileName.includes("custom_scaffold")) {
                    return (0, custom_scaffold_template_js_1.getCustomScaffoldTemplate)();
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
            // create(basePath, initTypeSelected == "Features" ? structureFeatures : structureDomainPresentation);
            (0, addDependency_js_1.addDependency)("dependencies");
            (0, addDependency_js_1.addDependency)("dev_dependencies");
            create(basePath, structureDomainPresentation);
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