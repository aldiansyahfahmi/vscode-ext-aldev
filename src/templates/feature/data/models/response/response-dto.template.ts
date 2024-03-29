import * as changeCase from "change-case";

export function getResponseDtoTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
  const pascalCase = changeCase.pascalCase(name.toLowerCase());
  return `class ${pascalCase}DataDto {

    ${pascalCase}DataDto();

    factory ${pascalCase}DataDto.fromJson(Map<String, dynamic> json) => ${pascalCase}DataDto();
  }
`;
}
