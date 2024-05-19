import { startNetworkLogging } from 'react-native-network-logger';

export class AssistiveHelper {
  private static _shared: AssistiveHelper;

  public static get shared(): AssistiveHelper {
    if (!AssistiveHelper._shared) {
      AssistiveHelper._shared = new AssistiveHelper();
      startNetworkLogging();
    }
    return AssistiveHelper._shared;
  }

  public init() {
    AssistiveHelper._shared = new AssistiveHelper();
    startNetworkLogging();
  }
}
