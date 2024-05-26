export function getSplashStateTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
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
