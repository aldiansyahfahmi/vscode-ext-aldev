import * as changeCase from "change-case";

export function getMapperTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
  const pascalCase = changeCase.pascalCase(name.toLowerCase());
  const snakeCase = changeCase.snakeCase(name.toLowerCase());
  return `import '../../domain/entities/response/${snakeCase}_response_entity.dart';
import '../models/response/${snakeCase}_response_dto.dart';

  class ${pascalCase}Mapper {
      ${pascalCase}DataEntity map${pascalCase}DataDtoToEntity(
          ${pascalCase}DataDto data) =>
      ${pascalCase}DataEntity(
       
      );

  List<${pascalCase}DataEntity> mapList${pascalCase}DataDtoToEntity(
      List<${pascalCase}DataDto> data) {
    List<${pascalCase}DataEntity> entity = [];
    for (${pascalCase}DataDto element in data) {
      entity.add(map${pascalCase}DataDtoToEntity(element));
    }
    return entity;
  }
}
`;
}
