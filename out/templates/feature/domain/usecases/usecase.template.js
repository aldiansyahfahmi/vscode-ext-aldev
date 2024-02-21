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
exports.getUseCaseTemplate = void 0;
const changeCase = __importStar(require("change-case"));
function getUseCaseTemplate(name) {
    return template(name);
}
exports.getUseCaseTemplate = getUseCaseTemplate;
function template(name) {
    const pascalCase = changeCase.pascalCase(name.toLowerCase());
    const snakeCase = changeCase.snakeCase(name.toLowerCase());
    const camelCase = changeCase.camelCase(name.toLowerCase());
    return `import 'package:dartz/dartz.dart';

import '../../../../shared_libraries/utils/error/failure_response.dart';
import '../../../../shared_libraries/utils/usecase/usecase.dart';
import '../repositories/${snakeCase}_repository.dart';
import '../entities/response/${snakeCase}_response_entity.dart';

class Get${pascalCase}sUseCase
    extends UseCase<List<${pascalCase}DataEntity>, NoParams> {
  final ${pascalCase}Repository ${camelCase}Repository;

  Get${pascalCase}sUseCase({required this.${camelCase}Repository});
  @override
  Future<Either<FailureResponse, List<${pascalCase}DataEntity>>> call(
          NoParams params) async =>
      ${camelCase}Repository.get${pascalCase}s();
}
`;
}
//# sourceMappingURL=usecase.template.js.map