"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssistiveTouch = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _assistive = require("./assistive");
var _modal = _interopRequireDefault(require("../modal"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const {
  width,
  height
} = _reactNative.Dimensions.get('window');
const AssistiveTouch = props => {
  const [visible, setVisible] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    // must record network logs
    _assistive.AssistiveHelper.shared;
  }, []);
  const FAB_WIDTH = props.size || 70; // Size of the AssistiveTouch (must)
  const Y_PERCENTAGE = props.percentage || 0.2; // Vertical percentage of slide

  let view_height = height;
  let view_width = width;
  let view_start_y = 0;
  let view_start_x = 0;
  let view_end_x = width;
  let view_end_y = height;
  let current_position_x = width - FAB_WIDTH / 2;
  let current_position_y = height / 2;
  const pan = (0, _react.useRef)(new _reactNative.Animated.ValueXY()).current;
  const panResponder = (0, _react.useRef)(_reactNative.PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset({
        // @ts-ignore
        x: pan.x._value,
        // @ts-ignore
        y: pan.y._value
      });
    },
    onPanResponderMove: _reactNative.Animated.event([null, {
      dx: pan.x,
      dy: pan.y
    }], {
      useNativeDriver: false
    }),
    onPanResponderRelease: () => {
      props.onMoveEnd && props.onMoveEnd();
      // @ts-ignore
      let current_x = pan.x._value;
      // @ts-ignore
      let current_y = pan.y._value;
      if (current_position_y + current_y <= height * Y_PERCENTAGE) {
        let top_y = -(current_position_y - view_start_y) + FAB_WIDTH / 2;
        if (current_position_x + current_x + FAB_WIDTH / 2 > view_end_x) {
          // Right-Top corner
          let right_x = view_end_x - FAB_WIDTH / 2 - current_position_x;
          current_position_x = view_end_x - FAB_WIDTH / 2;
          current_position_y = FAB_WIDTH / 2 + view_start_y;
          pan.setValue({
            x: right_x,
            y: top_y
          });
        } else if (current_position_x + current_x - FAB_WIDTH / 2 < view_start_x) {
          // Left-Top corner
          let left_x = -current_position_x + view_start_x + FAB_WIDTH / 2;
          current_position_x = FAB_WIDTH / 2 + view_start_x;
          current_position_y = FAB_WIDTH / 2 + view_start_y;
          pan.setValue({
            x: left_x,
            y: top_y
          });
        } else {
          // No corner
          current_position_y = FAB_WIDTH / 2 + view_start_y;
          current_position_x += current_x;
          pan.setValue({
            x: current_x,
            y: top_y
          });
        }
      } else if (current_position_y + current_y >= height * (1 - Y_PERCENTAGE)) {
        let bottom_y = view_end_y - current_position_y - FAB_WIDTH / 2;
        if (current_position_x + current_x + FAB_WIDTH / 2 > view_end_x) {
          // Right-Bottom corner
          let right_x = view_end_x - FAB_WIDTH / 2 - current_position_x;
          current_position_x = view_end_x - FAB_WIDTH / 2;
          current_position_y = view_end_y - FAB_WIDTH / 2;
          pan.setValue({
            x: right_x,
            y: bottom_y
          });
        } else if (current_position_x + current_x - FAB_WIDTH / 2 < view_start_x) {
          let left_x = -current_position_x + view_start_x + FAB_WIDTH / 2;
          current_position_x = FAB_WIDTH / 2 + view_start_x;
          current_position_y = view_end_y - FAB_WIDTH / 2;
          pan.setValue({
            x: left_x,
            y: bottom_y
          });
        } else {
          current_position_y = view_end_y - FAB_WIDTH / 2;
          current_position_x += current_x;
          pan.setValue({
            x: current_x,
            y: bottom_y
          });
        }
      } else if (current_position_x + current_x >= view_width / 2) {
        let right_x = view_end_x - FAB_WIDTH / 2 - current_position_x;
        current_position_x = view_end_x - FAB_WIDTH / 2;
        current_position_y += current_y;
        pan.setValue({
          x: right_x,
          y: current_y
        });
      } else if (current_position_x + current_x < width / 2) {
        let left_x = -current_position_x + view_start_x + FAB_WIDTH / 2;
        current_position_x = FAB_WIDTH / 2 + view_start_x;
        current_position_y += current_y;
        pan.setValue({
          x: left_x,
          y: current_y
        });
      }
      pan.flattenOffset();
    }
  })).current;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container,
    onLayout: e => {
      view_height = e.nativeEvent.layout.height;
      view_width = e.nativeEvent.layout.width;
      view_start_x = e.nativeEvent.layout.x;
      view_start_y = e.nativeEvent.layout.y;
      view_end_x = view_start_x + view_width;
      view_end_y = view_start_y + view_height;
      current_position_x = view_end_x - FAB_WIDTH / 2;
      current_position_y = view_height / 2 + view_start_y;
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
      zIndex: 2
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
    close: () => setVisible(false),
    customNetworkComponent: props.customNetworkComponent
  }));
};
exports.AssistiveTouch = AssistiveTouch;
const AssistiveTouchButton = props => {
  const colorStyle = props.color ? {
    backgroundColor: props.color
  } : null;
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
    onPress: () => props.onPress && props.onPress(),
    activeOpacity: 1,
    style: [styles.buttonContainer, containerStyleSize, colorStyle]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.thirdLayer, thirdLayerSize]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.secondLayer, secondLayerSize]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.firstLayer, firstLayerSize]
  }))));
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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