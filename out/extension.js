"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const command_1 = require("./command");
const new_domain_1 = require("./command/new-domain");
const new_presentation_1 = require("./command/new-presentation");
const new_simple_domain_1 = require("./command/new-simple-domain");
function activate(context) {
    (0, command_1.newFeature)(context);
    (0, command_1.newCubit)(context);
    (0, command_1.newBloc)(context);
    (0, command_1.newUseCase)(context);
    (0, command_1.init)(context);
    (0, new_domain_1.newDomain)(context);
    (0, new_simple_domain_1.newSimpleDomain)(context);
    (0, new_presentation_1.newPresentation)(context);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map