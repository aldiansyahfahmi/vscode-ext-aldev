import * as vscode from "vscode";
import { init, newBloc, newCubit, newFeature, newUseCase } from "./command";
import { newDomain } from "./command/new-domain";
import { newPresentation } from "./command/new-presentation";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vscode-ext-aldev" is now active!');
  let disposable = vscode.commands.registerCommand("vscode-ext-aldev.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World from vscode-ext-aldev!");
  });

  context.subscriptions.push(disposable);

  newFeature(context);
  newCubit(context);
  newBloc(context);
  newUseCase(context);
  init(context);
  newDomain(context);
  newPresentation(context);
}

// This method is called when your extension is deactivated
export function deactivate() {}
