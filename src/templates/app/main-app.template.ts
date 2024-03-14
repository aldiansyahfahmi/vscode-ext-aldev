export function getMainAppTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
  return `import 'package:flutter/material.dart';
import 'package:muslim_app/presentation/splash/screen/splash_screen.dart';
import 'package:muslim_app/shared_libraries/utils/navigation/navigation_helper.dart';
import 'package:muslim_app/shared_libraries/utils/navigation/router/app_routes.dart';
import 'package:muslim_app/shared_libraries/utils/resources/colors.gen.dart';
import 'package:muslim_app/shared_libraries/utils/resources/fonts.gen.dart';
import 'package:muslim_app/shared_libraries/utils/setup/app_setup.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: Config.appName,
      debugShowCheckedModeBanner: Config.isDebug,
      theme: ThemeData(
        scaffoldBackgroundColor: ColorName.white,
        fontFamily: FontFamily.poppins,
      ),
      home: const SplashScreen(),
      navigatorKey: NavigationHelperImpl.navigatorKey,
      onGenerateRoute: (settings) {
        switch (settings.name) {
          case AppRoutes.splash:
            return MaterialPageRoute(
              builder: (context) => const SplashScreen(),
            );
          default:
        }
        return null;
      },
    );
  }
}

`;
}