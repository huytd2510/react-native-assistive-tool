// ReduxLogger.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Clipboard } from 'react-native';
import { useSelector } from 'react-redux';
const isObject = item => {
  return item && typeof item === 'object' && !Array.isArray(item);
};
const RenderObject = ({
  data,
  level
}) => {
  const [expanded, setExpanded] = useState({});
  const toggleExpansion = key => {
    setExpanded(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  return /*#__PURE__*/React.createElement(View, null, Object.keys(data).map(key => /*#__PURE__*/React.createElement(View, {
    key: key,
    style: [styles.item, {
      marginLeft: level * 20
    }]
  }, isObject(data[key]) ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => toggleExpansion(key)
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.text
  }, `${key}: ${expanded[key] ? '↑' : '↓'}`)), expanded[key] && /*#__PURE__*/React.createElement(RenderObject, {
    data: data[key],
    level: level + 1
  })) : /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.text,
    onPress: () => {
      Clipboard.setString(JSON.stringify(data[key]));
    }
  }, /*#__PURE__*/React.createElement(Text, null, `${key}: ${JSON.stringify(data[key])}`), /*#__PURE__*/React.createElement(Text, {
    style: styles.textLip
  }, "Click here to copy ")))));
};
const ReduxLogger = () => {
  const storeData = useSelector(state => state);
  return /*#__PURE__*/React.createElement(ScrollView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(RenderObject, {
    data: storeData,
    level: 0
  }));
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  item: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10
  },
  text: {
    marginBottom: 5
  },
  textLip: {
    marginTop: 3,
    fontSize: 9
  }
});
export default ReduxLogger;
//# sourceMappingURL=redux-logger.js.map