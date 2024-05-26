"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSplashRouterTemplate = void 0;
function getSplashRouterTemplate(name) {
    return template(name);
}
exports.getSplashRouterTemplate = getSplashRouterTemplate;
function template(name) {
    return `import '../../navigation/navigation_helper.dart';
import 'app_routes.dart';

abstract class SplashRouter {
  void navigateToSignInScreen();
  void navigateToMainScreen();
}

class SplashRouterImpl implements SplashRouter {
  final NavigationHelper navigationHelper;

  SplashRouterImpl({required this.navigationHelper});

  @override
  void navigateToMainScreen() {
    navigationHelper.pushReplacementNamed(AppRoutes.main);
  }

  @override
  void navigateToSignInScreen() {
    navigationHelper.pushReplacementNamed(AppRoutes.signIn);
  }
}

`;
}
//# sourceMappingURL=splash-router.template.js.map