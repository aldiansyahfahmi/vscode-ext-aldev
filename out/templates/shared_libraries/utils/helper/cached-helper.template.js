"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCachedHelperTemplate = void 0;
function getCachedHelperTemplate(name) {
    return template(name);
}
exports.getCachedHelperTemplate = getCachedHelperTemplate;
function template(name) {
    return `import 'package:shared_preferences/shared_preferences.dart';

import '../../../di/injections.dart';
import '../constants/app_constants.dart';

final SharedPreferences sharedPreferences = sl();

class CacheHelper {
  static String getToken() =>
      sharedPreferences.getString(AppConstants.cachedKey.tokenKey) ?? '';
}

`;
}
//# sourceMappingURL=cached-helper.template.js.map