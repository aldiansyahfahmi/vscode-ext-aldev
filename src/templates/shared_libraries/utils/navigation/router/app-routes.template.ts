export function getAppRoutesTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
  return `class AppRoutes {
  static const String splash = '/${name.toLocaleLowerCase()}';
}

`;
}
