"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCachedUserDataTemplate = void 0;
function getCachedUserDataTemplate(name) {
    return template(name);
}
exports.getCachedUserDataTemplate = getCachedUserDataTemplate;
function template(name) {
    return `class CachedUserData {
  String? token;

  CachedUserData({
    this.token,
  });
}

`;
}
//# sourceMappingURL=cached-user-data.template.js.map