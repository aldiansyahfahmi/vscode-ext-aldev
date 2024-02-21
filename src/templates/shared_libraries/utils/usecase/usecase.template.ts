export function getSharedUseCaseTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
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
