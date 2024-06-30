"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiSimpleTemplate = exports.getDiTemplate = void 0;
const changeCase = __importStar(require("change-case"));
function getDiTemplate(name) {
    return template(name);
}
exports.getDiTemplate = getDiTemplate;
function template(name) {
    const pascalCase = changeCase.pascalCase(name.toLowerCase());
    const snakeCase = changeCase.snakeCase(name.toLowerCase());
    const camelCase = changeCase.camelCase(name.toLowerCase());
    return `import '../../../di/injections.dart';
import '../data/datasources/remote/${snakeCase}_remote_datasource.dart';
import '../data/mapper/${snakeCase}_mapper.dart';
import '../data/repositories/${snakeCase}_repository_impl.dart';
import '../domain/repositories/${snakeCase}_repository.dart';
import '../domain/usecases/${snakeCase}_usecase.dart';

class ${pascalCase}Dependency {
  ${pascalCase}Dependency() {
    _registerDataSource();
    _registerMapper();
    _registerRepository();
    _registerUseCases();
  }

  void _registerDataSource() {
    sl.registerLazySingleton<${pascalCase}RemoteDataSource>(
      () => ${pascalCase}RemoteDataSourceImpl(
        dio: sl(),
      ),
    );
  }

  void _registerMapper() {
    sl.registerLazySingleton<${pascalCase}Mapper>(() => ${pascalCase}Mapper());
  }

  void _registerRepository() {
    sl.registerLazySingleton<${pascalCase}Repository>(
      () => ${pascalCase}RepositoryImpl(
        ${camelCase}RemoteDataSource: sl(),
        ${camelCase}Mapper: sl(),
      ),
    );
  }

  void _registerUseCases() {
    sl.registerLazySingleton<${pascalCase}UseCase>(
      () => ${pascalCase}UseCase(
        ${camelCase}Repository: sl(),
      ),
    );
  }
}
`;
}
function getDiSimpleTemplate(name) {
    return simpleTemplate(name);
}
exports.getDiSimpleTemplate = getDiSimpleTemplate;
function simpleTemplate(name) {
    const pascalCase = changeCase.pascalCase(name.toLowerCase());
    const snakeCase = changeCase.snakeCase(name.toLowerCase());
    const camelCase = changeCase.camelCase(name.toLowerCase());
    return `import '../../../di/injections.dart';
import '../datasources/remote/${snakeCase}_remote_datasource.dart';
import '../repositories/${snakeCase}_repository.dart';
import '../usecases/${snakeCase}_usecase.dart';

class ${pascalCase}Dependency {
  ${pascalCase}Dependency() {
    _registerDataSource();
    _registerRepository();
    _registerUseCases();
  }

  void _registerDataSource() {
    sl.registerLazySingleton<${pascalCase}RemoteDataSource>(
      () => ${pascalCase}RemoteDataSourceImpl(
        dio: sl(),
      ),
    );
  }

  void _registerRepository() {
    sl.registerLazySingleton<${pascalCase}Repository>(
      () => ${pascalCase}RepositoryImpl(
        ${camelCase}RemoteDataSource: sl(),
      ),
    );
  }

  void _registerUseCases() {
    sl.registerLazySingleton<${pascalCase}UseCase>(
      () => ${pascalCase}UseCase(
        ${camelCase}Repository: sl(),
      ),
    );
  }
}
`;
}
//# sourceMappingURL=di.template.js.map