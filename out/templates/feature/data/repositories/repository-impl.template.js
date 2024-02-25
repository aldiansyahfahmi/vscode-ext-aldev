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
exports.getRepositoryImplTemplate = void 0;
const changeCase = __importStar(require("change-case"));
function getRepositoryImplTemplate(name) {
    return template(name);
}
exports.getRepositoryImplTemplate = getRepositoryImplTemplate;
function template(name) {
    const pascalCase = changeCase.pascalCase(name.toLowerCase());
    const camelCase = changeCase.camelCase(name.toLowerCase());
    const snakeCase = changeCase.snakeCase(name.toLowerCase());
    return `import 'package:dartz/dartz.dart';
import 'package:dio/dio.dart';

import '../../../../shared_libraries/utils/error/failure_response.dart';
import '../../domain/repositories/${snakeCase}_repository.dart';
import '../datasources/remote/${snakeCase}_remote_datasource.dart';
import '../mapper/${snakeCase}_mapper.dart';
import '../../domain/entities/response/${snakeCase}_response_entity.dart';

class ${pascalCase}RepositoryImpl implements ${pascalCase}Repository {
  final ${pascalCase}RemoteDataSource ${camelCase}RemoteDataSource;
  final ${pascalCase}Mapper ${camelCase}Mapper;

  ${pascalCase}RepositoryImpl({
    required this.${camelCase}RemoteDataSource,
    required this.${camelCase}Mapper,
  });

    @override
  Future<Either<FailureResponse, List<${pascalCase}DataEntity>>>
      get${pascalCase}() async {
    try {
      final response = await ${camelCase}RemoteDataSource.get${pascalCase}();
      return Right(
          ${camelCase}Mapper.mapList${pascalCase}DataDtoToEntity(response.data!));
    } on DioException catch (error) {
      return Left(FailureResponse.dio(error));
    }
  }
}
`;
}
//# sourceMappingURL=repository-impl.template.js.map