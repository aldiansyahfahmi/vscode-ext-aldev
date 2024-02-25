import * as changeCase from "change-case";

export function getRemoteDataSourceTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
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
