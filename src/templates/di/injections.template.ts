export function getInjectionsTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
  return `import 'package:get_it/get_it.dart';

import '../shared_libraries/core/di/core_modules.dart';
import '../shared_libraries/utils/di/utils_modules.dart';

final sl = GetIt.instance;

class Injections {
  Future<void> initialize() async {
    await _registerSharedLibraries();
    _registerDomains();
  }

  Future<void> _registerSharedLibraries() async {
    await RegisterCoreModule().core();
    RegisterUtilsModule();
  }

  void _registerDomains() {}
}
`;
}
