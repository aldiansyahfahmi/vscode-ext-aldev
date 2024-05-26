"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppRoutesTemplate = void 0;
function getAppRoutesTemplate(name) {
    return template(name);
}
exports.getAppRoutesTemplate = getAppRoutesTemplate;
function template(name) {
    return `class AppRoutes {
  static const String main = '/main';
  static const String signIn = '/sign-in';
}

`;
}
//# sourceMappingURL=app-routes.template.js.map