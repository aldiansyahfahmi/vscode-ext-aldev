import * as changeCase from "change-case";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

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
  getRouterTemplate,
  getScreenTemplate,
  getSharedUseCaseTemplate,
  getUseCaseTemplate,
  getUtilsModuleTemplate,
  getViewDataStateTemplate,
} from "../templates/index.js";
import { isNameValid, showInputBox } from "../utils/index.js";

export async function init(context: vscode.ExtensionContext) {
  let generateFolder = vscode.commands.registerCommand("vscode-ext-aldev.init", async (uri: vscode.Uri) => {
    // Menampilkan form input
    let inputName = await showInputBox("Init name");

    // Cek apakah inputName valid
    if (!isNameValid(inputName)) {
      vscode.window.showErrorMessage("The name must not be empty");
      return;
    }

    const initTypeOptions = ["Features", "Domain-Presentation"];
    const initTypeSelected = await vscode.window.showQuickPick(initTypeOptions, {
      placeHolder: "Select Init Type",
    });

    if (!isNameValid(initTypeSelected)) {
      vscode.window.showErrorMessage("The options must not be empty");
      return;
    }

    const stateManagementOptions = ["Bloc", "Riverpod"];
    const stateManagementSelected = await vscode.window.showQuickPick(stateManagementOptions, {
      placeHolder: "Select State Management",
    });

    if (!isNameValid(stateManagementSelected)) {
      vscode.window.showErrorMessage("The state management must not be empty");
      return;
    }

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

      // Struktur folder utama dan subfolder
      const snakeCase = changeCase.snakeCase(inputName!.toLowerCase());
      const structureFeatures = {
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
          [inputName!]: {
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
              [stateManagementSelected! == "Riverpod" ? "provider" : stateManagementSelected!.toLowerCase()]: {},
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
          [inputName!]: {
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
          },
        },
        presentation: {
          [inputName!]: {
            [stateManagementSelected! == "Riverpod" ? "provider" : stateManagementSelected!.toLowerCase()]: {},
            screen: { files: [`${snakeCase}_screen.dart`] },
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
          return getRemoteDataSourceTemplate(inputName!);
        } else if (fileName.includes("mapper")) {
          return getMapperTemplate(inputName!);
        } else if (fileName.includes("repository_impl")) {
          return getRepositoryImplTemplate(inputName!);
        } else if (fileName.includes("repository")) {
          return getRepositoryTemplate(inputName!);
        } else if (fileName.includes("_usecase")) {
          return getUseCaseTemplate(inputName!);
        } else if (fileName.includes("screen")) {
          return getScreenTemplate(inputName!);
        } else if (fileName.includes("dependency")) {
          return getDiTemplate(inputName!);
        } else if (fileName.includes("injections")) {
          return getInjectionsTemplate(inputName!);
        } else if (fileName.includes("main_dev")) {
          return getMainDevTemplate(inputName!);
        } else if (fileName.includes("main_prod")) {
          return getMainProdTemplate(inputName!);
        } else if (fileName.includes("core_modules")) {
          return getCoreModuleTemplate(inputName!);
        } else if (fileName.includes("api_response")) {
          return getApiResponseTemplate(inputName!);
        } else if (fileName.includes("api_interceptors")) {
          return getApiInterceptorsTemplate(inputName!);
        } else if (fileName.includes("dio_handler")) {
          return getDioHandlerTemplate(inputName!);
        } else if (fileName.includes("app_constants")) {
          return getAppConstantsTemplate(inputName!);
        } else if (fileName.includes("utils_module")) {
          return getUtilsModuleTemplate(inputName!);
        } else if (fileName.includes("exception")) {
          return getExceptionTemplate(inputName!);
        } else if (fileName.includes("failure_response")) {
          return getFailureResponseTemplate(inputName!);
        } else if (fileName.includes("app_routes")) {
          return getAppRoutesTemplate(inputName!);
        } else if (fileName.includes("router")) {
          return getRouterTemplate(inputName!);
        } else if (fileName.includes("navigation_helper")) {
          return getNavigationHelperTemplate(inputName!);
        } else if (fileName.includes("app_setup")) {
          return getAppSetupTemplate(inputName!);
        } else if (fileName.includes("view_data_state")) {
          return getViewDataStateTemplate(inputName!);
        } else if (fileName.includes("usecase")) {
          return getSharedUseCaseTemplate(inputName!);
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
      create(basePath, initTypeSelected == "Features" ? structureFeatures : structureDomainPresentation);

      vscode.window.showInformationMessage("Init successfully!");
    } else {
      return;
    }
  });

  context.subscriptions.push(generateFolder);
}
