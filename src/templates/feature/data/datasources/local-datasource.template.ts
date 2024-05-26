export function getLocalDataSourceTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
  return `import 'package:shared_preferences/shared_preferences.dart';

import '../../../../../shared_libraries/core/local/models/cached_user_data.dart';
import '../../../../../shared_libraries/utils/constants/app_constants.dart';
import '../../../../../shared_libraries/utils/error/exception.dart';
import '../../../../../shared_libraries/utils/helpers/cache_helper.dart';

abstract class AuthLocalDataSource {
  Future<bool> cachedUserData({required CachedUserData cachedUserData});
  Future<bool> removeUserData();
  Future<CachedUserData> getUserData();
}

class AuthLocalDataSourceImpl implements AuthLocalDataSource {
  final SharedPreferences sharedPreferences;

  AuthLocalDataSourceImpl({required this.sharedPreferences});

  @override
  Future<bool> cachedUserData({required CachedUserData cachedUserData}) async {
    if (cachedUserData.token != null) {
      sharedPreferences.setString(
        AppConstants.cachedKey.tokenKey,
        cachedUserData.token!,
      );
    }
    return true;
  }

  @override
  Future<bool> removeUserData() async {
    return await sharedPreferences.remove(AppConstants.cachedKey.tokenKey);
  }

  @override
  Future<CachedUserData> getUserData() async {
    try {
      return CachedUserData(
        token: CacheHelper.getToken(),
      );
    } catch (_) {
      throw DatabaseException(AppConstants.errorMessage.failedGetUserData);
    }
  }
}

`;
}
