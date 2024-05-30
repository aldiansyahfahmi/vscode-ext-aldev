"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValue = void 0;
const pubError_1 = require("../model/pubError");
const messaging_1 = require("./messaging");
const getValue = async (f) => {
    let value;
    let tryAgain = true;
    while (tryAgain) {
        try {
            value = f();
            tryAgain = false;
        }
        catch (error) {
            if (error instanceof pubError_1.PubApiNotRespondingError) {
                tryAgain = await (0, messaging_1.showRetryableError)(error);
            }
            else {
                (0, messaging_1.handleCriticalError)(error);
                tryAgain = false;
            }
        }
    }
    return value;
};
exports.getValue = getValue;
//# sourceMappingURL=getValue.js.map