"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSplashCubitTemplate = void 0;
function getSplashCubitTemplate(name) {
    return template(name);
}
exports.getSplashCubitTemplate = getSplashCubitTemplate;
function template(name) {
    return `import 'package:flutter_bloc/flutter_bloc.dart';
import '/shared_libraries/utils/state/view_data_state.dart';
import 'splash_state.dart';
import '../../../../shared_libraries/utils/helper/cached_helper.dart';

class SplashCubit extends Cubit<SplashState> {
  SplashCubit() : super(SplashState(splashState: ViewData.initial()));

  void initSplash() async {
    await Future.delayed(const Duration(seconds: 3));
    final token = CacheHelper.getToken();
    if (token.isEmpty) {
      emit(
        SplashState(
          splashState: ViewData.noData(message: ''),
        ),
      );
    } else {
      emit(
        SplashState(
          splashState: ViewData.loaded(),
        ),
      );
    }
  }
}

`;
}
//# sourceMappingURL=splash_cubit.template.js.map