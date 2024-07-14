import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  DeviceEventEmitter,
  type EmitterSubscription,
} from 'react-native';
import { AssistiveHelper, FORCE_SHOW_DEBUGGER_MODE } from './assistive';
import AssistiveTouchModal from '../modal';
import RNShake from 'react-native-shake';
import { checkShakeLibrary } from '../utils/helper';

const { height } = Dimensions.get('window');

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
}

export const AssistiveTouch: React.FC<IAssistiveTouch> = (props) => {
  const [visible, setVisible] = useState(false);
  let count = 0;
  const FAB_WIDTH = props.size || 70; // Size of the AssistiveTouch (must)

  const pan = useRef(new Animated.ValueXY({ x: 0, y: height / 2 })).current;
  let panValueRef = useRef({ x: 0, y: height / 2 });
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

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: panValueRef.current.x,
          y: panValueRef.current.y,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  if (props.hideAssistiveTouch) {
    return props.children;
  }
  return (
    <View
      style={styles.container}
      onLayout={(_) => {
        // view_height = e.nativeEvent.layout.height;
        // view_width = e.nativeEvent.layout.width;
        // view_start_x = e.nativeEvent.layout.x;
        // view_start_y = e.nativeEvent.layout.y;
        // view_end_x = view_start_x + view_width;
        // view_end_y = view_start_y + view_height;
        // current_position_x = view_end_x - FAB_WIDTH / 2;
        // current_position_y = view_height / 2 + view_start_y;
      }}
    >
      {props.children}
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
          position: 'absolute',
          right: 0,
          zIndex: 10,
        }}
        {...panResponder.panHandlers}
      >
        <View style={[styles.box, { height: FAB_WIDTH, width: FAB_WIDTH }]}>
          {props.button || (
            <AssistiveTouchButton
              color={props.color}
              onPress={() => {
                if (props.onPress) {
                  props.onPress();
                } else {
                  setVisible(true);
                }
              }}
              size={FAB_WIDTH}
            />
          )}
        </View>
      </Animated.View>
      <AssistiveTouchModal
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
  onPress?: () => void;
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
    <TouchableOpacity
      style={[styles.buttonContainer, containerStyleSize]}
      onPress={() => {
        props.onPress && props.onPress();
      }}
    >
      <View style={[styles.thirdLayer, thirdLayerSize, colorStyle]}>
        <View style={[styles.secondLayer, secondLayerSize]}>
          <View style={[styles.firstLayer, firstLayerSize]} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  box: {
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'center',
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
