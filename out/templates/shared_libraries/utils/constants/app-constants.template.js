"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppConstantsTemplate = void 0;
function getAppConstantsTemplate(name) {
    return template(name);
}
exports.getAppConstantsTemplate = getAppConstantsTemplate;
function template(name) {
    return `class AppConstants {
  const AppConstants();

  static App app = const App();
  static CachedKey cachedKey = const CachedKey();
  static AppApi appApi = const AppApi();
  static ErrorKey errorKey = const ErrorKey();
  static ErrorMessage errorMessage = const ErrorMessage();
}

class App {
  const App();

  double get defaultMargin => 16.0;
}

class CachedKey {
  const CachedKey();

  String get tokenKey => 'tokenKey';
}

class AppApi {
  const AppApi();
  String get baseUrlDevelopment => 'https://';
  String get baseUrlProduction => 'https://';

  String get login => 'login';
}

class ErrorKey {
  const ErrorKey();

  String get message => "message";
}

class ErrorMessage {
  const ErrorMessage();

  String get failedGetToken => 'failed get token';
}
`;
}
//# sourceMappingURL=app-constants.template.js.map