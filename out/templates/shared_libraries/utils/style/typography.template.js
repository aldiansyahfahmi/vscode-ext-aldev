"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSharedTypographyTemplate = void 0;
function getSharedTypographyTemplate(name) {
    return template(name);
}
exports.getSharedTypographyTemplate = getSharedTypographyTemplate;
function template(name) {
    return `import 'package:flutter/material.dart';

import '../resources/fonts.gen.dart';

class Typography {
  Typography({
    required this.light,
    required this.regular,
    required this.medium,
    required this.semiBold,
    required this.bold,
    required this.extraBold,
    required this.black,
  });

  final TextStyle light;
  final TextStyle regular;
  final TextStyle medium;
  final TextStyle semiBold;
  final TextStyle bold;
  final TextStyle extraBold;
  final TextStyle black;

  factory Typography.fromBaseStyle(TextStyle baseStyle) {
    return Typography(
      light: baseStyle.copyWith(fontWeight: FontWeight.w300),
      regular: baseStyle.copyWith(fontWeight: FontWeight.w400),
      medium: baseStyle.copyWith(fontWeight: FontWeight.w500),
      semiBold: baseStyle.copyWith(fontWeight: FontWeight.w600),
      bold: baseStyle.copyWith(fontWeight: FontWeight.w700),
      extraBold: baseStyle.copyWith(fontWeight: FontWeight.w800),
      black: baseStyle.copyWith(fontWeight: FontWeight.w900),
    );
  }
}

class TypographyStyle {
  static const String _fontName = FontFamily.nunito;

  static TextStyle _createStyle(double size, double lineHeight) {
    return TextStyle(
      fontFamily: _fontName,
      fontSize: size,
      height: lineHeight / size,
    );
  }

  static TextStyle heading1 = _createStyle(32, 40);
  static TextStyle heading2 = _createStyle(24, 32);
  static TextStyle heading3 = _createStyle(20, 28);
  static TextStyle label1 = _createStyle(16, 24);
  static TextStyle label2 = _createStyle(14, 20);
  static TextStyle label3 = _createStyle(12, 16);
  static TextStyle body1 = _createStyle(16, 24);
  static TextStyle body2 = _createStyle(14, 20);
  static TextStyle body3 = _createStyle(12, 16);
  static TextStyle body4 = _createStyle(10, 14);
}

class MyTypography {
  static final heading1 = Typography.fromBaseStyle(TypographyStyle.heading1);
  static final heading2 = Typography.fromBaseStyle(TypographyStyle.heading2);
  static final heading3 = Typography.fromBaseStyle(TypographyStyle.heading3);
  static final label1 = Typography.fromBaseStyle(TypographyStyle.label1);
  static final label2 = Typography.fromBaseStyle(TypographyStyle.label2);
  static final label3 = Typography.fromBaseStyle(TypographyStyle.label3);
  static final body1 = Typography.fromBaseStyle(TypographyStyle.body1);
  static final body2 = Typography.fromBaseStyle(TypographyStyle.body2);
  static final body3 = Typography.fromBaseStyle(TypographyStyle.body3);
  static final body4 = Typography.fromBaseStyle(TypographyStyle.body4);
}

`;
}
//# sourceMappingURL=typography.template.js.map