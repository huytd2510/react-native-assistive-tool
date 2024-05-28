"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactRedux = require("react-redux");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// ReduxLogger.tsx

const isObject = item => {
  return item && typeof item === 'object' && !Array.isArray(item);
};
const RenderObject = ({
  data,
  level
}) => {
  const [expanded, setExpanded] = (0, _react.useState)({});
  const toggleExpansion = key => {
    setExpanded(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, Object.keys(data).map(key => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: key,
    style: [styles.item, {
      marginLeft: level * 20
    }]
  }, isObject(data[key]) ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: () => toggleExpansion(key)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.text
  }, `${key}: ${expanded[key] ? '↑' : '↓'}`)), expanded[key] && /*#__PURE__*/_react.default.createElement(RenderObject, {
    data: data[key],
    level: level + 1
  })) : /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.text,
    onPress: () => {
      _reactNative.Clipboard.setString(JSON.stringify(data[key]));
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, `${key}: ${JSON.stringify(data[key])}`), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.textLip
  }, "Click here to copy ")))));
};
const ReduxLogger = () => {
  const storeData = (0, _reactRedux.useSelector)(state => state);
  return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(RenderObject, {
    data: storeData,
    level: 0
  }));
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  item: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10
  },
  text: {
    marginBottom: 5
  },
  textLip: {
    marginTop: 3,
    fontSize: 9
  }
});
var _default = exports.default = ReduxLogger;
//# sourceMappingURL=redux-logger.js.map