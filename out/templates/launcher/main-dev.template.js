"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMainDevTemplate = void 0;
function getMainDevTemplate(name) {
    return template(name);
}
exports.getMainDevTemplate = getMainDevTemplate;
function template(name) {
    return `import 'package:flutter/material.dart';
import '../di/injections.dart';
import '../app/main_app.dart';
import '../shared_libraries/utils/setup/app_setup.dart';
// import 'package:flutter_flipperkit/flutter_flipperkit.dart';

void main() async {
  Config.appFlavor = Flavor.dev;
  WidgetsFlutterBinding.ensureInitialized();
  await Injections().initialize();

  // Flipper
  // FlipperClient flipperClient = FlipperClient.getDefault();
  // flipperClient.addPlugin(FlipperNetworkPlugin());
  // flipperClient.addPlugin(FlipperReduxInspectorPlugin());
  // flipperClient.addPlugin(FlipperSharedPreferencesPlugin());
  // flipperClient.start();  

  runApp(const MyApp());
}
`;
}
//# sourceMappingURL=main-dev.template.js.map