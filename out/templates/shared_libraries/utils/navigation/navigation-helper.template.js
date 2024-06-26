"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNavigationHelperTemplate = void 0;
function getNavigationHelperTemplate(name) {
    return template(name);
}
exports.getNavigationHelperTemplate = getNavigationHelperTemplate;
function template(name) {
    return `import 'package:flutter/material.dart';
import '../../core/network/dio_handler.dart';

abstract class NavigationHelper {
  Future<dynamic>? pushNamed(
    String routeName, {
    dynamic arguments,
  });

  Future<dynamic>? pushNamedAndRemoveUntil(
    String routeName, {
    dynamic arguments,
  });

  Future<dynamic>? pushReplacementNamed(
    String routeName, {
    dynamic arguments,
  });

  void pop<T extends Object?>([T? result]);
}

class NavigationHelperImpl extends NavigationHelper {
  static final navigatorKey = alice.getNavigatorKey()!;

  @override
  Future<dynamic>? pushNamed(
    String routeName, {
    arguments,
  }) =>
      navigatorKey.currentState?.pushNamed(
        routeName,
        arguments: arguments,
      );

  @override
  Future? pushReplacementNamed(String routeName, {arguments}) =>
      navigatorKey.currentState?.pushReplacementNamed(
        routeName,
        arguments: arguments,
      );

  @override
  void pop<T extends Object?>([T? result]) =>
      navigatorKey.currentState!.pop(result);

  @override
  Future? pushNamedAndRemoveUntil(String routeName, {arguments}) =>
      navigatorKey.currentState?.pushNamedAndRemoveUntil(
          routeName, (Route<dynamic> route) => false,
          arguments: arguments);
}

`;
}
//# sourceMappingURL=navigation-helper.template.js.map