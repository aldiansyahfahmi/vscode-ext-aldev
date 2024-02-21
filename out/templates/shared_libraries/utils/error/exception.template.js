"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExceptionTemplate = void 0;
function getExceptionTemplate(name) {
    return template(name);
}
exports.getExceptionTemplate = getExceptionTemplate;
function template(name) {
    return `class ServerException implements Exception {}

class DatabaseException implements Exception {
  final String message;

  DatabaseException(this.message);
}
`;
}
//# sourceMappingURL=exception.template.js.map