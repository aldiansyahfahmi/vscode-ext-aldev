export function getSplashRouterTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
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
