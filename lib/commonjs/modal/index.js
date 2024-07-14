"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AssistiveTouchModal = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeNetworkLogger = _interopRequireDefault(require("react-native-network-logger"));
var _aysncStorageLogger = _interopRequireDefault(require("./aysnc-storage-logger"));
var _navigationLogger = require("./navigation-logger");
var _reduxLogger = _interopRequireDefault(require("./redux-logger"));
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
  const [listTabDebug, setListTabDebug] = (0, _react.useState)(['network', 'data', 'navigation', 'redux']);
  (0, _react.useEffect)(() => {
    if (props.debugAddOnView) {
      const keys = props.debugAddOnView.map(item => item.title);
      setListTabDebug([...listTabDebug, ...keys]);
    }
  }, []);
  const renderTabContent = () => {
    if (!activeTab) return null;
    let debugView = null;
    switch (activeTab) {
      case 'network':
        {
          if (props.customNetworkComponent) {
            debugView = props.customNetworkComponent;
          } else {
            debugView = /*#__PURE__*/_react.default.createElement(NetworkComponent, null);
          }
          break;
        }
      case 'data':
        {
          debugView = /*#__PURE__*/_react.default.createElement(DataInLocalComponent, null);
          break;
        }
      case 'navigation':
        {
          debugView = /*#__PURE__*/_react.default.createElement(_navigationLogger.NavigationLogger, {
            navigationRef: props.navigationRef
          });
          break;
        }
      case 'redux':
        {
          debugView = /*#__PURE__*/_react.default.createElement(_reduxLogger.default, null);
          break;
        }
    }
    if (props.debugAddOnView) {
      const view = props.debugAddOnView.find(item => item.title === activeTab);
      if (view) {
        debugView = view.component;
      }
    }
    return debugView;
  };
  const renderItem = title => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: [styles.tab, activeTab === title && styles.activeTab],
      onPress: () => setActiveTab(title)
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.tabText
    }, title));
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    transparent: true,
    animationType: 'fade',
    visible: props.visible
  }, /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.containerCard
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.card
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: {
      height: '7%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 0.5
    },
    onPress: props.close
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, "Close")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      height: '6%',
      width: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    contentContainerStyle: styles.tabBar,
    horizontal: true,
    showsHorizontalScrollIndicator: false
  }, listTabDebug.map(item => renderItem(item)))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.contentView
  }, renderTabContent())))));
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
  contentView: {
    height: '85%',
    borderTopWidth: 0.5,
    borderTopColor: 'grey'
  },
  containerCard: {
    alignSelf: 'stretch',
    height: '100%',
    width: '100%',
    backgroundColor: 'grey'
  },
  card: {
    alignSelf: 'stretch',
    height: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 20
  },
  tabBar: {
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 40,
    backgroundColor: 'row'
  },
  tab: {
    padding: 10,
    paddingVertical: 6
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue'
  },
  tabText: {
    fontSize: 14
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