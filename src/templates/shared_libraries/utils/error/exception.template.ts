export function getExceptionTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
  return `class ServerException implements Exception {}

class DatabaseException implements Exception {
  final String message;

  DatabaseException(this.message);
}
`;
}
