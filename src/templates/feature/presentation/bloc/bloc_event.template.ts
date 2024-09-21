import * as changeCase from "change-case";

export function getBlocEventTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
  const pascalCase = changeCase.pascalCase(name.toLowerCase());
  const camelCase = changeCase.camelCase(name.toLowerCase());
  return `import 'package:equatable/equatable.dart';

abstract class ${pascalCase}Event extends Equatable {
  const ${pascalCase}Event();
}

class ${pascalCase} extends ${pascalCase}Event {
  final ${pascalCase}Request ${camelCase}Request;

  const ${pascalCase}({required this.${camelCase}Request});

  @override
  List<Object?> get props => [${camelCase}Request];
}`;
}
