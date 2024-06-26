"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubPage = void 0;
const pubPackage_1 = require("./pubPackage");
class PubPage {
    constructor(nextUrl, packages, json) {
        this.nextUrl = nextUrl;
        this.packages = packages;
        this.json = json;
    }
    nextUrl;
    packages;
    json;
    static fromJSON(json) {
        return new PubPage(json["next_url"], json["packages"].map((element) => pubPackage_1.PubPackage.fromJSON(element)), json);
    }
}
exports.PubPage = PubPage;
//# sourceMappingURL=pubPage.js.map