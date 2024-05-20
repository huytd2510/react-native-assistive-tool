import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Text, View } from 'react-native';
import { navigationRef } from '../../App';

const Stack = createStackNavigator();

export default function StackBNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="B1" component={B1} />
      <Stack.Screen name="B2" component={B2} />
      <Stack.Screen name="B3" component={B3} />
    </Stack.Navigator>
  );
}

function B1({ navigation }: any) {
  return (
    <View>
      <Text>B1 Screen</Text>
      <Button title="Go to B2" onPress={() => navigation.navigate('B2')} />
    </View>
  );
}

function B2({ navigation }: any) {
  return (
    <View>
      <Text>B2 Screen</Text>
      <Button
        title="Go to B3"
        onPress={() =>
          navigation.navigate('B3', {
            id: '123123',
          })
        }
      />
      <Button
        title={'View stack'}
        onPress={() => {
          console.log(navigationRef.current?.getRootState());
        }}
      />
    </View>
  );
}

function B3() {
  return (
    <View>
      <Text>B3 Screen</Text>
      <Button
        title={'View stack'}
        onPress={() => {
          console.log(navigationRef.current?.getRootState().routes[1].state);
        }}
      />
    </View>
  );
}
