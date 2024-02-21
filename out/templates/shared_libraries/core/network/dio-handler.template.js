"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDioHandlerTemplate = void 0;
function getDioHandlerTemplate(name) {
    return template(name);
}
exports.getDioHandlerTemplate = getDioHandlerTemplate;
function template(name) {
    return `import 'package:dio/dio.dart';
import 'api_interceptors.dart';
import 'package:shared_preferences/shared_preferences.dart';

class DioHandler {
  final String apiBaseUrl;
  late SharedPreferences sharedPreferences;

  DioHandler({
    required this.apiBaseUrl,
    required this.sharedPreferences,
  });

  Dio get dio => _getDio();

  Dio _getDio() {
    BaseOptions options = BaseOptions(
      baseUrl: apiBaseUrl,
      connectTimeout: const Duration(seconds: 50),
      receiveTimeout: const Duration(seconds: 30),
    );
    final dio = Dio(options);
    dio.interceptors.add(ApiInterceptors(sharedPreferences: sharedPreferences));

    return dio;
  }
}
`;
}
//# sourceMappingURL=dio-handler.template.js.map