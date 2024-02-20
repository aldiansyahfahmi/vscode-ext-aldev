import * as vscode from "vscode";
import { newCubit } from "./command/new-cubit.js";
import { newFeature } from "./command/new-feature.js";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vscode-ext-aldev" is now active!');
  let disposable = vscode.commands.registerCommand("vscode-ext-aldev.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World from vscode-ext-aldev!");
  });

  context.subscriptions.push(disposable);

  newFeature(context);
  newCubit(context);
}

// This method is called when your extension is deactivated
export function deactivate() {}
