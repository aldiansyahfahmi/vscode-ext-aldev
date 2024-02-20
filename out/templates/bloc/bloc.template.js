"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlocTemplate = void 0;
const changeCase = __importStar(require("change-case"));
function getBlocTemplate(name) {
    return template(name);
}
exports.getBlocTemplate = getBlocTemplate;
function template(name) {
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
//# sourceMappingURL=bloc.template.js.map