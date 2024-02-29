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
exports.getRemoteDataSourceTemplate = void 0;
const changeCase = __importStar(require("change-case"));
function getRemoteDataSourceTemplate(name) {
    return template(name);
}
exports.getRemoteDataSourceTemplate = getRemoteDataSourceTemplate;
function template(name) {
    const pascalCase = changeCase.pascalCase(name.toLowerCase());
    const snakeCase = changeCase.snakeCase(name.toLowerCase());
    const camelCase = changeCase.camelCase(name.toLowerCase());
    return `import 'package:dio/dio.dart';

import '../../../../../shared_libraries/core/network/models/api_response.dart';
import '../../../../../shared_libraries/utils/constants/app_constants.dart';
import '../../models/response/${snakeCase}_response_dto.dart';

abstract class ${pascalCase}RemoteDataSource {
  Future<ApiResponse<List<${pascalCase}DataDto>>> get${pascalCase}();
}

class ${pascalCase}RemoteDataSourceImpl implements ${pascalCase}RemoteDataSource {
  final Dio dio;

  ${pascalCase}RemoteDataSourceImpl({required this.dio});

  @override
  Future<ApiResponse<List<${pascalCase}DataDto>>> get${pascalCase}() async {
    try {
      final response = await dio.get(AppConstants.appApi.${camelCase});
      return ApiResponse.fromJson(
        response.data,
        onDataDeserialized: (json) => List<${pascalCase}DataDto>.from(
          json.map(
            (x) => ${pascalCase}DataDto.fromJson(x),
          ),
        ),
      );
    } catch (e) {
      rethrow;
    }
  }
}
`;
}
//# sourceMappingURL=remote-datasource.template.js.map