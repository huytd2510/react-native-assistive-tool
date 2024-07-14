import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, Text, View, ScrollView, SafeAreaView } from 'react-native';
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
  const [listTabDebug, setListTabDebug] = useState(['network', 'data', 'navigation', 'redux']);
  useEffect(() => {
    if (props.debugAddOnView) {
      const keys = props.debugAddOnView.map(item => item.title);
      setListTabDebug([...listTabDebug, ...keys]);
    }
  }, []);
  const renderTabContent = () => {
    if (!activeTab) return null;
    let debugView = null;
    switch (activeTab) {
      case 'network':
        {
          if (props.customNetworkComponent) {
            debugView = props.customNetworkComponent;
          } else {
            debugView = /*#__PURE__*/React.createElement(NetworkComponent, null);
          }
          break;
        }
      case 'data':
        {
          debugView = /*#__PURE__*/React.createElement(DataInLocalComponent, null);
          break;
        }
      case 'navigation':
        {
          debugView = /*#__PURE__*/React.createElement(NavigationLogger, {
            navigationRef: props.navigationRef
          });
          break;
        }
      case 'redux':
        {
          debugView = /*#__PURE__*/React.createElement(ReduxLogger, null);
          break;
        }
    }
    if (props.debugAddOnView) {
      const view = props.debugAddOnView.find(item => item.title === activeTab);
      if (view) {
        debugView = view.component;
      }
    }
    return debugView;
  };
  const renderItem = title => {
    return /*#__PURE__*/React.createElement(TouchableOpacity, {
      style: [styles.tab, activeTab === title && styles.activeTab],
      onPress: () => setActiveTab(title)
    }, /*#__PURE__*/React.createElement(Text, {
      style: styles.tabText
    }, title));
  };
  return /*#__PURE__*/React.createElement(Modal, {
    transparent: true,
    animationType: 'fade',
    visible: props.visible
  }, /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.containerCard
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.card
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: {
      height: '7%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 0.5
    },
    onPress: props.close
  }, /*#__PURE__*/React.createElement(Text, null, "Close")), /*#__PURE__*/React.createElement(View, {
    style: {
      height: '6%',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(ScrollView, {
    contentContainerStyle: styles.tabBar,
    horizontal: true,
    showsHorizontalScrollIndicator: false
  }, listTabDebug.map(item => renderItem(item)))), /*#__PURE__*/React.createElement(View, {
    style: styles.contentView
  }, renderTabContent())))));
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  contentView: {
    height: '85%',
    borderTopWidth: 0.5,
    borderTopColor: 'grey'
  },
  containerCard: {
    alignSelf: 'stretch',
    height: '100%',
    width: '100%',
    backgroundColor: 'grey'
  },
  card: {
    alignSelf: 'stretch',
    height: '90%',
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
    padding: 10,
    paddingVertical: 6
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue'
  },
  tabText: {
    fontSize: 14
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