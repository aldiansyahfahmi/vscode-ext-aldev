"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomButtonTemplate = void 0;
function getCustomButtonTemplate() {
    return template();
}
exports.getCustomButtonTemplate = getCustomButtonTemplate;
function template() {
    return `import 'package:flutter/material.dart';

import '../../utils/style/colors.dart';
import '../../utils/style/typography.dart';

enum CustomButtonStyle { filled, outlined }

class CustomButton extends StatelessWidget {
  final Color color;
  final String label;
  final Color labelColor;
  final Widget? icon;
  final CustomButtonStyle style;
  final GestureTapCallback onTap;

  const CustomButton.filled({
    super.key,
    required this.label,
    required this.onTap,
    this.style = CustomButtonStyle.filled,
    this.color = ColorName.main,
    this.labelColor = ColorName.white,
    this.icon,
  });

  const CustomButton.outlined({
    super.key,
    required this.label,
    required this.onTap,
    this.style = CustomButtonStyle.outlined,
    this.color = Colors.transparent,
    this.labelColor = ColorName.main,
    this.icon,
  });

  @override
  Widget build(BuildContext context) {
    if (style == CustomButtonStyle.filled) {
      return ElevatedButton(
        onPressed: onTap,
        style: ElevatedButton.styleFrom(
          padding: const EdgeInsets.symmetric(vertical: 13.0, horizontal: 24),
          backgroundColor: color,
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (icon != null) icon!,
            if (icon != null)
              const SizedBox(
                width: 12.0,
              ),
            Text(
              label,
              style: MyTypography.label2.regular.copyWith(
                color: labelColor,
              ),
            ),
          ],
        ),
      );
    } else {
      return OutlinedButton(
        onPressed: onTap,
        style: OutlinedButton.styleFrom(
          padding: const EdgeInsets.symmetric(vertical: 13.0, horizontal: 24),
          backgroundColor: color,
          elevation: 0,
          side: BorderSide(color: labelColor),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (icon != null) icon!,
            if (icon != null)
              const SizedBox(
                width: 12.0,
              ),
            Text(
              label,
              style: MyTypography.label2.regular.copyWith(
                color: labelColor,
              ),
            ),
          ],
        ),
      );
    }
  }
}

`;
}
//# sourceMappingURL=custom_button.template.js.map