import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { getCubitTemplate } from "../templates/cubit/cubit.template.js";
import { getCubitStateTemplate } from "../templates/cubit/cubit_state.template.js";
import { isNameValid } from "../utils/is-name-valid.js";
import { showInputBox } from "../utils/show-input-box.js";

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

    const cubitName = inputName?.toLowerCase();

    const files = [
      { name: `${cubitName}_cubit.dart`, content: getCubitTemplate(cubitName!) },
      { name: `${cubitName}_state.dart`, content: getCubitStateTemplate(cubitName!) },
    ];

    // Membuat struktur folder
    createCubit(basePath, cubitName!, files);

    vscode.window.showInformationMessage("Cubit created successfully!");
  });

  context.subscriptions.push(generateFolder);
}
