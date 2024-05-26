export function getCachedUserDataTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
  return `class CachedUserData {
  String? token;

  CachedUserData({
    this.token,
  });
}

`;
}
