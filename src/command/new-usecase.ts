import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { getUseCaseTemplate } from "../templates/feature/domain/usecases/usecase.template.js";
import { isNameValid } from "../utils/is-name-valid.js";
import { showInputBox } from "../utils/show-input-box.js";

export async function newUseCase(context: vscode.ExtensionContext) {
  let generateFolder = vscode.commands.registerCommand("vscode-ext-aldev.newUseCase", async (uri: vscode.Uri) => {
    // Menampilkan form input
    let inputName = await showInputBox("UseCase name");

    // Cek apakah inputName valid
    if (!isNameValid(inputName)) {
      vscode.window.showErrorMessage("The name must not be empty");
      return;
    }
    // Uri menyediakan path ke folder yang diklik kanan
    const basePath = uri.fsPath;

    function create(basePath: string, fileName: string, fileContent: string) {
      const filePath = path.join(basePath, fileName);
      fs.writeFileSync(filePath, fileContent);
    }

    // Membuat struktur folder
    create(basePath, `${inputName}_usecase.dart`, getUseCaseTemplate(inputName!));

    vscode.window.showInformationMessage("Cubit created successfully!");
  });

  context.subscriptions.push(generateFolder);
}
