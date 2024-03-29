import * as changeCase from "change-case";

export function getResponseEntityTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
  const pascalCase = changeCase.pascalCase(name.toLowerCase());
  return `class ${pascalCase}DataEntity {
    
  }
`;
}
