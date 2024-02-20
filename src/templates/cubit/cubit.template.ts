import * as changeCase from "change-case";

export function getCubitTemplate(cubitName: string): string {
  return getEquatableCubitTemplate(cubitName);
}

function getEquatableCubitTemplate(cubitName: string): string {
  const pascalCaseCubitName = changeCase.pascalCase(cubitName.toLowerCase());
  const snakeCaseCubitName = changeCase.snakeCase(cubitName.toLowerCase());
  const camelCaseCubitName = changeCase.camelCase(cubitName.toLowerCase());
  return `import 'package:flutter_bloc/flutter_bloc.dart';
import '/shared_libraries/utils/state/view_data_state.dart';
import '/shared_libraries/utils/usecase/usecase.dart';
import '${snakeCaseCubitName}_state.dart';

class ${pascalCaseCubitName}Cubit extends Cubit<${pascalCaseCubitName}State> {
  final Get${pascalCaseCubitName}UseCase get${pascalCaseCubitName}UseCase;

  ${pascalCaseCubitName}Cubit({required this.get${pascalCaseCubitName}UseCase})
      : super(${pascalCaseCubitName}State(${camelCaseCubitName}State: ViewData.initial()));

  void get${pascalCaseCubitName}() async {
    emit(${pascalCaseCubitName}State(${camelCaseCubitName}State: ViewData.loading()));
    final result = await get${pascalCaseCubitName}UseCase.call(const NoParams());
    result.fold(
      (failure) => emit(
        ${pascalCaseCubitName}State(
          ${camelCaseCubitName}State: ViewData.error(
            message: failure.errorMessage,
            failure: failure,
          ),
        ),
      ),
      (result) => emit(
        ${pascalCaseCubitName}State(
          ${camelCaseCubitName}State: ViewData.loaded(
            data: result,
          ),
        ),
      ),
    );
  }
}
`;
}
