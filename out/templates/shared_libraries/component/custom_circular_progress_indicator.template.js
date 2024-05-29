"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomCircularProgressIndicatorTemplate = void 0;
function getCustomCircularProgressIndicatorTemplate() {
    return template();
}
exports.getCustomCircularProgressIndicatorTemplate = getCustomCircularProgressIndicatorTemplate;
function template() {
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
//# sourceMappingURL=custom_circular_progress_indicator.template.js.map