import * as changeCase from "change-case";

export function getScreenTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
  const pascalCase = changeCase.pascalCase(name.toLowerCase());
  return `import 'package:flutter/material.dart';

class ${pascalCase}Screen extends StatelessWidget {
  const ${pascalCase}Screen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: Text('${pascalCase} Screen'),
      ),
    );
  }
}
`;
}
