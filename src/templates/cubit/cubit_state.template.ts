// import * as changeCase from "change-case";

// export function getCubitStateTemplate(cubitName: string): string {
//   return getEquatableCubitStateTemplate(cubitName);
// }

// function getEquatableCubitStateTemplate(cubitName: string): string {
//   const pascalCaseCubitName = changeCase.pascalCase(cubitName.toLowerCase());
//   const camelCaseCubitName = changeCase.camelCase(cubitName.toLowerCase());
//   return `import 'package:equatable/equatable.dart';

// class ${pascalCaseCubitName}State extends Equatable {
//     final ViewData ${camelCaseCubitName}State;

//   const ${pascalCaseCubitName}State({required this.${camelCaseCubitName}State});

//   @override
//   List<Object?> get props => [${camelCaseCubitName}State];
// }`;
// }
