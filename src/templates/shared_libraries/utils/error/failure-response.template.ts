export function getFailureResponseTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
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
    String message() {
      if (error.type == DioExceptionType.connectionError) {
        return 'Connection Error, Try Again';
      } else if (error.type == DioExceptionType.connectionTimeout) {
        return 'Connection Timeout, Try Again';
      } else if (error.type == DioExceptionType.receiveTimeout) {
        return 'Receive Timeout, Try Again';
      } else if (error.type == DioExceptionType.sendTimeout) {
        return 'Send Timeout, Try Again';
      } else {
        return 'Something went wrong, Try Again';
      }
    }

    return FailureResponse(
      errorMessage:
          error.response?.data[AppConstants.errorKey.message]?.toString() ??
              message(),
      statusCode: error.response?.statusCode ?? 500,
    );
  }

  @override
  List<Object?> get props => [errorMessage, statusCode];
}
`;
}
