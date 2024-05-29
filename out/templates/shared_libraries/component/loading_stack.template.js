"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoadingStackTemplate = void 0;
function getLoadingStackTemplate() {
    return template();
}
exports.getLoadingStackTemplate = getLoadingStackTemplate;
function template() {
    return `import 'package:flutter/material.dart';

import '../../utils/style/colors.dart';

class LoadingStack {
  static void show(BuildContext context) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) {
        return const Center(
            child: CircularProgressIndicator(
          backgroundColor: Colors.transparent,
          valueColor: AlwaysStoppedAnimation<Color>(
            ColorName.white,
          ),
        ));
      },
    );
  }

  static void dismiss(BuildContext context) {
    Navigator.pop(context);
  }
}

`;
}
//# sourceMappingURL=loading_stack.template.js.map