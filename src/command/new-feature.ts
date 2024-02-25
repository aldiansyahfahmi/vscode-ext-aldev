import * as changeCase from "change-case";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { getRemoteDataSourceTemplate } from "../templates/feature/data/datasources/remote-datasource.template.js";
import { getMapperTemplate } from "../templates/feature/data/mapper/mapper.template.js";
import { getResponseDtoTemplate } from "../templates/feature/data/models/response/response-dto.template.js";
import { getResponseEntityTemplate } from "../templates/feature/data/models/response/response-entity.template.js";
import { getRepositoryImplTemplate } from "../templates/feature/data/repositories/repository-impl.template.js";
import { getDiTemplate } from "../templates/feature/di/di.template.js";
import { getRepositoryTemplate } from "../templates/feature/domain/repositories/repository.template.js";
import { getUseCaseTemplate } from "../templates/feature/domain/usecases/usecase.template.js";
import { getScreenTemplate } from "../templates/feature/presentation/screen/screen.template.js";
import { isNameValid } from "../utils/is-name-valid.js";
import { showInputBox } from "../utils/show-input-box.js";

export async function newFeature(context: vscode.ExtensionContext) {
  let generateFolder = vscode.commands.registerCommand("vscode-ext-aldev.newFeature", async (uri: vscode.Uri) => {
    // Menampilkan form input
    let inputName = await showInputBox("Enter feature name");

    // Cek apakah inputName valid
    if (!isNameValid(inputName)) {
      vscode.window.showErrorMessage("The name must not be empty");
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

    // Uri menyediakan path ke folder yang diklik kanan
    const basePath = uri.fsPath;

    // Struktur folder utama dan subfolder
    const snakeCase = changeCase.snakeCase(inputName!.toLowerCase());
    const structure = {
      [inputName!]: {
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
        presentation: {
          [stateManagementSelected! == "Riverpod" ? "provider" : stateManagementSelected!.toLowerCase()]: {},
          screen: { files: [`${snakeCase}_screen.dart`] },
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
      } else if (fileName.includes("usecase")) {
        return getUseCaseTemplate(inputName!);
      } else if (fileName.includes("screen")) {
        return getScreenTemplate(inputName!);
      } else if (fileName.includes("dependency")) {
        return getDiTemplate(inputName!);
      } else if (fileName.includes("dto")) {
        return getResponseDtoTemplate(inputName!);
      } else if (fileName.includes("entity")) {
        return getResponseEntityTemplate(inputName!);
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

    vscode.window.showInformationMessage("Feature created successfully!");
  });

  context.subscriptions.push(generateFolder);
}
