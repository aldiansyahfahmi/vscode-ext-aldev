"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNetworkCubitTemplate = void 0;
function getNetworkCubitTemplate(name) {
    return template(name);
}
exports.getNetworkCubitTemplate = getNetworkCubitTemplate;
function template(name) {
    return `import 'dart:async';

import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class NetworkCubit extends Cubit<bool> {
  StreamSubscription? _subscription;
  NetworkCubit() : super(true);

  void checkConnection() async {
    _subscription = Connectivity().onConnectivityChanged.listen(
      (event) {
        if (event.contains(ConnectivityResult.mobile) ||
            event.contains(ConnectivityResult.wifi)) {
          emit(true);
        } else {
          emit(false);
        }
      },
    );
  }

  @override
  Future<void> close() {
    _subscription!.cancel();
    return super.close();
  }
}

`;
}
//# sourceMappingURL=network-cubit.template.js.map