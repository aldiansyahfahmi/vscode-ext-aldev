"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSharedUseCaseTemplate = void 0;
function getSharedUseCaseTemplate(name) {
    return template(name);
}
exports.getSharedUseCaseTemplate = getSharedUseCaseTemplate;
function template(name) {
    return `import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';

import '../error/failure_response.dart';

abstract class UseCase<T, Params> {
  const UseCase();

  Future<Either<FailureResponse, T>> call(Params params);
}

class NoParams extends Equatable {
  const NoParams();

  @override
  List<Object?> get props => [];
}
`;
}
//# sourceMappingURL=usecase.template.js.map