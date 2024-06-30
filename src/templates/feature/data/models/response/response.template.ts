import * as changeCase from "change-case";

export function getResponseTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
  const pascalCase = changeCase.pascalCase(name.toLowerCase());
  return `class ${pascalCase}Response {

    ${pascalCase}Response();

    factory ${pascalCase}Response.fromJson(Map<String, dynamic> json) => ${pascalCase}Response();
  }
`;
}
