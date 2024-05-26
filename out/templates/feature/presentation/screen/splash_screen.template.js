"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSplashScreenTemplate = void 0;
function getSplashScreenTemplate(name) {
    return template(name);
}
exports.getSplashScreenTemplate = getSplashScreenTemplate;
function template(name) {
    return `import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../di/injections.dart';
import '../../../shared_libraries/component/scaffold/custom_scaffold.dart';
import '../../../shared_libraries/utils/navigation/router/splash_router.dart';
import '../bloc/splash_cubit/splash_cubit.dart';
import '../bloc/splash_cubit/splash_state.dart';

class SplashScreen extends StatelessWidget {
  SplashScreen({super.key});

  final SplashRouter _splashRouter = sl();

  @override
  Widget build(BuildContext context) {
    return CustomScaffold(
      body: BlocListener<SplashCubit, SplashState>(
        listener: (context, state) {
          return state.splashState.listener(
            context: context,
            isNoData: () {
              _splashRouter.navigateToSignInScreen();
            },
            isHasData: (data) {
              _splashRouter.navigateToMainScreen();
            },
          );
        },
        child: const Center(
          child: Icon(
            Icons.android,
            size: 150,
          ),
        ),
      ),
    );
  }
}

`;
}
//# sourceMappingURL=splash_screen.template.js.map