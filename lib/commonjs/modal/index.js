"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AssistiveTouchModal = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeNetworkLogger = _interopRequireDefault(require("react-native-network-logger"));
var _aysncStorageLogger = _interopRequireDefault(require("./aysnc-storage-logger"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const NetworkComponent = () => {
  return /*#__PURE__*/_react.default.createElement(_reactNativeNetworkLogger.default, null);
};
const DataInLocalComponent = () => {
  return /*#__PURE__*/_react.default.createElement(_aysncStorageLogger.default, null);
};
const AssistiveTouchModal = props => {
  const [activeTab, setActiveTab] = (0, _react.useState)('network');
  const renderTabContent = () => {
    switch (activeTab) {
      case 'network':
        return props.customNetworkComponent ? props.customNetworkComponent : /*#__PURE__*/_react.default.createElement(NetworkComponent, null);
      case 'data':
        return /*#__PURE__*/_react.default.createElement(DataInLocalComponent, null);
      // case 'dataMMKV':
      //   return <MMKVKeyValueTable />;
      default:
        return null;
    }
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    transparent: true,
    animationType: 'fade',
    visible: props.visible
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.containerCard
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.card
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: {
      height: '5%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 0.5
    },
    onPress: props.close
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, "Closes")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.tabBar
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: [styles.tab, activeTab === 'network' && styles.activeTab],
    onPress: () => setActiveTab('network')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.tabText
  }, "Network")), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: [styles.tab, activeTab === 'data' && styles.activeTab],
    onPress: () => setActiveTab('data')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.tabText
  }, "Async storage"))), renderTabContent())));
};
exports.AssistiveTouchModal = AssistiveTouchModal;
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  containerCard: {
    alignSelf: 'stretch',
    height: '100%',
    width: '100%',
    backgroundColor: 'grey'
  },
  card: {
    alignSelf: 'stretch',
    height: '95%',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 20
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  tab: {
    padding: 10
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue'
  },
  tabText: {
    fontSize: 16
  },
  tabContent: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
var _default = exports.default = AssistiveTouchModal;
//# sourceMappingURL=index.js.map