import { StyleSheet, Text, TouchableOpacity, View, Clipboard } from 'react-native';
import React, { useState } from 'react';
export const NavigationLogger = props => {
  var _props$navigationRef;
  // @ts-ignore
  const data = (_props$navigationRef = props.navigationRef) === null || _props$navigationRef === void 0 || (_props$navigationRef = _props$navigationRef.current) === null || _props$navigationRef === void 0 ? void 0 : _props$navigationRef.getRootState().routes;
  const [expandedIndexes, setExpandedIndexes] = useState({});
  const toggleExpansion = key => {
    setExpandedIndexes(prevIndexes => ({
      ...prevIndexes,
      // @ts-ignore
      [key]: !prevIndexes[key]
    }));
  };
  const renderNestedItems = (item, level = 0) => {
    // @ts-ignore
    const isExpanded = expandedIndexes[item.key];
    return /*#__PURE__*/React.createElement(View, {
      key: item.key,
      style: [styles.item, {
        marginLeft: level * 20
      }]
    }, /*#__PURE__*/React.createElement(TouchableOpacity, {
      onPress: () => toggleExpansion(item.key)
    }, /*#__PURE__*/React.createElement(Text, {
      style: styles.text
    }, `Name: ${item.name}`)), isExpanded && item.state && item.state.routes && /*#__PURE__*/React.createElement(View, {
      style: styles.routesContainer
    }, /*#__PURE__*/React.createElement(Text, {
      style: styles.routesTitle
    }, "Routes:"),
    // @ts-ignore
    item.state.routes.map(route => renderNestedItems(route, level + 1))), isExpanded && item.params && /*#__PURE__*/React.createElement(Text, {
      style: styles.text
    }, `Params: ${JSON.stringify(item.params)}`));
  };
  if (!data) {
    return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, null, "Can't show navigation stack"));
  }
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      backgroundColor: 'white',
      padding: 5,
      paddingRight: 20
    }
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => {
      // @ts-ignore
      Clipboard.setString(JSON.stringify(data));
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      color: 'blue',
      opacity: 0.7
    }
  }, "Copy current stack in navigation"))), data.map(item => renderNestedItems(item)));
};
const styles = StyleSheet.create({
  container: {
    flex: 1
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
  routesContainer: {
    marginLeft: 10
  },
  routesTitle: {
    fontWeight: 'bold',
    marginBottom: 5
  }
});
//# sourceMappingURL=navigation-logger.js.map