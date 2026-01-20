import React, { useEffect, useRef, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Button,
  DeviceEventEmitter,
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MMVKdemo } from './mmkv/mmkv';
import { StogareDemo } from './storage/stogare';
import {
  AssistiveTouch,
  FORCE_SHOW_DEBUGGER_MODE,
} from 'react-native-assistive-tool';
import { NavigationDemo } from './navigation/navigation-demo';
import store from './store';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          DeviceEventEmitter.emit(FORCE_SHOW_DEBUGGER_MODE);
        }}
      >
        <Text>Force show</Text>
      </TouchableOpacity>
    </View>
  );
};

const getNavigationActionType = (prevState, currentState) => {
  console.log("currentState", currentState);
  if (!prevState || !currentState) return 'initial';

  const prevRoute = prevState.routes ? prevState.routes[prevState.index] : null;
  const currentRoute = currentState.routes ? currentState.routes[currentState.index] : null;
  console.log('prevRoute', prevRoute);
  console.log('currentRoute', currentRoute);
  if (!prevRoute || !currentRoute) return 'initial';

  if (prevRoute.name !== currentRoute.name) {
    return 'navigate';
  }

  if (currentRoute.state?.index > prevRoute.state?.index) {
    return 'push';
  }

  if (currentRoute.state?.index < prevRoute.state?.index) {
    return 'pop';
  }

  return 'unknown';
};

const App: React.FC = () => {

  const navigationRef = useRef(null); // Initialize with null
  const routeNameRef = useRef(null); // Initialize with null

  useEffect(() => {
    if (navigationRef.current) {
      routeNameRef.current = navigationRef.current.getCurrentRoute()?.name;
    }
  }, []);

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            if (navigationRef.current) {
              routeNameRef.current =
                navigationRef.current.getCurrentRoute()?.name;
            }
          }}
          onStateChange={(state) => {
            // const navigationAction = getNavigationActionType(
            //   state,
            //   navigationRef.current?.gét()
            // );
          }}
        >
          <AssistiveTouch
            color="black"
            size={70}
            // @ts-ignore
            navigationRef={navigationRef}
            callbackEventShowDebugger={() => {}}
            tabs={['network', 'data']}
            ignoredHosts={['google.com']}
            ignoredUrls={['https://myservice.com/ping']}
            ignoredPatterns={[/POST \/.*\/logging$/]}
            debugAddOnView={[
              {
                title: 'MMKV',
                component: <MMVKdemo />,
              },
            ]}
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
    </GestureHandlerRootView>
  );
};

export default App;
