"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomScaffoldTemplate = void 0;
function getCustomScaffoldTemplate() {
    return template();
}
exports.getCustomScaffoldTemplate = getCustomScaffoldTemplate;
function template() {
    return `import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../utils/bloc/network_cubit/network_cubit.dart';
import '../../utils/style/colors.dart';
import '../../utils/style/typography.dart';

class CustomScaffold extends StatelessWidget {
  final PreferredSizeWidget? appBar;
  final Widget? body;
  final Widget? bottomWidget;
  const CustomScaffold({
    super.key,
    this.appBar,
    this.body,
    this.bottomWidget,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar,
      bottomNavigationBar: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (bottomWidget != null) bottomWidget!,
          BlocBuilder<NetworkCubit, bool>(
            builder: (context, state) {
              if (state == false) {
                return Container(
                  padding: const EdgeInsets.all(8),
                  width: double.infinity,
                  color: ColorName.red,
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        'Tidak ada koneksi internet',
                        style: MyTypography.label2.semiBold.copyWith(
                          color: ColorName.white,
                        ),
                      ),
                    ],
                  ),
                );
              } else {
                return const SizedBox();
              }
            },
          ),
        ],
      ),
      body: body,
    );
  }
}
`;
}
//# sourceMappingURL=custom_scaffold.template.js.map