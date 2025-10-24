import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Dimensions,
  DeviceEventEmitter,
  type EmitterSubscription,
} from 'react-native';
import { AssistiveHelper, FORCE_SHOW_DEBUGGER_MODE } from './assistive';
import AssistiveTouchModal from '../modal';
import RNShake from 'react-native-shake';
import { checkShakeLibrary } from '../utils/helper';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window'); // Add this for screen dimensions

export interface DebugAddOnView {
  title: string;
  component: React.ReactNode;
}

interface IAssistiveTouch {
  onPress?: () => void;
  onMoveEnd?: () => void;
  size: number;
  percentage?: number;
  color?: string;
  button?: React.ReactNode;
  children?: React.ReactNode;
  customNetworkComponent?: React.ReactNode;
  navigationRef?: React.Ref<any>;
  hideAssistiveTouch?: boolean;
  callbackEventShowDebugger?: () => void;
  debugAddOnView?: DebugAddOnView[];
  tabs?: string[];
}

export const AssistiveTouch: React.FC<IAssistiveTouch> = (props) => {
  const [visible, setVisible] = useState(false);
  const FAB_WIDTH = props.size || 70; // Size of the AssistiveTouch (must)

  const pan = useRef(
    new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT / 2 })
  ).current;
  let panValueRef = useRef({ x: 0, y: SCREEN_HEIGHT / 2 });
  const dragStartTime = useRef(0);

  const { hideAssistiveTouch, callbackEventShowDebugger } = props;

  const actionEvent = useCallback(() => {
    // 1 lần tap là mở luôn
    if (!hideAssistiveTouch) {
      setVisible(true);
    }
    callbackEventShowDebugger && callbackEventShowDebugger();
  }, [hideAssistiveTouch, callbackEventShowDebugger]);

  useEffect(() => {
    // must record network logs
    AssistiveHelper.shared;
    pan.addListener((value) => {
      panValueRef.current = value;
    });
    let subscription: null | EmitterSubscription;
    if (checkShakeLibrary()) {
      subscription = RNShake.addListener(() => {
        if (props.hideAssistiveTouch === true) return;
        setVisible(true);
      });
    }
    const listener = DeviceEventEmitter.addListener(
      FORCE_SHOW_DEBUGGER_MODE,
      (_) => {
        actionEvent();
      }
    );
    return () => {
      listener.remove();
      if (subscription) {
        subscription.remove();
      }
    };
  }, [actionEvent, pan, props.hideAssistiveTouch]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Chỉ bắt đầu pan khi di chuyển đủ xa để tránh conflict với touch
        const shouldPan =
          Math.abs(gestureState.dx) > 8 || Math.abs(gestureState.dy) > 8;
        return shouldPan;
      },
      onPanResponderGrant: () => {
        dragStartTime.current = Date.now();
        pan.setOffset({
          x: panValueRef.current.x,
          y: panValueRef.current.y,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        pan.flattenOffset();
        const dragDuration = Date.now() - dragStartTime.current;
        const dragDistance = Math.sqrt(
          gestureState.dx * gestureState.dx + gestureState.dy * gestureState.dy
        );

        // Nếu drag distance nhỏ và thời gian ngắn, coi như tap
        if (dragDistance < 10 && dragDuration < 200) {
          // Đây là tap (không di chuyển xa), tăng count để show modal sau 5 taps
          actionEvent();
          props.onPress?.();
        } else {
          // Đây là drag, thực hiện snap to side
          let targetY = panValueRef.current.y;
          // Bound Y để không ra ngoài màn hình
          targetY = Math.max(0, Math.min(targetY, SCREEN_HEIGHT - FAB_WIDTH));

          // Snap X: nếu current X > midpoint (gần right hơn), snap về right (x=0); else snap về left (x= -(SCREEN_WIDTH - FAB_WIDTH))
          const currentX = panValueRef.current.x;
          const midpoint = -SCREEN_WIDTH / 2;
          const targetX = currentX > midpoint ? 0 : -(SCREEN_WIDTH - FAB_WIDTH);

          Animated.spring(pan, {
            toValue: { x: targetX, y: targetY },
            useNativeDriver: false, // Không dùng native driver vì PanResponder không tương thích tốt
          }).start(() => {
            props.onMoveEnd?.();
          });
        }
      },
    })
  ).current;

  if (props.hideAssistiveTouch) {
    return props.children;
  }

  return (
    <View style={styles.container}>
      {props.children}
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={[styles.box, { height: FAB_WIDTH, width: FAB_WIDTH }]}>
          {props.button || (
            <AssistiveTouchButton color={props.color} size={FAB_WIDTH} />
          )}
        </View>
        {/* Thêm touch area mở rộng để dễ bấm hơn */}
        <View style={styles.expandedTouchArea} />
      </Animated.View>
      <AssistiveTouchModal
        tabs={props.tabs}
        visible={visible}
        close={() => {
          setVisible(false);
        }}
        customNetworkComponent={props.customNetworkComponent}
        navigationRef={props.navigationRef}
        debugAddOnView={props.debugAddOnView}
      />
    </View>
  );
};

const AssistiveTouchButton: React.FC<{
  color?: string;
  size: number;
}> = (props) => {
  const colorStyle = { backgroundColor: 'black' };
  const size = props.size ? props.size : null;
  const containerStyleSize = size
    ? { height: size - 10, width: size - 10 }
    : null;
  const thirdLayerSize = size
    ? { height: size - 30, width: size - 30, borderRadius: (size - 30) / 2 }
    : null;
  const secondLayerSize = size
    ? { height: size - 40, width: size - 40, borderRadius: (size - 40) / 2 }
    : null;
  const firstLayerSize = size
    ? { height: size - 50, width: size - 50, borderRadius: (size - 50) / 2 }
    : null;

  return (
    <View style={[styles.buttonContainer, containerStyleSize]}>
      <View style={[styles.thirdLayer, thirdLayerSize, colorStyle]}>
        <View style={[styles.secondLayer, secondLayerSize]}>
          <View style={[styles.firstLayer, firstLayerSize]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  animatedContainer: {
    position: 'absolute',
    right: 0,
    zIndex: 10,
  },
  box: {
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandedTouchArea: {
    position: 'absolute',
    top: -15,
    left: -15,
    right: -15,
    bottom: -15,
    zIndex: 0,
  },
  buttonContainer: {
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  thirdLayer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondLayer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstLayer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
