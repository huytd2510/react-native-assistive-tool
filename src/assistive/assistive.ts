import { startNetworkLogging } from 'react-native-network-logger';

export type StartNetworkLoggingOptions = NonNullable<
  Parameters<typeof startNetworkLogging>[0]
>;
export const FORCE_SHOW_DEBUGGER_MODE = 'FORCE_SHOW_DEBUGGER_MODE';
export class AssistiveHelper {
  private static _shared: AssistiveHelper;

  public static get shared(): AssistiveHelper {
    if (!AssistiveHelper._shared) {
      AssistiveHelper._shared = new AssistiveHelper();
      startNetworkLogging();
    }
    return AssistiveHelper._shared;
  }

  public init(options?: StartNetworkLoggingOptions) {
    AssistiveHelper._shared = new AssistiveHelper();
    startNetworkLogging(options);
  }
}
