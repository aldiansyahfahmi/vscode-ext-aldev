import * as changeCase from "change-case";

export function getBlocTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
  const pascalCase = changeCase.pascalCase(name.toLowerCase());
  const camelCase = changeCase.camelCase(name.toLowerCase());
  const snakeCase = changeCase.snakeCase(name.toLowerCase());
  return `import 'package:flutter_bloc/flutter_bloc.dart';
import '/shared_libraries/utils/state/view_data_state.dart';
import '${snakeCase}_state.dart';
import '${snakeCase}_event.dart';

class ${pascalCase}Bloc extends Bloc<${pascalCase}Event, ${pascalCase}State> {
  final ${pascalCase}UseCase ${camelCase}UseCase;

  ${pascalCase}Bloc({required this.${camelCase}UseCase}) : super(
          ${pascalCase}State(
            ${camelCase}State: ViewData.initial(),
          ),
        ) {
    on<${pascalCase}>((event, emit) async {
      emit(
        ${pascalCase}State(
          ${camelCase}State: ViewData.loading(),
        ),
      );
      final result = await ${camelCase}UseCase.call(event.${camelCase}RequestEntity);
      result.fold(
        (failure) async => emit(
          ${pascalCase}State(
            ${camelCase}State: ViewData.error(
              message: failure.errorMessage,
              failure: failure,
            ),
          ),
        ),
        (result) async {
          emit(
            ${pascalCase}State(
              ${camelCase}State: ViewData.loaded(data: result),
            ),
          );
        },
      );
    },);
  }
}`;
}
