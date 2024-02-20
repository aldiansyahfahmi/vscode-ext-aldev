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
exports.getCubitStateTemplate = void 0;
const changeCase = __importStar(require("change-case"));
function getCubitStateTemplate(cubitName) {
    return getEquatableCubitStateTemplate(cubitName);
}
exports.getCubitStateTemplate = getCubitStateTemplate;
function getEquatableCubitStateTemplate(cubitName) {
    const pascalCaseCubitName = changeCase.pascalCase(cubitName.toLowerCase());
    const camelCaseCubitName = changeCase.camelCase(cubitName.toLowerCase());
    return `import 'package:equatable/equatable.dart';
  import '/shared_libraries/utils/state/view_data_state.dart';

class ${pascalCaseCubitName}State extends Equatable {
    final ViewData ${camelCaseCubitName}State;

  const ${pascalCaseCubitName}State({required this.${camelCaseCubitName}State});

  @override
  List<Object?> get props => [${camelCaseCubitName}State];
}`;
}
//# sourceMappingURL=cubit_state.template.js.map