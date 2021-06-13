"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
* Copyright 2018 Adobe
* All Rights Reserved.
*
* NOTICE: All information contained herein is, and remains
* the property of Adobe and its suppliers, if any. The intellectual
* and technical concepts contained herein are proprietary to Adobe
* and its suppliers and are protected by all applicable intellectual
* property laws, including trade secret and copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe.
**************************************************************************/
const url_1 = __importDefault(require("url"));
const voca_1 = __importDefault(require("voca"));
const lodash_1 = __importDefault(require("lodash"));
var globalObject = { location: '' };
class URL {
    static params(query) {
        return URL.parseParams(query);
    }
    static parseParams(params) {
        return lodash_1.default.transform(lodash_1.default.map(params && params.split('&'), pair => pair.split('=')), (obj, pair) => {
            obj[pair[0]] = pair[1] && URL.decodeURI(pair[1]);
        }, {});
    }
    static decodeURI(url) {
        try {
            let ret = decodeURIComponent(url);
            return ret;
        }
        catch (e) {
            return '';
        }
    }
    static createUrl(opts) {
        let baseUrl = opts.baseUrl;
        if (!lodash_1.default.isEmpty(opts.params)) {
            let paramsString = lodash_1.default.isString(opts.params) ? opts.params : URL.mapToEncodedString(opts.params);
            baseUrl = `${baseUrl}?${paramsString}`;
        }
        if (!lodash_1.default.isEmpty(opts.hash)) {
            let hashString = lodash_1.default.isString(opts.hash) ? opts.hash : URL.mapToEncodedString(opts.hash);
            baseUrl = `${baseUrl}#${hashString}`;
        }
        return baseUrl;
    }
    static updateUrlParams(url, params) {
        let hash = URL.extractHashString(url);
        params = lodash_1.default.extend(URL.parseParams(URL.extractParamString(url)), params);
        return URL.createUrl({ baseUrl: URL.filePath(url), hash: hash, params: params });
    }
    static updateUrlHash(url, hash) {
        let params = URL.extractParamString(url);
        hash = lodash_1.default.extend(URL.parseParams(URL.extractHashString(url)), hash);
        return URL.createUrl({ baseUrl: URL.filePath(url), hash: hash, params: params });
    }
    static scheme(url) {
        url = url || '';
        let index, scheme = '', firstChar = lodash_1.default.first(url);
        index = url.indexOf(':');
        if (firstChar !== '.' && firstChar !== '/' && firstChar !== '#' && index !== -1) {
            scheme = url.substring(0, index + 1).toLowerCase().trim();
        }
        return scheme + "";
    }
    static protocol(url) {
        const urlData = url ? url_1.default.parse(url) : { protocol: '' };
        return (url && !URL.hasWindowsDrive(url)) ? urlData.protocol || '' : '';
    }
    static hasWindowsDrive(url) {
        let drive = voca_1.default.matches(url, /^([a-zA-Z]+):\//), protocol = voca_1.default.matches(url, /^([a-zA-Z]+):\/\//);
        return drive && !protocol;
    }
    static host(url) {
        url = url || '';
        let scheme = URL.scheme(url);
        return lodash_1.default.first(lodash_1.default.compact(lodash_1.default.split(url.substr(scheme.length), '/')));
    }
    static hostName(url) {
        return lodash_1.default.first(lodash_1.default.split(URL.host(url) || '', ':'));
    }
    static hasHttpProtocol(url) {
        let protocol = URL.protocol(url);
        return protocol === 'http:' || protocol === 'https:';
    }
    static hasFtpProtocol(url) {
        let protocol = URL.protocol(url);
        return protocol === 'ftp:';
    }
    static hasFileProtocol(url) {
        return URL.protocol(url) === 'file:';
    }
    static hasRhpjProtocol(url) {
        return URL.protocol(url) === 'rhpj:';
    }
    static stripRhpjProtocol(url) {
        return URL.hasRhpjProtocol(url) ? url.substring('rhpj:'.length) : url;
    }
    static stripProtocol(url) {
        let protocol = URL.protocol(url);
        return url && url.substring(protocol.length + 2);
    }
    static isRemoteUrl(url) {
        return URL.hasHttpProtocol(url) || URL.hasFtpProtocol(url);
    }
    static assureOrigin(url) {
        if (url && !URL.isRelativeUrl(url) && !URL.scheme(url)) {
            return `${globalObject.location}${url}`;
        }
        return url;
    }
    static removeOrigin(url) {
        if (!URL.isRelativeUrl(url)) {
            url = `/${URL.makeRelativeUrl(url, `/`)}`;
        }
        return url;
    }
    static isRelativeUrl(url) {
        return !!((url === '') || url && !URL.scheme(url) && voca_1.default.indexOf(voca_1.default.trim(url), '/') !== 0);
    }
    static filePath(url) {
        let index;
        url = url || '';
        index = url.indexOf('?');
        if (index !== -1) {
            url = url.substring(0, index);
        }
        index = url.indexOf('#');
        if (index !== -1) {
            url = url.substring(0, index);
        }
        return url;
    }
    static sanitize(webURL) {
        return voca_1.default.replaceAll(webURL, ' ', '_');
    }
    static fileName(url) {
        url = url || '';
        let index = voca_1.default.lastIndexOf(url, "/");
        if (index !== -1 && index === (url.length - 1)) {
            return URL.fileName(url.substr(0, index));
        }
        return index !== -1 ? voca_1.default.substr(url, index + 1) : url;
    }
    static Length(url) {
        url = url || '';
        return url.length;
    }
    static fileNameWithoutExt(url) {
        let fileName = URL.fileName(url);
        let extIdx = voca_1.default.indexOf(fileName, '.');
        return voca_1.default.substring(fileName, 0, extIdx === -1 ? URL.Length(fileName) : extIdx);
    }
    static fileNameNoExt(url) {
        return URL.fileNameWithoutExt(url);
    }
    static extractStringBetween(str, startChar, endChar) {
        str = str || '';
        let substring, start = voca_1.default.indexOf(str, startChar);
        if (start !== -1) {
            let end = str.indexOf(endChar);
            if (end < start) {
                end = str.length;
            }
            substring = str.substring(start + 1, end);
        }
        return substring || '';
    }
    static extractAfterFile(url) {
        return voca_1.default.substring(url, URL.Length(URL.filePath(url)));
    }
    static extractHashString(url) {
        return this.extractStringBetween(url, '#', '?');
    }
    static extractParamString(url) {
        return this.extractStringBetween(url, '?', '#');
    }
    static isSameOrigin(srcUrl, baseUrl = '') {
        if (!URL.protocol(srcUrl) && !URL.protocol(baseUrl)) {
            return true;
        }
        srcUrl = URL.assureOrigin(srcUrl);
        baseUrl = URL.assureOrigin(baseUrl);
        let baseOrigin = baseUrl ? lodash_1.default.slice(voca_1.default.split(baseUrl, '/'), 0, 3).join('/') : '';
        return voca_1.default.search(srcUrl, baseOrigin) === 0;
    }
    static hasBaseUrl(srcUrl, baseUrl) {
        return !!(srcUrl && (srcUrl.startsWith(baseUrl)));
    }
    static isInternal(relUrl, baseUrl) {
        let absUrl = URL.makeFullPath(relUrl, baseUrl);
        return URL.isSameOrigin(absUrl, baseUrl);
    }
    static makeRelativeUrl(srcUrl, baseUrl) {
        if (srcUrl === baseUrl) {
            return '';
        }
        if (!srcUrl || !baseUrl) {
            return srcUrl;
        }
        let absPath = URL.filePath(srcUrl);
        let relPath = URL.makeRelativePath(absPath, URL.filePath(baseUrl));
        return `${relPath}${voca_1.default.substring(srcUrl, absPath.length)}`;
    }
    static makeRelativeFolder(srcFolder, baseFile) {
        let relPath = URL.makeRelativePath(srcFolder, baseFile);
        return relPath ? URL.removeSlash(relPath) : '.';
    }
    static commonPrefixIdx(str1, str2) {
        let minLength = lodash_1.default.min([str1.length, str2.length]) || 0;
        let matchLength = lodash_1.default.findIndex(lodash_1.default.range(minLength), idx => voca_1.default.charAt(str1, idx) !== voca_1.default.charAt(str2, idx));
        return matchLength === -1 ? minLength - 1 : matchLength - 1;
    }
    static commonPrefix(str1, str2) {
        return voca_1.default.substring(str1, 0, this.commonPrefixIdx(str1, str2) + 1);
    }
    static makeRelativePath(srcUrl, baseUrl) {
        srcUrl = URL.assureOrigin(srcUrl);
        baseUrl = URL.assureOrigin(baseUrl);
        if (!srcUrl || URL.isRelativeUrl(srcUrl) || URL.isRelativeUrl(baseUrl) || !URL.isSameOrigin(srcUrl, baseUrl)) {
            return srcUrl;
        }
        let commonPrefix = this.commonPrefix(srcUrl, baseUrl), commonParts = commonPrefix.split('/'), srcParts = voca_1.default.split(srcUrl, '/'), baseParts = voca_1.default.split(baseUrl, '/'), relParts = lodash_1.default.map(lodash_1.default.range(baseParts.length - commonParts.length), () => '..'), suffixParts = lodash_1.default.slice(srcParts, commonParts.length - 1);
        relParts = relParts.concat(suffixParts);
        if (relParts.length === 1) {
            let relUrl = lodash_1.default.first(relParts) || '', relPath = URL.filePath(relUrl);
            return relPath === relUrl || relPath !== lodash_1.default.last(commonParts) ? relUrl : relUrl.substring(relPath.length);
        }
        return relParts.join('/');
    }
    static makeFullPath(relUrl, baseUrl) {
        if (!URL.isRelativeUrl(relUrl) || URL.isRelativeUrl(baseUrl)) {
            return relUrl;
        }
        let baseParts = URL.filePath(baseUrl).split('/'), relPath = URL.filePath(relUrl), params = relUrl && relUrl.substring(relPath.length), relParts = voca_1.default.split(relPath, '/');
        if (relParts.length > 1 || relParts[0]) {
            baseParts.pop();
            lodash_1.default.each(relParts, relPart => {
                if (relPart === '..') {
                    baseParts.pop();
                }
                else if (relPart !== '.') {
                    baseParts.push(relPart);
                }
            });
        }
        return `${baseParts.join('/')}${params}`;
    }
    static makeRelativePathFromFolder(relUrl, baseFolder) {
        return URL.makeRelativePath(relUrl, URL.appendSlash(baseFolder));
    }
    static makePathFromFolder(relUrl, baseFolder) {
        return URL.makeFullPath(relUrl, URL.appendSlash(baseFolder));
    }
    static makePath(baseFolder, appendPath) {
        if (!baseFolder) {
            return appendPath;
        }
        if (lodash_1.default.first(appendPath) === '/') {
            appendPath = voca_1.default.substring(appendPath, 1);
        }
        if (lodash_1.default.last(baseFolder) === '/') {
            return `${baseFolder}${appendPath}`;
        }
        return `${baseFolder}/${appendPath}`;
    }
    static mapToEncodedString(map, explodeKey = '&', mapKey = '=') {
        return lodash_1.default.reduce(map, (result, value, key) => {
            if (!lodash_1.default.isUndefined(value)) {
                if (result.length > 0) {
                    result += explodeKey;
                }
                result += `${key}${mapKey}${encodeURIComponent(value)}`;
            }
            return result;
        }, '');
    }
    static ext(filePath) {
        if (filePath) {
            let idx = voca_1.default.lastIndexOf(filePath, '.');
            if (idx !== -1) {
                return voca_1.default.substring(filePath, idx + 1);
            }
        }
        return '';
    }
    static appendBookmark(file, bookmark) {
        if (bookmark) {
            let bookmarkTag = URL.extractHashString(bookmark);
            file = bookmarkTag !== "" ? `${file}#${bookmarkTag}` : file;
        }
        return file;
    }
    static isSameExt(file1, file2) {
        return URL.ext(file1) === URL.ext(file2);
    }
    static removeExtension(filePath) {
        if (filePath) {
            let idx = voca_1.default.lastIndexOf(filePath, '.');
            let fileNoExt = filePath;
            if (idx !== -1) {
                fileNoExt = voca_1.default.substring(filePath, 0, idx);
            }
            return fileNoExt;
        }
        return filePath || '';
    }
    static removeFirstChar(text, char) {
        if (char !== undefined) {
            text = (text && text.substring(0, 1)) === char ? text.substring(1) : text;
            return text;
        }
        return text && text.substring(1) || '';
    }
    static changeExt(filePath, ext) {
        if (filePath && ext) {
            ext = this.removeFirstChar(ext, '.');
            let idx = voca_1.default.lastIndexOf(filePath, '.');
            let fileNoExt = filePath;
            if (idx !== -1) {
                fileNoExt = voca_1.default.substring(filePath, 0, idx);
            }
            return ext ? `${fileNoExt}.${ext}` : fileNoExt;
        }
        return filePath || '';
    }
    static changeName(filePath, newName) {
        let path = URL.parentPath(filePath);
        return `${URL.appendSlash(path)}${newName}`;
    }
    static changeNameNoExt(filePath, newName) {
        let path = URL.parentPath(filePath);
        return URL.changeExt(`${URL.appendSlash(path)}${newName}`, URL.ext(filePath));
    }
    static parentName(filePath) {
        let parent = URL.parentPath(filePath);
        return URL.fileName(parent);
    }
    static isAncestor(path, ancestor) {
        return lodash_1.default.startsWith(path, ancestor);
    }
    static isSubDirectory(parent, child) {
        return !URL.makeRelativePath(child, parent).startsWith('..');
    }
    static changeAncestor(filePath, oldFilePath, newFilePath) {
        filePath = filePath || '';
        return filePath.replace(oldFilePath, newFilePath);
    }
    static parentPath(filePath = URL.filePath('')) {
        let length = filePath ? 0 : filePath.length, index = voca_1.default.lastIndexOf(filePath, '/');
        if (index === -1) {
            return '';
        }
        if (index !== -1) {
            filePath = voca_1.default.substring(filePath, 0, index);
            if (index === length - 1) {
                filePath = URL.parentPath(filePath);
            }
        }
        return filePath;
    }
    static ancestors(filePath) {
        let ancs = [];
        while (filePath = URL.parentPath(filePath)) {
            ancs.push(filePath);
        }
        return ancs;
    }
    static nearestFolder(path) {
        return voca_1.default.endsWith(path, '/') ? path : URL.parentPath(path);
    }
    static isAbsoluteUrl(url) {
        return !URL.isRelativeUrl(url);
    }
    static isFilePath(path) {
        path = URL.filePath(path);
        let fileName = path && URL.fileName(path);
        return !!(fileName && fileName !== '.' && fileName.indexOf('.') !== -1);
    }
    static isFolder(path) {
        return !!(path && !URL.isFilePath(path));
    }
    static toWindowsBashPath(path) {
        path = path && URL.toForwardSlash(path);
        path = path && path.replace(/^[A-Z]:/, (matched) => matched && '/' + matched.toLowerCase().slice(0, 1));
        return path && path.replace(/ /g, '\\ ');
    }
    static toForwardSlash(path) {
        if (lodash_1.default.isArray(path)) {
            return lodash_1.default.map(path, item => URL._toFwdSlash(item));
        }
        return URL._toFwdSlash(path);
    }
    static _toFwdSlash(path) {
        return path && lodash_1.default.replace(path, /\\/g, '/');
    }
    static toBackSlash(path) {
        return path && lodash_1.default.replace(path, /\//g, '\\');
    }
    static toDoubleBackSlash(path) {
        return path && lodash_1.default.replace(path, /\//g, '\\\\');
    }
    static equalNoCase(text1, text2) {
        // Depercate API, use localeCompare
        return voca_1.default.lowerCase(text1) === voca_1.default.lowerCase(text2);
    }
    static appendSlash(path) {
        return (path && path.lastIndexOf('/') !== path.length - 1
            && path + '/') || path;
    }
    static prependSlash(path) {
        if (path && !lodash_1.default.isEmpty(path) && !path.startsWith('/')) {
            return '/' + path;
        }
        return path;
    }
    static appendPath(path1, path2) {
        path1 = URL.appendSlash(path1);
        path2 = path2 && (path2.length > 0) &&
            path2[0] === '/' &&
            path2.substring(1) || path2;
        return (path2 && path2.length > 0) ? `${path1}${path2}` : path1;
    }
    static appendPaths(path1, ...paths) {
        let path = path1;
        lodash_1.default.each(paths, path2 => {
            path = URL.appendPath(path, path2);
        });
        return path;
    }
    static removeSlash(path) {
        return (path && path.lastIndexOf('/') === path.length - 1
            && path.substring(0, path.length - 1)) || path;
    }
    static decodedPath(url) {
        return url && URL.stripParam(URL.stripBookmark(URL.decodeURI(url)));
    }
    static stripStringBetween(str, startChar, endChar) {
        let newStr = str;
        const start = lodash_1.default.indexOf(str, startChar);
        if (start !== -1) {
            let end = lodash_1.default.indexOf(str, endChar);
            if (end < start) {
                end = str.length;
            }
            newStr = `${voca_1.default.substring(str, 0, start)}${voca_1.default.substring(str, end, str.length)}`;
        }
        return newStr;
    }
    static stripParam(url) {
        return url && URL.stripStringBetween(url, '?', '#');
    }
    static stripBookmark(url) {
        return url && URL.stripStringBetween(url, '#', '?');
    }
    static getBookmark(url) {
        return URL.extractHashString(url);
    }
    static fileNameToTitle(filePath) {
        let fileNameNoExt = URL.fileNameNoExt(filePath);
        fileNameNoExt = fileNameNoExt.replace(/_/g, ' ');
        return voca_1.default.capitalize(fileNameNoExt);
    }
}
exports.default = URL;
//# sourceMappingURL=url.js.map