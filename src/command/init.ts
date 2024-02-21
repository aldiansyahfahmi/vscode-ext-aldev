import * as changeCase from "change-case";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { getInjectionsTemplate } from "../templates/di/injections.template.js";
import { getRemoteDataSourceTemplate } from "../templates/feature/data/datasources/remote-datasource.template.js";
import { getMapperTemplate } from "../templates/feature/data/mapper/mapper.template.js";
import { getRepositoryImplTemplate } from "../templates/feature/data/repositories/repository-impl.template.js";
import { getDiTemplate } from "../templates/feature/di/di.template.js";
import { getRepositoryTemplate } from "../templates/feature/domain/repositories/repository.template.js";
import { getUseCaseTemplate } from "../templates/feature/domain/usecases/usecase.template.js";
import { getScreenTemplate } from "../templates/feature/presentation/screen/screen.template.js";
import { getMainDevTemplate } from "../templates/launcher/main-dev.template.js";
import { getMainProdTemplate } from "../templates/launcher/main-prod.template.js";
import { getCoreModuleTemplate } from "../templates/shared_libraries/core/di/core-module.template.js";
import { getApiInterceptorsTemplate } from "../templates/shared_libraries/core/network/api-interceptors.template.js";
import { getDioHandlerTemplate } from "../templates/shared_libraries/core/network/dio-handler.template.js";
import { getApiResponseTemplate } from "../templates/shared_libraries/core/network/models/api-response.template.js";
import { getAppConstantsTemplate } from "../templates/shared_libraries/utils/constants/app-constants.template.js";
import { getUtilsModuleTemplate } from "../templates/shared_libraries/utils/di/utils-module.template.js";
import { getExceptionTemplate } from "../templates/shared_libraries/utils/error/exception.template.js";
import { getFailureResponseTemplate } from "../templates/shared_libraries/utils/error/failure-response.template.js";
import { getNavigationHelperTemplate } from "../templates/shared_libraries/utils/navigation/navigation-helper.template.js";
import { getAppRoutesTemplate } from "../templates/shared_libraries/utils/navigation/router/app-routes.template.js";
import { getRouterTemplate } from "../templates/shared_libraries/utils/navigation/router/router.template.js";
import { getAppSetupTemplate } from "../templates/shared_libraries/utils/setup/app-setup.template.js";
import { getViewDataStateTemplate } from "../templates/shared_libraries/utils/state/view-data-state.template.js";
import { getSharedUseCaseTemplate } from "../templates/shared_libraries/utils/usecase/usecase.template.js";
import { isNameValid } from "../utils/is-name-valid.js";
import { showInputBox } from "../utils/show-input-box.js";

export async function init(context: vscode.ExtensionContext) {
  let generateFolder = vscode.commands.registerCommand("vscode-ext-aldev.init", async (uri: vscode.Uri) => {
    // Menampilkan form input
    let inputName = await showInputBox("Init name");

    // Cek apakah inputName valid
    if (!isNameValid(inputName)) {
      vscode.window.showErrorMessage("The name must not be empty");
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
      const stateManagementOptions = ["Bloc", "Riverpod"];
      const stateManagementSelected = await vscode.window.showQuickPick(stateManagementOptions, {
        placeHolder: "Select State Management",
      });

      if (!isNameValid(stateManagementSelected)) {
        vscode.window.showErrorMessage("The state management must not be empty");
        return;
      }

      // Uri menyediakan path ke folder yang diklik kanan
      const basePath = uri.fsPath;

      // Struktur folder utama dan subfolder
      const snakeCase = changeCase.snakeCase(inputName!.toLowerCase());
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
      create(basePath, structure);

      vscode.window.showInformationMessage("Init successfully!");
    } else {
      return;
    }
  });

  context.subscriptions.push(generateFolder);
}
