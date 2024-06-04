import { NativeModules } from 'react-native';

export const checkShakeLibrary = () => {
  try {
    return Boolean(NativeModules.RNShake);
  } catch (e) {
    console.log(e);
    console.warn('react-native-shake is not installed.');
    return false;
  }
};
