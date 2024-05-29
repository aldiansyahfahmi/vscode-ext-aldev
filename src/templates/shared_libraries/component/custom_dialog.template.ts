export function getCustomDialogTemplate(): string {
  return template();
}

function template(): string {
  return `import 'package:flutter/material.dart';

import '../../utils/resources/assets.gen.dart';
import '../../utils/style/colors.dart';
import '../button/custom_button.dart';

enum DialogType { success, failed, confirmation }

class CustomDialog {
  static void show({
    required BuildContext context,
    required DialogType type,
    required String title,
    required String subTitle,
    required String buttonText,
    required GestureTapCallback onTap,
    bool cancelButton = true,
    Function? onDismissible,
  }) {
    showGeneralDialog(
      barrierColor: Colors.black.withOpacity(0.5),
      transitionBuilder: (context, a1, a2, widget) {
        return Transform.scale(
          scale: a1.value,
          child: Opacity(
            opacity: a1.value,
            child: AlertDialog(
              backgroundColor: ColorName.white,
              elevation: 0,
              contentPadding: const EdgeInsets.all(24.0),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),
              content: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                mainAxisSize: MainAxisSize.min,
                children: [
                  type != DialogType.confirmation
                      ? type == DialogType.success
                          ? Assets.images.icons.dialog.success
                              .svg(width: 95, height: 95)
                          : Assets.images.icons.dialog.failed
                              .svg(width: 95, height: 95)
                      : const SizedBox(),
                  SizedBox(
                    height: type == DialogType.confirmation ? 0 : 24,
                  ),
                  Text(
                    title,
                    style: const TextStyle(
                      color: ColorName.black,
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(
                    height: 12,
                  ),
                  Text(
                    subTitle,
                    style: const TextStyle(
                      color: ColorName.grey,
                      fontSize: 14,
                      fontWeight: FontWeight.w400,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(
                    height: 32,
                  ),
                  type == DialogType.confirmation
                      ? Row(
                          children: [
                            if (cancelButton == true)
                              Expanded(
                                child: CustomButton.outlined(
                                  label: 'Batal',
                                  onTap: () => Navigator.pop(context),
                                ),
                              ),
                            if (cancelButton == true)
                              const SizedBox(
                                width: 16.0,
                              ),
                            Expanded(
                              child: CustomButton.filled(
                                label: buttonText,
                                onTap: onTap,
                              ),
                            ),
                          ],
                        )
                      : Row(
                          children: [
                            Expanded(
                              child: CustomButton.filled(
                                label: buttonText,
                                onTap: onTap,
                              ),
                            ),
                          ],
                        ),
                ],
              ),
            ),
          ),
        );
      },
      transitionDuration: const Duration(milliseconds: 200),
      barrierDismissible: true,
      barrierLabel: '',
      context: context,
      pageBuilder: (context, animation1, animation2) {
        return Container();
      },
    ).then((value) {
      if (onDismissible != null) {
        onDismissible();
      }
    });
  }
}
`;
}
