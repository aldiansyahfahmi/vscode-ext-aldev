"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUtilsModuleTemplate = void 0;
function getUtilsModuleTemplate(name) {
    return template(name);
}
exports.getUtilsModuleTemplate = getUtilsModuleTemplate;
function template(name) {
    return `import '../../../di/injections.dart';
import '../navigation/navigation_helper.dart';
import '../navigation/router/splash_router.dart';

class RegisterUtilsModule {
  RegisterUtilsModule() {
    _navigations();
    _routers();
  }

  void _navigations() => sl.registerLazySingleton<NavigationHelper>(
        () => NavigationHelperImpl(),
      );

  void _routers() {
    sl.registerLazySingleton<SplashRouter>(
      () => SplashRouterImpl(
        navigationHelper: sl(),
      ),
    );    
  }
}

`;
}
//# sourceMappingURL=utils-module.template.js.map