import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const StogareDemo = () => {
  const fetchAndSaveData = async () => {
    try {
      // Gọi API miễn phí. Ví dụ này sử dụng API từ jsonplaceholder.typicode.com
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      );
      const data = await response.json();

      // Chọn khoảng 5 cặp key-value từ dữ liệu API để lưu vào AsyncStorage
      const keyValues = data
        .slice(0, 100)
        .map((item, index) => [`post_${index + 1}`, JSON.stringify(item)]);

      // Sử dụng AsyncStorage.multiSet để lưu các cặp key-value
      await AsyncStorage.multiSet(keyValues);
      Alert.alert('Data saved successfully', 'Data successfully saved to AsyncStorage');
      console.log('Data successfully saved to AsyncStorage');
    } catch (error) {
      console.error('Error fetching or saving data:', error);
    }
  };

  return (
    <View style={styles.appWrapper}>
      <Text>Hello world!</Text>
      <Button title={'Test'} onPress={fetchAndSaveData} />
    </View>
  );
};
const styles = StyleSheet.create({
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
  appWrapper: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
