import { spawn } from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

import { getMainAppTemplate } from "../templates/app/main-app.template.js";
import { getSplashCubitTemplate } from "../templates/feature/presentation/bloc/splash_cubit/splash_cubit.template.js";
import { getSplashStateTemplate } from "../templates/feature/presentation/bloc/splash_cubit/splash_state.template.js";
import { getSplashScreenTemplate } from "../templates/feature/presentation/screen/splash_screen.template.js";
import {
  getApiInterceptorsTemplate,
  getApiResponseTemplate,
  getAppConstantsTemplate,
  getAppRoutesTemplate,
  getAppSetupTemplate,
  getCoreModuleTemplate,
  getDiTemplate,
  getDioHandlerTemplate,
  getExceptionTemplate,
  getFailureResponseTemplate,
  getInjectionsTemplate,
  getMainDevTemplate,
  getMainProdTemplate,
  getMapperTemplate,
  getNavigationHelperTemplate,
  getRemoteDataSourceTemplate,
  getRepositoryImplTemplate,
  getRepositoryTemplate,
  getScreenTemplate,
  getSharedUseCaseTemplate,
  getUseCaseTemplate,
  getUtilsModuleTemplate,
  getViewDataStateTemplate,
} from "../templates/index.js";
import { getCustomButtonTemplate } from "../templates/shared_libraries/component/custom_button.template.js";
import { getCustomCircularProgressIndicatorTemplate } from "../templates/shared_libraries/component/custom_circular_progress_indicator.template.js";
import { getCustomDialogTemplate } from "../templates/shared_libraries/component/custom_dialog.template.js";
import { getCustomScaffoldTemplate } from "../templates/shared_libraries/component/custom_scaffold.template.js";
import { getLoadingStackTemplate } from "../templates/shared_libraries/component/loading_stack.template.js";
import { getShimmerLoadingTemplate } from "../templates/shared_libraries/component/shimmer_loading.template.js";
import { getCachedUserDataTemplate } from "../templates/shared_libraries/core/local/models/cached-user-data.template.js";
import { getNetworkCubitTemplate } from "../templates/shared_libraries/utils/bloc/network_cubit/network-cubit.template.js";
import { getCachedHelperTemplate } from "../templates/shared_libraries/utils/helper/cached-helper.template.js";
import { getSplashRouterTemplate } from "../templates/shared_libraries/utils/navigation/router/splash-router.template.js";
import { getColorsTemplate } from "../templates/shared_libraries/utils/style/colors.template.js";
import { getSharedTypographyTemplate } from "../templates/shared_libraries/utils/style/typography.template.js";
import { isNameValid } from "../utils/index.js";

