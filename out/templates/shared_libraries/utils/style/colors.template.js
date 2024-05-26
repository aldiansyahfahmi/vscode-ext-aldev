"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColorsTemplate = void 0;
function getColorsTemplate(name) {
    return template(name);
}
exports.getColorsTemplate = getColorsTemplate;
function template(name) {
    return `import 'package:flutter/material.dart';

class ColorName {
  static const Color main = Color(0xff43B27F);

  static const Color mainLight = Color(0xffE8F6F0);

  static const Color black = Color(0xFF000000);

  static const Color blue = Color(0xff0095CF);

  static const Color blueLight = Color(0xffE0F2F9);

  static const Color grey = Color(0xFF828282);

  static const Color grey2 = Color(0xFFE5E5E5);

  static const Color red = Color(0xFFEB5757);

  static const Color white = Color(0xFFFFFFFF);
}

`;
}
//# sourceMappingURL=colors.template.js.map