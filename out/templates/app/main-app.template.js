"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMainAppTemplate = void 0;
function getMainAppTemplate(name) {
    return template(name);
}
exports.getMainAppTemplate = getMainAppTemplate;
function template(name) {
    return `import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../presentation/main/ui/main_screen.dart';
import '../presentation/splash/bloc/splash_cubit/splash_cubit.dart';
import '../presentation/splash/ui/splash_screen.dart';
import '../shared_libraries/utils/navigation/navigation_helper.dart';
import '../shared_libraries/utils/navigation/router/app_routes.dart';
import '../shared_libraries/utils/setup/app_setup.dart';
import '../shared_libraries/utils/style/colors.dart';
import '../shared_libraries/utils/resources/fonts.gen.dart';
import '../shared_libraries/utils/bloc/network_cubit/network_cubit.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(
          create: (context) => NetworkCubit()..checkConnection(),
        ),
      ],
      child: MaterialApp(
        title: Config.appName,
        debugShowCheckedModeBanner: Config.isDebug,
        theme: ThemeData(
          scaffoldBackgroundColor: ColorName.white,
          fontFamily: FontFamily.nunito,
        ),
        home: BlocProvider(
          create: (context) => SplashCubit()..initSplash(),
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
      ),
    );
  }
}

`;
}
//# sourceMappingURL=main-app.template.js.map