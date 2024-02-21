"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInjectionsTemplate = void 0;
function getInjectionsTemplate(name) {
    return template(name);
}
exports.getInjectionsTemplate = getInjectionsTemplate;
function template(name) {
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
//# sourceMappingURL=injections.template.js.map