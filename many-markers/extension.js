// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

const lightColors = [
  "#ffadad",
  "#ffd6a5",
  "#fdffb6",
  "#caffbf",
  "#9bf6ff",
  "#a0c4ff",
  "#bdb2ff",
  "#ffc6ff",
  "#fffffc",
];

const darkColors = [
  "#573a3a",
  "#554939",
  "#59593c",
  "#415a3d",
  "#375053",
  "#384254",
  "#3f3c58",
  "#5d3d5d",
  "#676745",
];
let decorationTypes = lightColors.map((_, i) =>
  vscode.window.createTextEditorDecorationType({
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
    borderStyle: "solid",
    borderWidth: "0 1px 0 0",
    overviewRulerLane: vscode.OverviewRulerLane.Right,
    light: {
      borderColor: darkColors[i],
      overviewRulerColor: darkColors[i],
    },
    dark: {
      borderColor: lightColors[i],
      overviewRulerColor: lightColors[i],
    },
  })
);
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let anchors = context.workspaceState.get("anchors") || [];

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  // background-color: #007ACC;
  // width: 2px !important;
  // ! handle too many anchors
  let activeEditor = vscode.window.activeTextEditor;

  let disposable = vscode.commands.registerCommand(
    "many-anchors.helloWorld",
    async function () {
      let position = activeEditor.selection.active;
      activeEditor.setDecorations(decorationTypes[anchors.length], [
        {
          range: new vscode.Range(position, position),
          description: "selection-anchor",
          hoverMessage: new vscode.MarkdownString("Selection Anchor"),
        },
      ]);
      anchors.push("idk");
      context.workspaceState.update("anchors", anchors);
      // 	const newDecorationId = this.editor.deltaDecorations(previousDecorations,
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage(JSON.stringify(anchors));
    }
  );

  context.subscriptions.push(disposable);
}

module.exports = {
  activate,
};

/*
- editor.action.goToSelectionAnchor
editor.action.cancelSelectionAnchor
editor.action.setSelectionAnchor


editor.action.selectFromAnchorToCursor
*/
