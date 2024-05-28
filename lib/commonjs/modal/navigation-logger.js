"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationLogger = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const NavigationLogger = props => {
  var _props$navigationRef;
  // @ts-ignore
  const data = (_props$navigationRef = props.navigationRef) === null || _props$navigationRef === void 0 || (_props$navigationRef = _props$navigationRef.current) === null || _props$navigationRef === void 0 ? void 0 : _props$navigationRef.getRootState().routes;
  const [expandedIndexes, setExpandedIndexes] = (0, _react.useState)({});
  const toggleExpansion = key => {
    setExpandedIndexes(prevIndexes => ({
      ...prevIndexes,
      // @ts-ignore
      [key]: !prevIndexes[key]
    }));
  };
  const renderNestedItems = (item, level = 0) => {
    // @ts-ignore
    const isExpanded = expandedIndexes[item.key];
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      key: item.key,
      style: [styles.item, {
        marginLeft: level * 20
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: () => toggleExpansion(item.key)
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.text
    }, `Name: ${item.name}`)), isExpanded && item.state && item.state.routes && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.routesContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.routesTitle
    }, "Routes:"),
    // @ts-ignore
    item.state.routes.map(route => renderNestedItems(route, level + 1))), isExpanded && item.params && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.text
    }, `Params: ${JSON.stringify(item.params)}`));
  };
  if (!data) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, "Can't show navigation stack"));
  }
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      backgroundColor: 'white',
      padding: 5,
      paddingRight: 20
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: () => {
      // @ts-ignore
      _reactNative.Clipboard.setString(JSON.stringify(data));
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      color: 'blue',
      opacity: 0.7
    }
  }, "Copy current stack in navigation"))), data.map(item => renderNestedItems(item)));
};
exports.NavigationLogger = NavigationLogger;
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
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
  routesContainer: {
    marginLeft: 10
  },
  routesTitle: {
    fontWeight: 'bold',
    marginBottom: 5
  }
});
//# sourceMappingURL=navigation-logger.js.map