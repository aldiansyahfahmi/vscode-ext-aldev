"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFailureResponseTemplate = void 0;
function getFailureResponseTemplate(name) {
    return template(name);
}
exports.getFailureResponseTemplate = getFailureResponseTemplate;
function template(name) {
    return `import 'package:dio/dio.dart';
import 'package:equatable/equatable.dart';

import '../constants/app_constants.dart';

class FailureResponse extends Equatable {
  final String errorMessage;
  final int statusCode;

  const FailureResponse({
    required this.errorMessage,
    required this.statusCode,
  });

    static FailureResponse dio(DioException error) {
    return FailureResponse(
      errorMessage:
          error.response?.data[AppConstants.errorKey.message]?.toString() ??
              error.response.toString(),
      statusCode: error.response?.statusCode ?? 500,
    );
  }

  @override
  List<Object?> get props => [errorMessage, statusCode];
}
`;
}
//# sourceMappingURL=failure-response.template.js.map