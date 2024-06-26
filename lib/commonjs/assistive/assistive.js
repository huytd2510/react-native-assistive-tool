"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FORCE_SHOW_DEBUGGER_MODE = exports.AssistiveHelper = void 0;
var _reactNativeNetworkLogger = require("react-native-network-logger");
const FORCE_SHOW_DEBUGGER_MODE = exports.FORCE_SHOW_DEBUGGER_MODE = 'FORCE_SHOW_DEBUGGER_MODE';
class AssistiveHelper {
  static get shared() {
    if (!AssistiveHelper._shared) {
      AssistiveHelper._shared = new AssistiveHelper();
      (0, _reactNativeNetworkLogger.startNetworkLogging)();
    }
    return AssistiveHelper._shared;
  }
  init() {
    AssistiveHelper._shared = new AssistiveHelper();
    (0, _reactNativeNetworkLogger.startNetworkLogging)();
  }
}
exports.AssistiveHelper = AssistiveHelper;
//# sourceMappingURL=assistive.js.map