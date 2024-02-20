import * as changeCase from "change-case";

export function getCubitTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
  const pascalCase = changeCase.pascalCase(name.toLowerCase());
  const snakeCase = changeCase.snakeCase(name.toLowerCase());
  const camelCase = changeCase.camelCase(name.toLowerCase());
  return `import 'package:flutter_bloc/flutter_bloc.dart';
import '/shared_libraries/utils/state/view_data_state.dart';
import '/shared_libraries/utils/usecase/usecase.dart';
import '${snakeCase}_state.dart';

class ${pascalCase}Cubit extends Cubit<${pascalCase}State> {
  final Get${pascalCase}UseCase get${pascalCase}UseCase;

  ${pascalCase}Cubit({required this.get${pascalCase}UseCase})
      : super(${pascalCase}State(${camelCase}State: ViewData.initial()));

  void get${pascalCase}() async {
    emit(${pascalCase}State(${camelCase}State: ViewData.loading()));
    final result = await get${pascalCase}UseCase.call(const NoParams());
    result.fold(
      (failure) => emit(
        ${pascalCase}State(
          ${camelCase}State: ViewData.error(
            message: failure.errorMessage,
            failure: failure,
          ),
        ),
      ),
      (result) => emit(
        ${pascalCase}State(
          ${camelCase}State: ViewData.loaded(
            data: result,
          ),
        ),
      ),
    );
  }
}
`;
}
