import React, { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import NetworkLogger from 'react-native-network-logger';
import KeyValueTable from './aysnc-storage-logger';
import { NavigationLogger } from './navigation-logger';
import ReduxLogger from './redux-logger';
const NetworkComponent = () => {
  return /*#__PURE__*/React.createElement(NetworkLogger, null);
};
const DataInLocalComponent = () => {
  return /*#__PURE__*/React.createElement(KeyValueTable, null);
};
export const AssistiveTouchModal = props => {
  const [activeTab, setActiveTab] = useState('network');
  const renderTabContent = () => {
    switch (activeTab) {
      case 'network':
        return props.customNetworkComponent ? props.customNetworkComponent : /*#__PURE__*/React.createElement(NetworkComponent, null);
      case 'data':
        return /*#__PURE__*/React.createElement(DataInLocalComponent, null);
      case 'navigation':
        return /*#__PURE__*/React.createElement(NavigationLogger, {
          navigationRef: props.navigationRef
        });
      case 'redux':
        return /*#__PURE__*/React.createElement(ReduxLogger, null);
      // case 'dataMMKV':
      //   return <MMKVKeyValueTable />;
      default:
        return null;
    }
  };
  return /*#__PURE__*/React.createElement(Modal, {
    transparent: true,
    animationType: 'fade',
    visible: props.visible
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.containerCard
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.card
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: {
      height: '5%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 0.5
    },
    onPress: props.close
  }, /*#__PURE__*/React.createElement(Text, null, "Closes")), /*#__PURE__*/React.createElement(View, {
    style: {
      height: 40,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(ScrollView, {
    contentContainerStyle: styles.tabBar,
    horizontal: true,
    showsHorizontalScrollIndicator: false
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: [styles.tab, activeTab === 'network' && styles.activeTab],
    onPress: () => setActiveTab('network')
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.tabText
  }, "Network")), /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: [styles.tab, activeTab === 'data' && styles.activeTab],
    onPress: () => setActiveTab('data')
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.tabText
  }, "AsyncStorage")), /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: [styles.tab, activeTab === 'navigation' && styles.activeTab],
    onPress: () => setActiveTab('navigation')
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.tabText
  }, "Navigation")), /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: [styles.tab, activeTab === 'redux' && styles.activeTab],
    onPress: () => setActiveTab('redux')
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.tabText
  }, "Redux")))), renderTabContent())));
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  containerCard: {
    alignSelf: 'stretch',
    height: '100%',
    width: '100%',
    backgroundColor: 'grey'
  },
  card: {
    alignSelf: 'stretch',
    height: '95%',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 20
  },
  tabBar: {
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 40,
    backgroundColor: 'row'
  },
  tab: {
    padding: 10
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue'
  },
  tabText: {
    fontSize: 16
  },
  tabContent: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default AssistiveTouchModal;
//# sourceMappingURL=index.js.map