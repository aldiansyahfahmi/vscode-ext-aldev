"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDioHandlerTemplate = void 0;
function getDioHandlerTemplate(name) {
    return template(name);
}
exports.getDioHandlerTemplate = getDioHandlerTemplate;
function template(name) {
    return `import 'package:alice/alice.dart';
import 'package:dio/dio.dart';
import 'api_interceptors.dart';
import 'package:shared_preferences/shared_preferences.dart';

Alice alice = Alice(
  showNotification: Config.isDebug,
  showInspectorOnShake: Config.isDebug,
);

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
      connectTimeout: const Duration(seconds: 25),
      receiveTimeout: const Duration(seconds: 25),
      sendTimeout: const Duration(seconds: 25),
    );
    final dio = Dio(options);
    dio.interceptors
      ..add(ApiInterceptors(sharedPreferences: sharedPreferences))
      ..add(alice.getDioInterceptor());

    return dio;
  }
}
`;
}
//# sourceMappingURL=dio-handler.template.js.map