"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMainProdTemplate = void 0;
function getMainProdTemplate(name) {
    return template(name);
}
exports.getMainProdTemplate = getMainProdTemplate;
function template(name) {
    return `import 'package:flutter/material.dart';
import '../di/injections.dart';
import '../app/main_app.dart';
import '../shared_libraries/utils/setup/app_setup.dart';

void main() async {
  Config.appFlavor = Flavor.prod;
  WidgetsFlutterBinding.ensureInitialized();
  await Injections().initialize();
  runApp(const MyApp());
}
`;
}
//# sourceMappingURL=main-prod.template.js.map