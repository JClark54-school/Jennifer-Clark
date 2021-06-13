"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AjuroTemplate_1 = require("./AjuroTemplate");
const vscode = require("vscode");
const fs = require("fs");
class TemplateManagerProvider {
    // Register commands
    constructor(context) {
        this.context = context;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        /**
         * Given the path to package.json, read all its dependencies and devDependencies.
         */
        this.getTemplates = function (dir) {
            var fs = fs || require('fs'), files = fs.readdirSync(dir);
            const templates = new Array();
            files.forEach(file => {
                if (fs.statSync(dir + '\\' + file).isDirectory()) {
                    var template = new AjuroTemplate_1.AjuroTemplate(dir, file, true);
                    template.Children = this.getTemplates(dir + '\\' + file);
                    templates.push(template);
                }
                else {
                    // templates.push(new AjuroTemplate(dir, file, false));
                }
            });
            return templates;
        };
        console.log('AJP - Registring template manager commands ...');
        this.File = new AjuroTemplate_1.AjuroTemplate('C:', vscode.workspace.getConfiguration('TemplateManagerProvider').templateFilesRootDirectory, true);
        context.subscriptions.push(vscode.commands.registerCommand('templateManager.refreshEntry', () => this.refresh()), vscode.commands.registerCommand('templateManager.addEntry', node => vscode.window.showInformationMessage('Successfully called add entry')), vscode.commands.registerCommand('templateManager.deleteEntry', node => vscode.window.showInformationMessage('Successfully called delete entry')), vscode.commands.registerCommand('openTemplateFile', (node) => {
            const lastVersion = this.FindLastVersion(node);
            if (lastVersion != null) {
                vscode.workspace.openTextDocument(node.FilePath + '\\' + node.FileName + '\\' + lastVersion).then(document => {
                    vscode.window.showTextDocument(document);
                });
            }
        }));
        console.log('AJP - Searching for templates ...');
        const LatestTemplatesAssress = 'https://github.com/profimedica/Templater/wiki/Ajuro-Template-Processor';
        if (this.pathExists(this.File.FilePath + '\\' + this.File.FileName)) {
            this.File.Children = this.getTemplates(this.File.FilePath + '\\' + this.File.FileName);
            console.log('Found: ' + this.File.Children.length + ' templates.');
        }
        else {
            vscode.window.showInformationMessage('Templates folder was not found: "' + this.File.FilePath + '\\' + this.File.FileName + '". Visit the project page to download templates: ' + LatestTemplatesAssress);
        }
    }
    FindLastVersion(node) {
        var fs = fs || require('fs');
        let fileName;
        let files = fs.readdirSync(node.FilePath + '\\' + node.FileName);
        fileName = files.sort((a, b) => 0 - (a > b ? 1 : -1))[0];
        if (fs.statSync(node.FilePath + '\\' + node.FileName + '\\' + fileName).isDirectory()) {
            fileName = null;
        }
        return (fileName);
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    /*getTreeItem(element: AjuroTemplate): vscode.TreeItem {
        return element;
    }*/
    getTreeItem(node) {
        if (node) {
            let nodeFileName = node.FileName;
            if (!node.IsDir && node.FileName.indexOf('.') > 0) {
                // nodeFileName = node.FileName.substring(0, node.FileName.lastIndexOf('.'))
            }
            let treeItem = new vscode.TreeItem(nodeFileName, node.Children.length > 0 ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None);
            treeItem.command = {
                command: 'openTemplateFile',
                title: '',
                arguments: [node]
            };
            return treeItem;
        }
    }
    _getChildren(node) {
        if (node) {
            return Promise.resolve(this.getTemplates(node.FilePath + '\\' + node.FileName));
        }
        else {
            return Promise.resolve(this.File ? this.File.Children : []);
        }
    }
    getChildren(node) {
        if (node) {
            return Promise.resolve(this.getTemplates(node.FilePath + '\\' + node.FileName));
        }
        else {
            return Promise.resolve(this.File ? this.File.Children : []);
        }
    }
    pathExists(p) {
        try {
            fs.accessSync(p);
        }
        catch (err) {
            return false;
        }
        return true;
    }
}
exports.TemplateManagerProvider = TemplateManagerProvider;
//# sourceMappingURL=templateManagerProvider.js.map