export async function init(context: vscode.ExtensionContext) {
  let generateFolder = vscode.commands.registerCommand("vscode-ext-aldev.init", async (uri: vscode.Uri) => {
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

    if (!isNameValid(optionsSelected)) {
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

      function createDirectory(basePath: string, name: string): string {
        const dirPath = path.join(basePath, name);
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }
        return dirPath;
      }

      function determineFileContent(fileName: string): string {
        // Customize content based on file name
        if (fileName.includes("local")) {
          return "// Local Datasource content here\n";
        } else if (fileName.includes("remote")) {
          return getRemoteDataSourceTemplate("splash");
        } else if (fileName.includes("mapper")) {
          return getMapperTemplate("splash");
        } else if (fileName.includes("repository_impl")) {
          return getRepositoryImplTemplate("splash");
        } else if (fileName.includes("repository")) {
          return getRepositoryTemplate("splash");
        } else if (fileName.includes("_usecase")) {
          return getUseCaseTemplate("splash");
        } else if (fileName.includes("main_screen")) {
          return getScreenTemplate("main");
        } else if (fileName.includes("dependency")) {
          return getDiTemplate("splash");
        } else if (fileName.includes("injections")) {
          return getInjectionsTemplate("splash");
        } else if (fileName.includes("main_app")) {
          return getMainAppTemplate("splash");
        } else if (fileName.includes("main_dev")) {
          return getMainDevTemplate("splash");
        } else if (fileName.includes("main_prod")) {
          return getMainProdTemplate("splash");
        } else if (fileName.includes("core_modules")) {
          return getCoreModuleTemplate("splash");
        } else if (fileName.includes("api_response")) {
          return getApiResponseTemplate("splash");
        } else if (fileName.includes("api_interceptors")) {
          return getApiInterceptorsTemplate("splash");
        } else if (fileName.includes("dio_handler")) {
          return getDioHandlerTemplate("splash");
        } else if (fileName.includes("app_constants")) {
          return getAppConstantsTemplate("splash");
        } else if (fileName.includes("utils_module")) {
          return getUtilsModuleTemplate("splash");
        } else if (fileName.includes("exception")) {
          return getExceptionTemplate("splash");
        } else if (fileName.includes("failure_response")) {
          return getFailureResponseTemplate("splash");
        } else if (fileName.includes("app_routes")) {
          return getAppRoutesTemplate("splash");
        } else if (fileName.includes("navigation_helper")) {
          return getNavigationHelperTemplate("splash");
        } else if (fileName.includes("app_setup")) {
          return getAppSetupTemplate("splash");
        } else if (fileName.includes("view_data_state")) {
          return getViewDataStateTemplate("splash");
        } else if (fileName.includes("usecase")) {
          return getSharedUseCaseTemplate("splash");
        } else if (fileName.includes("typography")) {
          return getSharedTypographyTemplate("splash");
        } else if (fileName.includes("cached_helper")) {
          return getCachedHelperTemplate("splash");
        } else if (fileName.includes("cached_user_data")) {
          return getCachedUserDataTemplate("splash");
        } else if (fileName.includes("network_cubit")) {
          return getNetworkCubitTemplate("splash");
        } else if (fileName.includes("splash_router")) {
          return getSplashRouterTemplate("splash");
        } else if (fileName.includes("splash_state")) {
          return getSplashStateTemplate("splash");
        } else if (fileName.includes("splash_cubit")) {
          return getSplashCubitTemplate("splash");
        } else if (fileName.includes("splash_screen")) {
          return getSplashScreenTemplate("splash");
        } else if (fileName.includes("colors")) {
          return getColorsTemplate("splash");
        } else if (fileName.includes("custom_button")) {
          return getCustomButtonTemplate();
        } else if (fileName.includes("custom_dialog")) {
          return getCustomDialogTemplate();
        } else if (fileName.includes("custom_circular_progress_indicator")) {
          return getCustomCircularProgressIndicatorTemplate();
        } else if (fileName.includes("loading_stack")) {
          return getLoadingStackTemplate();
        } else if (fileName.includes("shimmer_loading")) {
          return getShimmerLoadingTemplate();
        } else if (fileName.includes("custom_scaffold")) {
          return getCustomScaffoldTemplate();
        }
        // Default content if no condition matches
        return "// Default content here\n";
      }

      function createFile(basePath: string, fileName: string, folderKey: string) {
        // Create a folder for the file, named after the key in the structure object
        const folderPath = createDirectory(basePath, folderKey);

        // Determine the content based on the file name
        const content = determineFileContent(fileName);

        // Create the file inside the folder named after the key
        const filePath = path.join(folderPath, fileName);
        fs.writeFileSync(filePath, content);
      }

      function create(basePath: string, obj: any) {
        Object.keys(obj).forEach((key) => {
          const value = obj[key];
          if (value.hasOwnProperty("files")) {
            Object.keys(value).forEach((subKey) => {
              if (subKey !== "files") {
                const newBasePath = createDirectory(basePath, key);
                create(newBasePath, value);
              }
            });
            value.files.forEach((file: string) => {
              createFile(basePath, file, key); // Pass the key to createFile
            });
          } else if (typeof value === "object" && Object.keys(value).length > 0) {
            const newBasePath = createDirectory(basePath, key);
            create(newBasePath, value);
          } else {
            createDirectory(basePath, key);
          }
        });
      }

      // Membuat struktur folder
      // create(basePath, initTypeSelected == "Features" ? structureFeatures : structureDomainPresentation);

      const child = spawn("flutter", ["pub", "add"]);

      child.stdout.on("data", (data) => {
        console.log(data.toString());
      });

      child.stderr.on("data", (data) => {
        console.error(data.toString());
      });

      child.on("close", (code) => {
        vscode.window.showInformationMessage(`Package added successfully!`);
      });

      create(basePath, structureDomainPresentation);

      vscode.window.showInformationMessage("Init successfully!");
    } else {
      return;
    }
  });

  context.subscriptions.push(generateFolder);
}
