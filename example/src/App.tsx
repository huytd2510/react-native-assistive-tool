import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MMVKdemo } from './mmkv/mmkv';
import { StogareDemo } from './storage/stogare';
import { AssistiveTouch } from 'react-native-assistive-tool';
import { NavigationDemo } from './navigation/navigation-demo';
import store from './store';
import { Provider } from 'react-redux';

export const navigationRef = React.createRef();

const Stack = createNativeStackNavigator();

const Home = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <TouchableOpacity
        style={{ marginBottom: 20 }}
        onPress={() => {
          navigation.navigate('MMVK');
        }}
      >
        <Text>Navigate to MMVK</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          navigation.navigate('StogareDemo');
        }}
      >
        <Text>Navigate to StogareDemo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          navigation.navigate('NavigationDemo');
        }}
      >
        <Text>Navigate to NavigationDemo</Text>
      </TouchableOpacity>
    </View>
  );
};
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer
        // @ts-ignore
        ref={navigationRef}
      >
        <AssistiveTouch
          color='black'
          size={70}
          // @ts-ignore
          navigationRef={navigationRef}
        >
          <Stack.Navigator>
            <Stack.Screen name={'Home'} component={Home} />
            <Stack.Screen name={'MMVK'} children={MMVKdemo} />
            <Stack.Screen name={'StogareDemo'} children={StogareDemo} />
            <Stack.Screen name={'NavigationDemo'} children={NavigationDemo} />
          </Stack.Navigator>
        </AssistiveTouch>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
