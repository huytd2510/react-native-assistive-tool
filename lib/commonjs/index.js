"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _assistiveCmp = require("./assistive/assistive-cmp");
Object.keys(_assistiveCmp).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
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
  if (key in exports && exports[key] === _modal[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _modal[key];
    }
  });
});
//# sourceMappingURL=index.js.map