"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNameValid = void 0;
const lodash_1 = __importDefault(require("lodash"));
function isNameValid(featureName) {
    // Check if feature name exists
    if (!featureName) {
        return false;
    }
    // Check if feature name is null or white space
    if (lodash_1.default.isNil(featureName) || featureName.trim() === "") {
        return false;
    }
    // Return true if feature name is valid
    return true;
}
exports.isNameValid = isNameValid;
//# sourceMappingURL=is_name_valid.js.map