"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const lodash_1 = __importDefault(require("lodash"));
const git_remote_origin_url_1 = __importDefault(require("git-remote-origin-url"));
const git_branch_1 = __importDefault(require("git-branch"));
const voca_1 = __importDefault(require("voca"));
const url_1 = __importDefault(require("./url"));
const child_process_1 = require("child_process");
const promise_1 = __importDefault(require("simple-git/promise"));
function activate(context) {
    console.log('Congratulations, your extension "github-links" is now active!');
    let disposable = vscode.commands.registerCommand('extension.github_history', () => {
        doAction(createHistoryUrl).then(e => console.log("Opened history url"));
    });
    let page = vscode.commands.registerCommand('extension.github_page', () => {
        doAction(createPageUrl).then(e => console.log("Opened page url"));
    });
    let blame = vscode.commands.registerCommand('extension.github_blame', () => {
        doAction(createBlameUrl, addLineSuffix).then(e => console.log("Opened blame url"));
    });
    context.subscriptions.push(page);
    context.subscriptions.push(blame);
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function getCurrentFile() {
    let fileName = lodash_1.default.get(vscode.window.activeTextEditor, 'document.fileName');
    return url_1.default.toForwardSlash(fileName || '');
}
function getCurrentLine() {
    let lineNo = lodash_1.default.get(vscode.window.activeTextEditor, 'selection.active.line');
    return lineNo;
}
function addLineSuffix(link) {
    let lineno = getCurrentLine();
    return `${link}#L${lineno}`;
}
function doAction(createUrl, patchUrl = lodash_1.default.identity) {
    return __awaiter(this, void 0, void 0, function* () {
        return getUrl(getCurrentFile(), createUrl)
            .then(url => {
            openUrl(patchUrl(url));
        })
            .catch(error => {
            vscode.window.showInformationMessage(`Error creating url: ${error}`);
        });
    });
}
function createBlameUrl(remoteUrl, branchName) {
    return `${remoteUrl}blame/${branchName}`;
}
function createPageUrl(remoteUrl, branchName) {
    return `${remoteUrl}blob/${branchName}`;
}
function createHistoryUrl(remoteUrl, branchName) {
    return `${remoteUrl}commits/${branchName}`;
}
function getUrl(filePath, createUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        filePath = voca_1.default.capitalize(filePath);
        let folder = url_1.default.parentPath(filePath);
        let remoteUrl = yield getBaseUrl(folder);
        const branchName = yield getBranch(folder);
        let filePagePath = createUrl(remoteUrl, branchName);
        let rootFolder = url_1.default.toForwardSlash(yield getRootFolder(folder));
        rootFolder = voca_1.default.capitalize(rootFolder);
        let relPath = url_1.default.makeRelativePath(filePath, url_1.default.appendSlash(rootFolder));
        return `${filePagePath}/${relPath}`;
    });
}
function getBaseUrl(folder) {
    return __awaiter(this, void 0, void 0, function* () {
        let remoteUrl = url_1.default.toForwardSlash(yield git_remote_origin_url_1.default(folder));
        remoteUrl = voca_1.default.replace(remoteUrl, ':', '/');
        remoteUrl = voca_1.default.replace(remoteUrl, 'git@', 'https://');
        remoteUrl = voca_1.default.substring(remoteUrl, 0, remoteUrl.length - 4);
        return url_1.default.appendSlash(remoteUrl);
    });
}
function getBranch(folder) {
    return __awaiter(this, void 0, void 0, function* () {
        return git_branch_1.default(folder);
    });
}
function getRootFolder(folder) {
    return __awaiter(this, void 0, void 0, function* () {
        let git = promise_1.default(folder);
        let val = git.revparse(['--show-toplevel']);
        return val;
    });
}
function openUrl(url) {
    child_process_1.exec(`start "" ${url}`, (error) => {
        if (error) {
            return vscode.window.showInformationMessage(`Could not open link ${error}`);
        }
    });
}
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map