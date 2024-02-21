import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { getBlocTemplate } from "../templates/feature/presentation/bloc/bloc.template.js";
import { getBlocEventTemplate } from "../templates/feature/presentation/bloc/bloc_event.template.js";
import { getBlocStateTemplate } from "../templates/feature/presentation/bloc/bloc_state.template.js";
import { isNameValid } from "../utils/is-name-valid.js";
import { showInputBox } from "../utils/show-input-box.js";

export async function newBloc(context: vscode.ExtensionContext) {
  let generateFolder = vscode.commands.registerCommand("vscode-ext-aldev.newBloc", async (uri: vscode.Uri) => {
    // Menampilkan form input
    let inputName = await showInputBox("Bloc name");

    // Cek apakah inputName valid
    if (!isNameValid(inputName)) {
      vscode.window.showErrorMessage("The name must not be empty");
      return;
    }
    // Uri menyediakan path ke folder yang diklik kanan
    const basePath = uri.fsPath;

    function create(basePath: string, folderName: string, files: { name: string; content: string }[]) {
      // Path untuk daftar bloc
      const bloc = path.join(basePath, "bloc");

      // Path untuk cubit baru
      const folderPath = path.join(bloc, `${folderName}_bloc`);

      // Membuat folder jika belum ada
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      // Membuat file-file dalam folder
      files.forEach((file) => {
        const filePath = path.join(folderPath, file.name);
        fs.writeFileSync(filePath, file.content);
      });
    }

    const cubitName = inputName?.toLowerCase();

    const files = [
      { name: `${cubitName}_bloc.dart`, content: getBlocTemplate(cubitName!) },
      { name: `${cubitName}_event.dart`, content: getBlocEventTemplate(cubitName!) },
      { name: `${cubitName}_state.dart`, content: getBlocStateTemplate(cubitName!) },
    ];

    // Membuat struktur folder
    create(basePath, cubitName!, files);

    vscode.window.showInformationMessage("Bloc created successfully!");
  });

  context.subscriptions.push(generateFolder);
}
