export function getCoreModuleTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
  return `import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../../di/injections.dart';
import '../../utils/setup/app_setup.dart';
import '../network/dio_handler.dart';

class RegisterCoreModule {
  Future<void> core() async {
    final sharedPreferences = await SharedPreferences.getInstance();
    sl.registerLazySingleton<SharedPreferences>(() => sharedPreferences);
    sl.registerLazySingleton<Dio>(() => sl<DioHandler>().dio);
    sl.registerLazySingleton<DioHandler>(() => DioHandler(
          sharedPreferences: sl(),
          apiBaseUrl: Config.baseUrl,
        ));
  }
}
`;
}
