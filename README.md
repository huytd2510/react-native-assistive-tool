# react-native-assistive-tool

<div align="center">

![npm version](https://img.shields.io/npm/v/react-native-assistive-tool?style=flat-square)
![npm downloads](https://img.shields.io/npm/dm/react-native-assistive-tool?style=flat-square)
![license](https://img.shields.io/npm/l/react-native-assistive-tool?style=flat-square)
![platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey?style=flat-square)

**A beautiful and powerful debugging tool for React Native apps** 🚀

A floating assistive touch button that provides easy access to network logs, storage viewer, navigation state, and Redux store - all in one beautiful, modern UI.

</div>

## ✨ Features

- 🎯 **Beautiful Modern UI** - Clean, intuitive interface with smooth animations
- 📡 **Network Logger** - Monitor all HTTP/HTTPS requests and responses
- 💾 **AsyncStorage Viewer** - View and manage your app's local storage
- 🧭 **Navigation Logger** - Debug navigation state and history
- 🔄 **Redux Logger** - Inspect Redux store and actions
- 📱 **Shake to Open** - Quick access by shaking your device
- 🎨 **Customizable** - Customize colors, size, tabs, and components
- ⚡ **Performant** - Lightweight with smooth animations

## 📸 Screenshots

> *Screenshots coming soon*

## 📦 Installation

```bash
npm install react-native-assistive-tool
# or
yarn add react-native-assistive-tool
```

### Peer Dependencies

This library requires the following peer dependencies. Install them based on which features you want to use:

#### Required for all features:
```bash
yarn add react-native-gesture-handler
yarn add react-native-safe-area-context
```

#### For Network Logger:
```bash
yarn add react-native-network-logger
```

#### For AsyncStorage Viewer:
```bash
yarn add @react-native-async-storage/async-storage
```

#### For Navigation Logger:
```bash
yarn add @react-navigation/native @react-navigation/native-stack
```

#### For Redux Logger:
```bash
yarn add react-redux redux
```

#### Optional:
```bash
# For shake gesture (optional)
yarn add react-native-shake

# For MMKV storage viewer (optional)
yarn add react-native-mmkv-storage
```

### iOS Setup

If you're using CocoaPods, run:

```bash
cd ios && pod install
```

## 🚀 Usage

### Basic Usage

```jsx
import React from 'react';
import { AssistiveTouch } from 'react-native-assistive-tool';
import { NavigationContainer } from '@react-navigation/native';

const navigationRef = React.createRef();

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <AssistiveTouch
        size={70}
        navigationRef={navigationRef}
      >
        {/* Your app content */}
      </AssistiveTouch>
    </NavigationContainer>
  );
}
```

### Advanced Usage

```jsx
import React from 'react';
import { AssistiveTouch } from 'react-native-assistive-tool';
import { NavigationContainer } from '@react-navigation/native';

const navigationRef = React.createRef();

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <AssistiveTouch
        size={70}
        color="#007AFF"
        navigationRef={navigationRef}
        tabs={['network', 'data']} // Custom tabs
        customNetworkComponent={<CustomNetworkView />}
        onPress={() => console.log('Button pressed')}
        onMoveEnd={() => console.log('Button moved')}
        callbackEventShowDebugger={() => console.log('Debugger opened')}
      >
        {/* Your app content */}
      </AssistiveTouch>
    </NavigationContainer>
  );
}
```

### Hide Assistive Touch

```jsx
<AssistiveTouch
  hideAssistiveTouch={true}
>
  {/* Your app content - button won't be shown */}
</AssistiveTouch>
```

## 📚 API Reference

### `AssistiveTouch` Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `70` | Size of the floating button in pixels |
| `color` | `string` | `"#007AFF"` | Color of the button (hex format) |
| `navigationRef` | `RefObject` | `undefined` | **Required** for Navigation Logger feature |
| `tabs` | `string[]` | `['network', 'data', 'navigation', 'redux']` | Custom tabs to display |
| `customNetworkComponent` | `ReactNode` | `undefined` | Custom network logger component |
| `debugAddOnView` | `DebugAddOnView[]` | `undefined` | Custom debug views to add |
| `hideAssistiveTouch` | `boolean` | `false` | Hide the floating button |
| `onPress` | `() => void` | `undefined` | Callback when button is pressed |
| `onMoveEnd` | `() => void` | `undefined` | Callback when button movement ends |
| `callbackEventShowDebugger` | `() => void` | `undefined` | Callback when debugger is opened |

### `DebugAddOnView` Interface

```typescript
interface DebugAddOnView {
  title: string;
  component: React.ReactNode;
}
```

### Custom Debug Views

You can add custom debug views to the modal:

```jsx
<AssistiveTouch
  debugAddOnView={[
    {
      title: 'custom',
      component: <YourCustomDebugView />
    }
  ]}
>
  {/* Your app */}
</AssistiveTouch>
```

## 🎨 Customization

### Custom Button

You can provide a custom button component:

```jsx
<AssistiveTouch
  button={<YourCustomButton />}
>
  {/* Your app */}
</AssistiveTouch>
```

### Custom Tabs

Only show specific tabs:

```jsx
<AssistiveTouch
  tabs={['network', 'data']} // Only network and data tabs
>
  {/* Your app */}
</AssistiveTouch>
```

### Custom Network Component

Replace the default network logger:

```jsx
import { NetworkLogger } from 'your-custom-network-logger';

<AssistiveTouch
  customNetworkComponent={<NetworkLogger />}
>
  {/* Your app */}
</AssistiveTouch>
```

## 🔧 Features Details

### Network Logger
- View all HTTP/HTTPS requests and responses
- Filter and search through requests
- View request/response headers and body
- Export requests data

### AsyncStorage Viewer
- View all stored key-value pairs
- Search and filter storage items
- Edit and delete stored values

### Navigation Logger
- View current navigation state
- See navigation history
- Debug navigation actions

### Redux Logger
- Inspect Redux store state
- View dispatched actions
- Track state changes

## 🎯 Shake to Open

The debugger can be opened by shaking your device. Make sure `react-native-shake` is installed and properly configured.

## 💡 Tips

- The floating button automatically snaps to the nearest edge when released
- Tap the button once to open the debugger
- Drag the button to move it around
- Customize the button size and color to match your app theme

## 🤝 Contributing

Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**huy.trinh**
- GitHub: [@huytd2510](https://github.com/huytd2510)
- Email: huytd2510@gmail.com

## 🙏 Acknowledgments

- Built with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
- Inspired by iOS AssistiveTouch

---

<div align="center">

Made with ❤️ for React Native developers

[⭐ Star this repo](https://github.com/huytd2510/react-native-assistive-tool) if you find it helpful!

</div>

