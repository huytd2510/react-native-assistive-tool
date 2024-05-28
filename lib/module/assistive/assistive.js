import { startNetworkLogging } from 'react-native-network-logger';
export const FORCE_SHOW_DEBUGGER_MODE = 'FORCE_SHOW_DEBUGGER_MODE';
export class AssistiveHelper {
  static get shared() {
    if (!AssistiveHelper._shared) {
      AssistiveHelper._shared = new AssistiveHelper();
      startNetworkLogging();
    }
    return AssistiveHelper._shared;
  }
  init() {
    AssistiveHelper._shared = new AssistiveHelper();
    startNetworkLogging();
  }
}
//# sourceMappingURL=assistive.js.map