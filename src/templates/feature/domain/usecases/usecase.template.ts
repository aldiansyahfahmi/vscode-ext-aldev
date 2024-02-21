import * as changeCase from "change-case";

export function getUseCaseTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
  const pascalCase = changeCase.pascalCase(name.toLowerCase());
  const snakeCase = changeCase.snakeCase(name.toLowerCase());
  const camelCase = changeCase.camelCase(name.toLowerCase());
  return `import 'package:dartz/dartz.dart';

import '../../../../shared_libraries/utils/error/failure_response.dart';
import '../../../../shared_libraries/utils/usecase/usecase.dart';
import '../repositories/${snakeCase}_repository.dart';
import '../entities/response/${snakeCase}_response_entity.dart';

class ${pascalCase}UseCase
    extends UseCase<List<${pascalCase}DataEntity>, NoParams> {
  final ${pascalCase}Repository ${camelCase}Repository;

  ${pascalCase}UseCase({required this.${camelCase}Repository});
  @override
  Future<Either<FailureResponse, List<${pascalCase}DataEntity>>> call(
          NoParams params) async =>
      ${camelCase}Repository.get${pascalCase}();
}
`;
}
