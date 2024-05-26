export function getCachedHelperTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
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
