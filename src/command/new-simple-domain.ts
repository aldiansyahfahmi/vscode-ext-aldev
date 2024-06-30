import * as changeCase from "change-case";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { getSimpleRemoteDataSourceTemplate } from "../templates/feature/data/datasources/remote-datasource.template.js";
import { getResponseTemplate } from "../templates/feature/data/models/response/response.template.js";
import { getSimpleRepositoryTemplate } from "../templates/feature/data/repositories/repository-impl.template.js";
import { getDiSimpleTemplate } from "../templates/feature/di/di.template.js";
import { getSimpleUseCaseTemplate } from "../templates/feature/domain/usecases/usecase.template.js";
import { getScreenTemplate } from "../templates/feature/presentation/screen/screen.template.js";
import { isNameValid } from "../utils/is-name-valid.js";
import { showInputBox } from "../utils/show-input-box.js";

export async function newSimpleDomain(context: vscode.ExtensionContext) {
  let generateFolder = vscode.commands.registerCommand("vscode-ext-aldev.newSimpleDomain", async (uri: vscode.Uri) => {
    // Menampilkan form input
    let inputName = await showInputBox("Enter domain name");

    // Cek apakah inputName valid
    if (!isNameValid(inputName)) {
      vscode.window.showErrorMessage("The name must not be empty");
      return;
    }

    // Uri menyediakan path ke folder yang diklik kanan
    const basePath = uri.fsPath;

    // Struktur folder utama dan subfolder
    const snakeCase = changeCase.snakeCase(inputName!.toLowerCase());
    const structure = {
      [inputName!]: {
        datasources: {
          remote: { files: [`${snakeCase}_remote_datasource.dart`] },
        },
        models: {
          body: {},
          response: {
            files: [`${snakeCase}_response.dart`],
          },
        },
        repositories: { files: [`${snakeCase}_repository.dart`] },
        di: {
          files: [`${snakeCase}_dependency.dart`],
        },
        usecases: { files: [`${snakeCase}_usecase.dart`] },
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
        return getSimpleRemoteDataSourceTemplate(inputName!);
      } else if (fileName.includes("repository")) {
        return getSimpleRepositoryTemplate(inputName!);
      } else if (fileName.includes("usecase")) {
        return getSimpleUseCaseTemplate(inputName!);
      } else if (fileName.includes("screen")) {
        return getScreenTemplate(inputName!);
      } else if (fileName.includes("dependency")) {
        return getDiSimpleTemplate(inputName!);
      } else if (fileName.includes("response")) {
        return getResponseTemplate(inputName!);
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

    vscode.window.showInformationMessage("Simple Domain created successfully!");
  });

  context.subscriptions.push(generateFolder);
}
