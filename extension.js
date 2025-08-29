// The module 'vscode' contains the VS Code extensibility API
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "testgenie" is now active!');

	const disposable = vscode.commands.registerCommand('testgenie.generateTests', function () {

		const editor = vscode.window.activeTextEditor;
		if(!editor)
		{
			vscode.window.showErrorMessage("No active editors found!");
			return;
		}
		const documentText = editor?editor.document.getText():"";

		const testCases=generateDummyTests(documentText);

		vscode.workspace.openTextDocument({content:testCases,language:'plaintext'}).then(doc=>{
			vscode.window.showTextDocument(doc);
		})
	});

	context.subscriptions.push(disposable);
}

function generateDummyTests(code)
{
	return `# Test Cases Generated
1. Input: 5 → Expected Output: 25
2. Input: -3 → Expected Output: 9
3. Input: 0 → Expected Output: 0

(Original file length: ${code.length} chars)`;
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
