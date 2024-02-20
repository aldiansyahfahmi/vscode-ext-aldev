import * as changeCase from "change-case";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
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
    // Uri menyediakan path ke folder yang diklik kanan
    const basePath = uri.fsPath;

    // Struktur folder utama dan subfolder
    const snakeCase = changeCase.snakeCase(inputName!.toLowerCase());
    const structure = {
      [inputName!]: {
        data: {
          datasource: {
            remote: { files: [`${snakeCase}_remote_datasource.dart`] },
            local: { files: [`${snakeCase}_local_datasource.dart`] },
          },
          mapper: { files: [`${snakeCase}_mapper.dart`] },
          models: { body: {}, response: {} },
          repositories: { files: [`${snakeCase}_repository_impl.dart`] },
        },
        domain: {
          entities: { body: {}, response: {} },
          repositories: { files: [`${snakeCase}_repository.dart`] },
          usecases: { files: [`${snakeCase}_usecase.dart`] },
        },
        presentation: {
          bloc: {},
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
        return "// Remote Datasource content here\n";
      } else if (fileName.includes("mapper")) {
        return "// Mapper content here\n";
      } else if (fileName.includes("repository_impl")) {
        return "// Repository implementation content here\n";
      } else if (fileName.includes("repository")) {
        return "// Repository content here\n";
      } else if (fileName.includes("usecase")) {
        return "// Use case content here\n";
      } else if (fileName.includes("screen")) {
        return "// Screen content here\n";
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

    const files = [{ name: `fileName`, content: "isi file" }];

    // Membuat struktur folder
    create(basePath, structure);

    vscode.window.showInformationMessage("Feature folders created successfully!");
  });

  context.subscriptions.push(generateFolder);
}
