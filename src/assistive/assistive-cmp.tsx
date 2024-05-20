import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  type LayoutChangeEvent,
} from 'react-native';
import { AssistiveHelper } from './assistive';
import AssistiveTouchModal from '../modal';

const { width, height } = Dimensions.get('window');

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
}

export const AssistiveTouch: React.FC<IAssistiveTouch> = (props) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    // must record network logs
    AssistiveHelper.shared;
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

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          // @ts-ignore
          x: pan.x._value,
          // @ts-ignore
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
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
            pan.setValue({ x: right_x, y: top_y });
          } else if (
            current_position_x + current_x - FAB_WIDTH / 2 <
            view_start_x
          ) {
            // Left-Top corner
            let left_x = -current_position_x + view_start_x + FAB_WIDTH / 2;
            current_position_x = FAB_WIDTH / 2 + view_start_x;
            current_position_y = FAB_WIDTH / 2 + view_start_y;
            pan.setValue({ x: left_x, y: top_y });
          } else {
            // No corner
            current_position_y = FAB_WIDTH / 2 + view_start_y;
            current_position_x += current_x;
            pan.setValue({ x: current_x, y: top_y });
          }
        } else if (
          current_position_y + current_y >=
          height * (1 - Y_PERCENTAGE)
        ) {
          let bottom_y = view_end_y - current_position_y - FAB_WIDTH / 2;
          if (current_position_x + current_x + FAB_WIDTH / 2 > view_end_x) {
            // Right-Bottom corner
            let right_x = view_end_x - FAB_WIDTH / 2 - current_position_x;
            current_position_x = view_end_x - FAB_WIDTH / 2;
            current_position_y = view_end_y - FAB_WIDTH / 2;
            pan.setValue({ x: right_x, y: bottom_y });
          } else if (
            current_position_x + current_x - FAB_WIDTH / 2 <
            view_start_x
          ) {
            let left_x = -current_position_x + view_start_x + FAB_WIDTH / 2;
            current_position_x = FAB_WIDTH / 2 + view_start_x;
            current_position_y = view_end_y - FAB_WIDTH / 2;
            pan.setValue({ x: left_x, y: bottom_y });
          } else {
            current_position_y = view_end_y - FAB_WIDTH / 2;
            current_position_x += current_x;
            pan.setValue({ x: current_x, y: bottom_y });
          }
        } else if (current_position_x + current_x >= view_width / 2) {
          let right_x = view_end_x - FAB_WIDTH / 2 - current_position_x;
          current_position_x = view_end_x - FAB_WIDTH / 2;
          current_position_y += current_y;
          pan.setValue({ x: right_x, y: current_y });
        } else if (current_position_x + current_x < width / 2) {
          let left_x = -current_position_x + view_start_x + FAB_WIDTH / 2;
          current_position_x = FAB_WIDTH / 2 + view_start_x;
          current_position_y += current_y;
          pan.setValue({ x: left_x, y: current_y });
        }

        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <View
      style={styles.container}
      onLayout={(e: LayoutChangeEvent) => {
        view_height = e.nativeEvent.layout.height;
        view_width = e.nativeEvent.layout.width;
        view_start_x = e.nativeEvent.layout.x;
        view_start_y = e.nativeEvent.layout.y;
        view_end_x = view_start_x + view_width;
        view_end_y = view_start_y + view_height;
        current_position_x = view_end_x - FAB_WIDTH / 2;
        current_position_y = view_height / 2 + view_start_y;
      }}
    >
      {props.children}
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
          position: 'absolute',
          right: 0,
          zIndex: 2,
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
        close={() => setVisible(false)}
        customNetworkComponent={props.customNetworkComponent}
        navigationRef={props.navigationRef}
      />
    </View>
  );
};

const AssistiveTouchButton: React.FC<{
  color?: string;
  size: number;
  onPress?: () => void;
}> = (props) => {
  const colorStyle = props.color ? { backgroundColor: props.color } : null;
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
      onPress={() => props.onPress && props.onPress()}
      activeOpacity={1}
      style={[styles.buttonContainer, containerStyleSize, colorStyle]}
    >
      <View style={[styles.thirdLayer, thirdLayerSize]}>
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
