"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  multiply: true
};
exports.multiply = multiply;
var _reactNative = require("react-native");
var _assistiveCmp = require("./assistive/assistive-cmp");
Object.keys(_assistiveCmp).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _assistiveCmp[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _assistiveCmp[key];
    }
  });
});
var _assistive = require("./assistive/assistive");
Object.keys(_assistive).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _assistive[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _assistive[key];
    }
  });
});
var _modal = require("./modal");
Object.keys(_modal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _modal[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _modal[key];
    }
  });
});
const LINKING_ERROR = `The package 'react-native-assistive-tool' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const AssistiveTool = _reactNative.NativeModules.AssistiveTool ? _reactNative.NativeModules.AssistiveTool : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
function multiply(a, b) {
  return AssistiveTool.multiply(a, b);
}
//# sourceMappingURL=index.js.map