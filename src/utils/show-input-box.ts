import * as vscode from "vscode";

export function showInputBox(promptName: string): Thenable<string | undefined> {
  const featureName: vscode.InputBoxOptions = {
    prompt: promptName,
    placeHolder: "counter",
  };
  return vscode.window.showInputBox(featureName);
}
