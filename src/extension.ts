import * as vscode from "vscode";
import { init, newBloc, newCubit, newFeature, newUseCase } from "./command";
import { newDomain } from "./command/new-domain";
import { newPresentation } from "./command/new-presentation";

export function activate(context: vscode.ExtensionContext) {
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
