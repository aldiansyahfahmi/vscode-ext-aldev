import * as changeCase from "change-case";

export function getDiTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
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
