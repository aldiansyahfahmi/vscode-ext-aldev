export function getAppSetupTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
  return `import '../constants/app_constants.dart';

enum Flavor {
  dev,
  prod,
}

class Config {
  static Config? _instance;

  Config._internal() {
    _instance = this;
  }

  factory Config() => _instance ?? Config._internal();

  static Flavor? appFlavor;

  static bool get isDebug {
    if (appFlavor == Flavor.dev) {
      return true;
    } else {
      return false;
    }
  }

  static String get baseUrl {
    if (appFlavor == Flavor.prod) {
      return AppConstants.appApi.baseUrlProduction;
    } else {
      return AppConstants.appApi.baseUrlDevelopment;
    }
  }

  static String get appName {
    if (appFlavor == Flavor.prod) {
      return AppConstants.app.prodName;
    } else {
      return AppConstants.app.devName;
    }
  }  
}
`;
}
