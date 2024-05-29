export function getShimmerLoadingTemplate(): string {
  return template();
}

function template(): string {
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
