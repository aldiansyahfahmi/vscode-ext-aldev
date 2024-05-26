"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSplashStateTemplate = void 0;
function getSplashStateTemplate(name) {
    return template(name);
}
exports.getSplashStateTemplate = getSplashStateTemplate;
function template(name) {
    return `import 'package:equatable/equatable.dart';
  import '/shared_libraries/utils/state/view_data_state.dart';
  import '../../../../shared_libraries/core/local/models/cached_user_data.dart';

class SplashState extends Equatable {
  final ViewData<CachedUserData> splashState;

  const SplashState({required this.splashState});

  @override
  List<Object?> get props => [splashState];
}
`;
}
//# sourceMappingURL=splash_state.template.js.map