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
    const structure = {
      [inputName!]: {
        data: ["datasource", "mapper", "models", "repositories"],
        domain: ["entities", "repositories", "usecases"],
        presentation: ["screen"],
      },
    };

    // Fungsi rekursif untuk membuat struktur folder
    function createFolders(base: string, structure: { [key: string]: any }) {
      Object.keys(structure).forEach((folder) => {
        const folderPath = path.join(base, folder);
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath, { recursive: true });
        }

        const subStructure = structure[folder];
        // Membuat subfolder
        if (typeof subStructure === "object" && !Array.isArray(subStructure)) {
          createFolders(folderPath, subStructure);
        } else if (Array.isArray(subStructure)) {
          subStructure.forEach((subFolder) => {
            const subFolderPath = path.join(folderPath, subFolder);
            if (!fs.existsSync(subFolderPath)) {
              fs.mkdirSync(subFolderPath, { recursive: true });
            }
          });
        }
      });
    }

    // Membuat struktur folder
    createFolders(basePath, structure);

    vscode.window.showInformationMessage("Feature folders created successfully!");
  });

  context.subscriptions.push(generateFolder);
}
