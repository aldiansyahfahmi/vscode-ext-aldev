import * as changeCase from "change-case";

export function getBlocStateTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
  const pascalCase = changeCase.pascalCase(name.toLowerCase());
  const camelCase = changeCase.camelCase(name.toLowerCase());
  return `import 'package:equatable/equatable.dart';
  import '/shared_libraries/utils/state/view_data_state.dart';

class ${pascalCase}State extends Equatable {
    final ViewData ${camelCase}State;

  const ${pascalCase}State({required this.${camelCase}State});

  @override
  List<Object?> get props => [${camelCase}State];
}`;
}
