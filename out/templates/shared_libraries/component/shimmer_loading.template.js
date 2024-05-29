"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShimmerLoadingTemplate = void 0;
function getShimmerLoadingTemplate() {
    return template();
}
exports.getShimmerLoadingTemplate = getShimmerLoadingTemplate;
function template() {
    return `import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

import '../../utils/style/colors.dart';

class ShimmerLoading extends StatelessWidget {
  final Widget child;
  const ShimmerLoading({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return Shimmer.fromColors(
      baseColor: Colors.grey.shade300,
      highlightColor: ColorName.white,
      child: child,
    );
  }
}
`;
}
//# sourceMappingURL=shimmer_loading.template.js.map