"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubAPI = exports.ResponseStatus = void 0;
require("./pubPackage");
const fuse_js_latest_1 = __importDefault(require("fuse-js-latest"));
const rm = __importStar(require("typed-rest-client/RestClient"));
const escapeHtml_1 = require("../helper/escapeHtml");
const getSettings_1 = require("../helper/getSettings");
const pubError_1 = require("./pubError");
const pubPackage_1 = require("./pubPackage");
const pubPackageSearch_1 = require("./pubPackageSearch");
const pubPage_1 = require("./pubPage");
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus["SUCCESS"] = "SUCCESS";
    ResponseStatus["FAILURE"] = "FAILURE";
})(ResponseStatus || (exports.ResponseStatus = ResponseStatus = {}));
const SuccessResponse = (result) => {
    return {
        status: ResponseStatus.SUCCESS,
        result,
    };
};
class PubAPI {
    baseUrl;
    restClient;
    constructor(baseUrl = "https://pub.dartlang.org/api/") {
        this.baseUrl = baseUrl;
        this.restClient = new rm.RestClient("Mozilla/5.0");
    }
    generateUrl(resource) {
        return this.baseUrl + resource;
    }
    async getPage(id = 1) {
        const response = await this.getPageJson(id);
        let result = pubPage_1.PubPage.fromJSON(response);
        return SuccessResponse(result);
    }
    async getPageJson(id = 1) {
        const res = await this.restClient.get(this.generateUrl(`packages?page=${id}`));
        if (!res.result) {
            throw new pubError_1.PubApiSearchError((0, pubError_1.PageSearchInfo)(id));
        }
        return res.result;
    }
    async searchPackage(query) {
        const fullQuery = `search?q=${(0, escapeHtml_1.escapeHtml)(query)}`;
        try {
            const res = await this.restClient.get(this.generateUrl(fullQuery));
            if (!res.result) {
                throw new pubError_1.PubApiSearchError((0, pubError_1.PackageSearchInfo)(query));
            }
            return SuccessResponse(pubPackageSearch_1.PubPackageSearch.fromJSON(res.result));
        }
        catch (e) {
            throw (0, pubError_1.getRestApiError)(e);
        }
    }
    async smartSearchPackage(query, singleReturnThreshold = 0.1) {
        const fuseOptions = {
            shouldSort: true,
            includeScore: true,
            threshold: 0.5,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: ["package"],
        };
        const response = await this.searchPackage(query);
        if (!response.result) {
            throw new pubError_1.PubApiSearchError((0, pubError_1.PackageSearchInfo)(query));
        }
        const searchResults = response.result;
        const fuse = new fuse_js_latest_1.default(searchResults.json.packages, fuseOptions);
        const rankedResult = fuse.search(query).filter((element) => !element.item.package.startsWith("dart:"));
        const significantResults = rankedResult.filter((element) => element.score <= singleReturnThreshold);
        if ((0, getSettings_1.getSettings)().autoAddPackage && significantResults.length > 0 && (significantResults.length === 1 || significantResults[0].score === 0)) {
            return {
                status: ResponseStatus.SUCCESS,
                result: new pubPackageSearch_1.PubPackageSearch([significantResults[0].item.package]),
            };
        }
        else {
            return {
                status: ResponseStatus.SUCCESS,
                result: new pubPackageSearch_1.PubPackageSearch(rankedResult.map((element) => element.item.package)),
            };
        }
    }
    async getPackage(name) {
        try {
            const res = await this.restClient.get(this.generateUrl(`packages/${name}`));
            if (!res.result) {
                throw new pubError_1.PubApiSearchError((0, pubError_1.PackageSearchInfo)(name));
            }
            return SuccessResponse(pubPackage_1.PubPackage.fromJSON(res.result));
        }
        catch (e) {
            throw (0, pubError_1.getRestApiError)(e);
        }
    }
}
exports.PubAPI = PubAPI;
//# sourceMappingURL=pubApi.js.map