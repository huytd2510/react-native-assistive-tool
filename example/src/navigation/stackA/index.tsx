import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Text, View } from 'react-native';
import { navigationRef } from '../../App';
import StackBNavigator from '../stackB';

const Stack = createStackNavigator();

export default function StackANavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="A1" component={A1} />
      <Stack.Screen name="A2" component={A2} />
      <Stack.Screen name="A3" component={A3} />
      <Stack.Screen name="BStack" component={StackBNavigator} />
    </Stack.Navigator>
  );
}

function A1({ navigation }: any) {
  return (
    <View>
      <Text>A1 Screen</Text>
      <Button title="Go to A2" onPress={() => navigation.navigate('A2')} />
    </View>
  );
}

function A2({ navigation }: any) {
  return (
    <View>
      <Text>A2 Screen</Text>
      <Button title="Go to A3" onPress={() => navigation.navigate('A3', {
        id: '123123'
      })} />
      <Button
        title={'View stack'}
        onPress={() => {
          console.log(navigationRef.current?.getRootState());
        }}
      />
    </View>
  );
}

function A3({ navigation }: any) {
  return (
    <View>
      <Text>A3 Screen</Text>
      <Button
        title={'View stack'}
        onPress={() => {
          console.log(navigationRef.current?.getRootState().routes[1].state);
        }}
      />
      <Button
        title={'Navigate B stack'}
        onPress={() => {
          navigation.navigate('BStack', {
            id: 'HIhi'
          })
        }}
      />
    </View>
  );
}
