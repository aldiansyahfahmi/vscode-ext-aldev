import * as changeCase from "change-case";

export function getRouterTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
  const pascalCase = changeCase.pascalCase(name.toLowerCase());
  return `import '../../navigation/navigation_helper.dart';
import 'app_routes.dart';

abstract class ${pascalCase}Router {
  void navigateToOtherScreen();
}

class ${pascalCase}RouterImpl implements ${pascalCase}Router {
  final NavigationHelper navigationHelper;

  ${pascalCase}RouterImpl({required this.navigationHelper});

  @override
  void navigateToOtherScreen() {
    navigationHelper.pushNamed(AppRoutes.other);
  }
}

`;
}
