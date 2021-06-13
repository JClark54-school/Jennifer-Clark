'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const cp = require("child_process");
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.forevolve.gitext.browse', (uri) => __awaiter(this, void 0, void 0, function* () {
        // Getting the current right-clicked file, defaulting to the root workspace directory
        let workspaceRoot = uri.fsPath || vscode.workspace.rootPath || '';
        const usedDefault = uri && uri.fsPath ? false : true;
        // Logging some debug info no matter what
        console.log(`extension.forevolve.gitext.browse based on: ${workspaceRoot} | Used default: ${usedDefault}`);
        // If there is nothing to launch, return
        const emptyTasks = [];
        if (!workspaceRoot) {
            return emptyTasks;
        }
        // If its a file, strip the filename; gitext is expecting a directory
        if (uri.scheme === 'file') {
            const indexWin = workspaceRoot.lastIndexOf('\\');
            const indexOthers = workspaceRoot.lastIndexOf('//');
            const index = Math.max(indexWin, indexOthers);
            workspaceRoot = workspaceRoot.substr(0, index);
            console.log(`extension.forevolve.gitext.browse extracted directory: ${workspaceRoot}`);
        }
        // Displaying a message box to the user
        const message = usedDefault
            ? 'Opening GitExtensions based on the workspace root.'
            : `Opening GitExtensions based on: ${workspaceRoot}`;
        vscode.window.showInformationMessage(message);
        // Launching Git Extensions
        const { stdout, stderr } = yield exec('gitextensions browse', { cwd: workspaceRoot });
        // Display error
        if (stderr && stderr.length > 0) {
            vscode.window.showErrorMessage(stderr);
        }
        // Display output
        if (stdout) {
            vscode.window.showInformationMessage(stdout);
        }
        return emptyTasks;
    }));
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
function exec(command, options) {
    return new Promise((resolve, reject) => {
        cp.exec(command, options, (error, stdout, stderr) => {
            if (error) {
                reject({ error, stdout, stderr });
            }
            resolve({ stdout, stderr });
        });
    });
}
//# sourceMappingURL=extension.js.map