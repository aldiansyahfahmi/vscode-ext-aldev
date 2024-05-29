export function getSplashScreenTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
  return `import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../di/injections.dart';
import '../../../shared_libraries/component/scaffold/custom_scaffold.dart';
import '../../../shared_libraries/utils/navigation/router/splash_router.dart';
import '../../../shared_libraries/utils/state/view_data_state.dart';
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
