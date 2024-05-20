import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { navigationRef } from '../App';

export const MMVKdemo = () => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          height: 100,
          width: 100,
          backgroundColor: 'rgba(255,255,255,0.7)',
        }}
        onPress={() => {
          console.log(navigationRef.current?.getRootState());
        }}
      >
        <Text>Navigate</Text>
      </TouchableOpacity>
    </View>
  );
};
