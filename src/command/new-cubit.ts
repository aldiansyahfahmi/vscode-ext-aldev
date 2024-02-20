import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { isNameValid } from "../utils/is-name-valid";
import { showInputBox } from "../utils/show-input-box";

export async function newCubit(context: vscode.ExtensionContext) {
  let generateFolder = vscode.commands.registerCommand("vscode-ext-aldev.newCubit", async (uri: vscode.Uri) => {
    // Menampilkan form input
    let inputName = await showInputBox("Enter cubit name");

    // Cek apakah inputName valid
    if (!isNameValid(inputName)) {
      vscode.window.showErrorMessage("The name must not be empty");
      return;
    }
    // Uri menyediakan path ke folder yang diklik kanan
    const basePath = uri.fsPath;

    function createCubit(basePath: string, folderName: string, files: { name: string; content: string }[]) {
      // Folder name to pascal case
      // const cubitName = changeCase.pascalCase(folderName.toLocaleLowerCase());

      // Path untuk daftar bloc
      const bloc = path.join(basePath, "bloc");

      // Path untuk cubit baru
      const folderPath = path.join(bloc, `${folderName}_cubit`);

      // Membuat folder jika belum ada
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      // Membuat file-file dalam folder
      files.forEach((file) => {
        const filePath = path.join(folderPath, file.name);
        fs.writeFileSync(filePath, file.content);
      });
      console.log(`'${folderName}_cubit' berhasil dibuat.`);
    }

    const files = [
      { name: `${inputName}_cubit.dart`, content: "" },
      { name: `${inputName}_state.dart`, content: "" },
    ];

    // Membuat struktur folder
    createCubit(basePath, inputName!, files);

    vscode.window.showInformationMessage("Feature folders created successfully!");
  });

  context.subscriptions.push(generateFolder);
}
