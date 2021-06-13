"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = exports.GitignoreRepository = void 0;
const vscode = require("vscode");
const cache_1 = require("./cache");
const GitHubApi = require("github");
const HttpsProxyAgent = require("https-proxy-agent");
const fs = require("fs");
const path_1 = require("path");
const https = require("https");
const url = require("url");
class CancellationError extends Error {
}
var OperationType;
(function (OperationType) {
    OperationType[OperationType["Append"] = 0] = "Append";
    OperationType[OperationType["Overwrite"] = 1] = "Overwrite";
})(OperationType || (OperationType = {}));
class GitignoreRepository {
    constructor(client) {
        this.client = client;
        const config = vscode.workspace.getConfiguration('gitignore');
        this.cache = new cache_1.Cache(config.get('cacheExpirationInterval', 3600));
    }
    /**
     * Get all .gitignore files
     */
    getFiles(path = '') {
        return new Promise((resolve, reject) => {
            // If cached, return cached content
            const item = this.cache.get('gitignore/' + path);
            if (typeof item !== 'undefined') {
                resolve(item);
                return;
            }
            // Download .gitignore files from github
            this.client.repos.getContent({
                owner: 'github',
                repo: 'gitignore',
                path: path
            }, (err, response) => {
                if (err) {
                    reject(`${err.code}: ${err.message}`);
                    return;
                }
                console.log(`vscode-gitignore: Github API ratelimit remaining: ${response.meta['x-ratelimit-remaining']}`);
                const files = response.data
                    .filter(file => {
                    return (file.type === 'file' && file.name.endsWith('.gitignore'));
                })
                    .map(file => {
                    return {
                        label: file.name.replace(/\.gitignore/, ''),
                        description: file.path,
                        url: file.download_url
                    };
                });
                // Cache the retrieved gitignore files
                this.cache.add(new cache_1.CacheItem('gitignore/' + path, files));
                resolve(files);
            });
        });
    }
    /**
     * Downloads a .gitignore from the repository to the path passed
     */
    download(operation) {
        return new Promise((resolve, reject) => {
            const flags = operation.type === OperationType.Overwrite ? 'w' : 'a';
            const file = fs.createWriteStream(operation.path, { flags: flags });
            // If appending to the existing .gitignore file, write a NEWLINE as separator
            if (flags === 'a') {
                file.write('\n');
            }
            const options = url.parse(operation.file.url);
            options.agent = getAgent(); // Proxy
            options.headers = {
                'User-Agent': userAgent
            };
            https.get(options, response => {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve(operation);
                });
            }).on('error', (err) => {
                // Delete the .gitignore file if we created it
                if (flags === 'w') {
                    fs.unlink(operation.path, err => {
                        if (err)
                            console.error(err.message);
                    });
                }
                reject(err.message);
            });
        });
    }
}
exports.GitignoreRepository = GitignoreRepository;
const userAgent = 'vscode-gitignore-extension';
// Read proxy configuration
const httpConfig = vscode.workspace.getConfiguration('http');
let proxy = httpConfig.get('proxy', undefined);
console.log(`vscode-gitignore: using proxy ${proxy}`);
// Create a Github API client
const client = new GitHubApi({
    protocol: 'https',
    host: 'api.github.com',
    //debug: true,
    pathPrefix: '',
    timeout: 5000,
    headers: {
        'User-Agent': userAgent
    },
    proxy: proxy
});
// Create gitignore repository
const gitignoreRepository = new GitignoreRepository(client);
let agent;
function getAgent() {
    if (agent) {
        return agent;
    }
    // Read proxy url in following order: vscode settings, environment variables
    proxy = proxy || process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
    if (proxy) {
        agent = new HttpsProxyAgent(proxy);
    }
    return agent;
}
function getGitignoreFiles() {
    // Get lists of .gitignore files from Github
    return Promise.all([
        gitignoreRepository.getFiles(),
        gitignoreRepository.getFiles('Global')
    ])
        // Merge the two result sets
        .then((result) => {
        const files = Array.prototype.concat.apply([], result)
            .sort((a, b) => a.label.localeCompare(b.label));
        return files;
    });
}
/**
 * Resolves the workspace folder by
 * - using the single opened workspace
 * - prompting for the workspace to use when multiple workspaces are open
 */
function resolveWorkspaceFolder(gitIgnoreFile) {
    const folders = vscode.workspace.workspaceFolders;
    // folders being falsy can have two reasons:
    // 1. no folder (workspace) open
    //    --> should never be the case as already handled before
    // 2. the version of vscode does not support the workspaces
    //    --> should never be the case as we require a vscode with support for it
    if (!folders) {
        return Promise.reject(new CancellationError());
    }
    else if (folders.length === 1) {
        return Promise.resolve({ file: gitIgnoreFile, path: folders[0].uri.fsPath });
    }
    else {
        return vscode.window.showWorkspaceFolderPick().then(folder => {
            if (!folder) {
                return Promise.reject(new CancellationError());
            }
            return Promise.resolve({ file: gitIgnoreFile, path: folder.uri.fsPath });
        });
    }
}
function promptForOperation() {
    return vscode.window.showQuickPick([
        {
            label: 'Append',
            description: 'Append to existing .gitignore file'
        },
        {
            label: 'Overwrite',
            description: 'Overwrite existing .gitignore file'
        }
    ]);
}
function showSuccessMessage(operation) {
    switch (operation.type) {
        case OperationType.Append:
            return vscode.window.showInformationMessage(`Appended ${operation.file.description} to the existing .gitignore in the project root`);
        case OperationType.Overwrite:
            return vscode.window.showInformationMessage(`Created .gitignore file in the project root based on ${operation.file.description}`);
        default:
            throw new Error('Unsupported operation');
    }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function activate(context) {
    console.log('vscode-gitignore: extension is now active!');
    const disposable = vscode.commands.registerCommand('addgitignore', () => {
        // Check if workspace open
        if (!vscode.workspace.workspaceFolders) {
            vscode.window.showErrorMessage('No workspace/directory open');
            return;
        }
        Promise.resolve()
            .then(() => {
            // Let the user pick a gitignore file
            return vscode.window.showQuickPick(getGitignoreFiles());
        })
            .then(file => {
            // Resolve the path to the folder where we should write the gitignore file
            // Check if the user picked up a gitignore file fetched from Github
            if (!file) {
                // Cancel
                throw new CancellationError();
            }
            return resolveWorkspaceFolder(file);
        })
            .then(({ file, path }) => {
            // Calculate operation
            console.log(`vscode-gitignore: add/append gitignore for directory: ${path}`);
            path = path_1.join(path, '.gitignore');
            return new Promise((resolve, reject) => {
                // Check if file exists
                fs.stat(path, (err) => {
                    if (err) {
                        // File does not exists -> we are fine to create it
                        return resolve({ path, file, type: OperationType.Overwrite });
                    }
                    promptForOperation()
                        .then(operation => {
                        if (!operation) {
                            // Cancel
                            reject(new CancellationError());
                            return;
                        }
                        const typedString = operation.label;
                        const type = OperationType[typedString];
                        resolve({ path, file, type });
                    });
                });
            });
        })
            .then((operation) => {
            // Store the file on file system
            return gitignoreRepository.download(operation);
        })
            .then((operation) => {
            // Show success message
            return showSuccessMessage(operation);
        })
            .catch(reason => {
            if (reason instanceof CancellationError) {
                return;
            }
            vscode.window.showErrorMessage(reason);
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function deactivate() {
    console.log('vscode-gitignore: extension is now deactivated!');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map