"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssistiveTouch = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _assistive = require("./assistive");
var _modal = _interopRequireDefault(require("../modal"));
var _reactNativeShake = _interopRequireDefault(require("react-native-shake"));
var _helper = require("../utils/helper");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const {
  height
} = _reactNative.Dimensions.get('window');
const AssistiveTouch = props => {
  const [visible, setVisible] = (0, _react.useState)(false);
  let count = 0;
  const FAB_WIDTH = props.size || 70; // Size of the AssistiveTouch (must)

  const pan = (0, _react.useRef)(new _reactNative.Animated.ValueXY({
    x: 0,
    y: height / 2
  })).current;
  let panValueRef = (0, _react.useRef)({
    x: 0,
    y: height / 2
  });
  (0, _react.useEffect)(() => {
    // must record network logs
    _assistive.AssistiveHelper.shared;
    pan.addListener(value => {
      panValueRef.current = value;
    });
    let subscription;
    if ((0, _helper.checkShakeLibrary)()) {
      subscription = _reactNativeShake.default.addListener(() => {
        if (props.hideAssistiveTouch === true) return;
        setVisible(true);
      });
    }
    const listener = _reactNative.DeviceEventEmitter.addListener(_assistive.FORCE_SHOW_DEBUGGER_MODE, _ => {
      actionEvent();
    });
    return () => {
      listener.remove();
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);
  const actionEvent = () => {
    if (count < 4) {
      count++;
      setTimeout(() => {
        count = 0;
      }, 3000);
    } else {
      if (!props.hideAssistiveTouch) {
        setVisible(true);
      }
      props.callbackEventShowDebugger && props.callbackEventShowDebugger();
      count = 0;
    }
  };
  const panResponder = (0, _react.useRef)(_reactNative.PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset({
        x: panValueRef.current.x,
        y: panValueRef.current.y
      });
    },
    onPanResponderMove: _reactNative.Animated.event([null, {
      dx: pan.x,
      dy: pan.y
    }], {
      useNativeDriver: false
    }),
    onPanResponderRelease: () => {
      pan.flattenOffset();
    }
  })).current;
  if (props.hideAssistiveTouch) {
    return props.children;
  }
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container,
    onLayout: _ => {
      // view_height = e.nativeEvent.layout.height;
      // view_width = e.nativeEvent.layout.width;
      // view_start_x = e.nativeEvent.layout.x;
      // view_start_y = e.nativeEvent.layout.y;
      // view_end_x = view_start_x + view_width;
      // view_end_y = view_start_y + view_height;
      // current_position_x = view_end_x - FAB_WIDTH / 2;
      // current_position_y = view_height / 2 + view_start_y;
    }
  }, props.children, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, _extends({
    style: {
      transform: [{
        translateX: pan.x
      }, {
        translateY: pan.y
      }],
      position: 'absolute',
      right: 0,
      zIndex: 10
    }
  }, panResponder.panHandlers), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.box, {
      height: FAB_WIDTH,
      width: FAB_WIDTH
    }]
  }, props.button || /*#__PURE__*/_react.default.createElement(AssistiveTouchButton, {
    color: props.color,
    onPress: () => {
      if (props.onPress) {
        props.onPress();
      } else {
        setVisible(true);
      }
    },
    size: FAB_WIDTH
  }))), /*#__PURE__*/_react.default.createElement(_modal.default, {
    visible: visible,
    close: () => {
      setVisible(false);
    },
    customNetworkComponent: props.customNetworkComponent,
    navigationRef: props.navigationRef
  }));
};
exports.AssistiveTouch = AssistiveTouch;
const AssistiveTouchButton = props => {
  const colorStyle = {
    backgroundColor: 'black'
  };
  const size = props.size ? props.size : null;
  const containerStyleSize = size ? {
    height: size - 10,
    width: size - 10
  } : null;
  const thirdLayerSize = size ? {
    height: size - 30,
    width: size - 30,
    borderRadius: (size - 30) / 2
  } : null;
  const secondLayerSize = size ? {
    height: size - 40,
    width: size - 40,
    borderRadius: (size - 40) / 2
  } : null;
  const firstLayerSize = size ? {
    height: size - 50,
    width: size - 50,
    borderRadius: (size - 50) / 2
  } : null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: [styles.buttonContainer, containerStyleSize],
    onPress: () => {
      props.onPress && props.onPress();
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.thirdLayer, thirdLayerSize, colorStyle]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.secondLayer, secondLayerSize]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.firstLayer, firstLayerSize]
  }))));
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  box: {
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'center'
  },
  thirdLayer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  secondLayer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  firstLayer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
//# sourceMappingURL=assistive-cmp.js.map