"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const livePreview_1 = require("./livePreview");
function activate(context) {
    const livePreview = new livePreview_1.LivePreview(context);
    vscode.workspace.onDidSaveTextDocument(document => {
        var livePreviewIsActive = vscode.workspace.getConfiguration('livePreview').on;
        if (livePreviewIsActive) {
            let fileExtension = '';
            if (document != undefined && document.fileName != undefined && document.fileName.lastIndexOf('.') > -1) {
                fileExtension = document.fileName.substring(document.fileName.lastIndexOf('.') + 1);
            }
            if (vscode.workspace.getConfiguration('livePreview').liveUpdateFilesExtension.split(' ').indexOf(fileExtension) >= 0) {
                vscode.commands.executeCommand('livePreview.updateLivePreview', document);
            }
        }
    });
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map