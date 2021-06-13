"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
class LivePreview {
    constructor(context) {
        this.context = context;
        this.DEBUG = true;
        console.log('AJP - Registring live preview commands ...');
        context.subscriptions.push(vscode.commands.registerCommand('livePreview.updateLivePreview', (document) => {
            this.updateLivePreview(document);
        }));
    }
    updateLivePreview(document) {
        let outputPath = vscode.workspace.getConfiguration('livePreview').mainBundleJsPath;
        if (document.fileName.indexOf('\\src\\') < 0) {
            return;
        }
        else {
            outputPath = document.fileName.substring(0, document.fileName.indexOf('\\src\\')) + "\\" + outputPath;
        }
        if (!fs.existsSync(outputPath)) {
            console.log('Live Preview: ' + outputPath);
            const msg = 'main.bundle.js was not found. Try to build your app or configure mainBundleJsPath of Live Preview extension.';
            if (this.DEBUG) {
                vscode.window.showInformationMessage(msg);
            }
            console.log(msg);
            return;
        }
        let content = document.getText();
        content = this.updateHTML(content);
        fs.writeFile('_' + outputPath, content, { flag: 'w' }, function (err) {
            if (err) {
                throw err;
            }
            if (!outputPath) {
                console.log('Live Preview updated: ' + outputPath);
            }
        });
    }
    updateHTML(content) {
        return content;
    }
    deactivate() {
    }
    activate(context) {
    }
}
exports.LivePreview = LivePreview;
//# sourceMappingURL=livePreview.js.map