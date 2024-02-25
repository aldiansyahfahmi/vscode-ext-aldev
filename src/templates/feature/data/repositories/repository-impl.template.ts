import * as changeCase from "change-case";

export function getRepositoryImplTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
  const pascalCase = changeCase.pascalCase(name.toLowerCase());
  const camelCase = changeCase.camelCase(name.toLowerCase());
  const snakeCase = changeCase.snakeCase(name.toLowerCase());
  return `import 'package:dartz/dartz.dart';
import 'package:dio/dio.dart';

import '../../../../shared_libraries/utils/error/failure_response.dart';
import '../../domain/repositories/${snakeCase}_repository.dart';
import '../datasources/remote/${snakeCase}_remote_datasource.dart';
import '../mapper/${snakeCase}_mapper.dart';
import '../../domain/entities/response/${snakeCase}_response_entity.dart';

class ${pascalCase}RepositoryImpl implements ${pascalCase}Repository {
  final ${pascalCase}RemoteDataSource ${camelCase}RemoteDataSource;
  final ${pascalCase}Mapper ${camelCase}Mapper;

  ${pascalCase}RepositoryImpl({
    required this.${camelCase}RemoteDataSource,
    required this.${camelCase}Mapper,
  });

    @override
  Future<Either<FailureResponse, List<${pascalCase}DataEntity>>>
      get${pascalCase}s() async {
    try {
      final response = await ${camelCase}RemoteDataSource.get${pascalCase}s();
      return Right(
          ${camelCase}Mapper.mapList${pascalCase}DataDtoToEntity(response.data!));
    } on DioException catch (error) {
      return Left(FailureResponse.dio(error));
    }
  }
}
`;
}
