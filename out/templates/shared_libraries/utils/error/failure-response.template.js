"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFailureResponseTemplate = void 0;
function getFailureResponseTemplate(name) {
    return template(name);
}
exports.getFailureResponseTemplate = getFailureResponseTemplate;
function template(name) {
    return `import 'package:equatable/equatable.dart';

class FailureResponse extends Equatable {
  final String errorMessage;
  final int statusCode;

  const FailureResponse({
    required this.errorMessage,
    required this.statusCode,
  });

  @override
  List<Object?> get props => [errorMessage, statusCode];
}
`;
}
//# sourceMappingURL=failure-response.template.js.map