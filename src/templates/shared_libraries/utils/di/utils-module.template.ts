export function getUtilsModuleTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
  return `import '../../../di/injections.dart';
import '../navigation/navigation_helper.dart';

class RegisterUtilsModule {
  RegisterUtilsModule() {
    _navigations();
    _routers();
  }

  void _navigations() => sl.registerLazySingleton<NavigationHelper>(
        () => NavigationHelperImpl(),
      );

  void _routers() {}
}

`;
}
