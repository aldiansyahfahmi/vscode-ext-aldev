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
exports.getCubitTemplate = void 0;
const changeCase = __importStar(require("change-case"));
function getCubitTemplate(name) {
    return template(name);
}
exports.getCubitTemplate = getCubitTemplate;
function template(name) {
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
//# sourceMappingURL=cubit.template.js.map