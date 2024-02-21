import * as changeCase from "change-case";

export function getRepositoryTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
  const pascalCase = changeCase.pascalCase(name.toLowerCase());
  const snakeCase = changeCase.snakeCase(name.toLowerCase());
  return `import 'package:dartz/dartz.dart';

import '../../../../shared_libraries/utils/error/failure_response.dart';
import '../entities/response/${snakeCase}_response_entity.dart';

abstract class ${pascalCase}Repository {
  Future<Either<FailureResponse, List<${pascalCase}DataEntity>>> get${pascalCase}s();
}
`;
}
