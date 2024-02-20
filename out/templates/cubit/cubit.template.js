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
function getCubitTemplate(cubitName) {
    return getEquatableCubitTemplate(cubitName);
}
exports.getCubitTemplate = getCubitTemplate;
function getEquatableCubitTemplate(cubitName) {
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
//# sourceMappingURL=cubit.template.js.map