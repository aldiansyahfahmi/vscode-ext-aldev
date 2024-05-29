export function getCustomCircularProgressIndicatorTemplate(): string {
  return template();
}

function template(): string {
  return `import 'package:flutter/material.dart';

import '../../utils/style/colors.dart';

class CustomCircularProgressIndicator extends StatelessWidget {
  const CustomCircularProgressIndicator({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: CircularProgressIndicator(
        valueColor: AlwaysStoppedAnimation<Color>(
          ColorName.main,
        ),
      ),
    );
  }
}
`;
}
