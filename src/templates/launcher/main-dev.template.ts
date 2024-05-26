export function getMainDevTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
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
