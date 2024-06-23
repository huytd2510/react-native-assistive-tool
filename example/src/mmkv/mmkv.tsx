import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { mmkv, mmkv2 } from './helper';

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
          mmkv.set('test', '1234')
        }}
      >
        <Text>set 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 100,
          width: 100,
          backgroundColor: 'rgba(255,255,255,0.7)',
        }}
        onPress={() => {
          mmkv2.set('tes33t', '1234333')
        }}
      >
        <Text>set 2</Text>
      </TouchableOpacity>
    </View>
  );
};
