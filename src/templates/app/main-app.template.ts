export function getMainAppTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
  return `import 'package:flutter/material.dart';

import '../di/injections.dart';
import '../presentation/main/ui/main_screen.dart';
import '../presentation/splash/bloc/splash_cubit/splash_cubit.dart';
import '../presentation/splash/ui/splash_screen.dart';
import '../shared_libraries/utils/navigation/navigation_helper.dart';
import '../shared_libraries/utils/navigation/router/app_routes.dart';
import '../shared_libraries/utils/setup/app_setup.dart';
import '../shared_libraries/utils/style/colors.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: Config.appName,
      debugShowCheckedModeBanner: Config.isDebug,
      theme: ThemeData(
        scaffoldBackgroundColor: ColorName.white,
        fontFamily: FontFamily.nunito,
      ),
      home: BlocProvider(
        create: (context) => SplashCubit(
          getUserDataUseCase: sl(),
        )..initSplash(),
        child: SplashScreen(),
      ),
      navigatorKey: NavigationHelperImpl.navigatorKey,
      onGenerateRoute: (settings) {
        switch (settings.name) {
          case AppRoutes.main:
            return MaterialPageRoute(
              builder: (context) => const MainScreen(),
            );
          default:
            return MaterialPageRoute(
              builder: (context) => const Scaffold(
                body: Center(
                  child: Text('Route Tidak Ditemukan'),
                ),
              ),
            );
        }
      },
    );
  }
}

`;
}
