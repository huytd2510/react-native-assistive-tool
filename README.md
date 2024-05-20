# react-native-assistive-tool

React native dev tool for assistive touch
- Network logger
- AsyncStorage viewer
- Navigation logger

## Installation

```sh
npm install react-native-assistive-tool
```
Or yarn
```sh
yarn add react-native-assistive-tool
```

You have to install "@react-native-async-storage/async-storage" for AsyncStorage viewer

```sh
yarn add @react-native-async-storage/async-storage
```

You have to install "react-navigation" for Navigation logger

```sh
yarn add @react-navigation/native @react-navigation/native-stack
```
And install "react-native-network-logger" for Network logger

```sh
yarn add react-native-network-logger
```

"react-native-mmkv-storage":is optional for MMKV storage


## Usage
Make sure to wrap your app with NavigationContainer
```js
import { AssistiveTouch } from 'react-native-assistive-tool';

// ...

<AssistiveTouch
  color="black"
  size={70}
  //MUST FOR NAVIGATION LOGGER
  navigationRef={navigationRef}
>
  {/Your component/}
</AssistiveTouch>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
