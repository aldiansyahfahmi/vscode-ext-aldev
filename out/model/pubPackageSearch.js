"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubPackageSearch = void 0;
class PubPackageSearch {
    constructor(packages, next, json) {
        this.packages = packages;
        this.next = next;
        this.json = json;
    }
    next;
    packages;
    json;
    static fromJSON(json) {
        return new PubPackageSearch(json["packages"].map((element) => element.package), json["next"], json);
    }
}
exports.PubPackageSearch = PubPackageSearch;
//# sourceMappingURL=pubPackageSearch.js.map