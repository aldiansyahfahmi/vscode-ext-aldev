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

export function getCubitWithPaginationTemplate(name: string): string {
  return templateWithPagination(name);
}

function templateWithPagination(name: string): string {
  const pascalCase = changeCase.pascalCase(name.toLowerCase());
  const snakeCase = changeCase.snakeCase(name.toLowerCase());
  const camelCase = changeCase.camelCase(name.toLowerCase());
  return `import 'package:flutter_bloc/flutter_bloc.dart';
import '/shared_libraries/utils/state/view_data_state.dart';
import '/shared_libraries/utils/usecase/usecase.dart';
import '${snakeCase}_state.dart';
import 'package:infinite_scroll_pagination/infinite_scroll_pagination.dart';

class ${pascalCase}Cubit extends Cubit<${pascalCase}State> {
  final Get${pascalCase}UseCase get${pascalCase}UseCase;

  ${pascalCase}Cubit({required this.get${pascalCase}UseCase})
      : super(${pascalCase}State(${camelCase}State: ViewData.initial()));

  final PagingController<int, YourModel> pagingController =
      PagingController(firstPageKey: 1);    

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
      (result) {
        final isLastPage = result.meta!.currentPage! == result.meta!.lastPage!;
        if (isLastPage) {
          pagingController.appendLastPage(result.data!);
        } else {
          pagingController.appendPage(result.data!, param.page + 1);
        }
        if (result.data!.isEmpty) {
          emit(
            ${pascalCase}State(
              ${camelCase}State: ViewData.noData(
                message: 'Belum ada data',
              ),
            ),
          );
        } else {
          emit(
            ${pascalCase}State(
              ${camelCase}State: ViewData.loaded(
                data: result.data,
              ),
            ),
          );
        }
      }
    );
  }
}
`;
}
