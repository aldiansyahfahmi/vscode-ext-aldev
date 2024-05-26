export function getNetworkCubitTemplate(name: string): string {
  return template(name);
}

function template(name: string): string {
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
