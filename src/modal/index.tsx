import React, { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import NetworkLogger from 'react-native-network-logger';
import KeyValueTable from './aysnc-storage-logger';
import { NavigationLogger } from './navigation-logger';
import ReduxLogger from './redux-logger';
import type { DebugAddOnView } from '../assistive/assistive-cmp';

interface AssistiveModalProps {
  visible: boolean;
  close: () => void;
  customNetworkComponent?: React.ReactNode;
  navigationRef?: React.Ref<any>;
  debugAddOnView?: DebugAddOnView[];
}

const NetworkComponent: React.FC = () => {
  return <NetworkLogger />;
};

const DataInLocalComponent: React.FC = () => {
  return <KeyValueTable />;
};

export const AssistiveTouchModal: React.FC<AssistiveModalProps> = (props) => {
  const [activeTab, setActiveTab] = useState<string>('network');

  const [listTabDebug, setListTabDebug] = useState<string[]>([
    'network',
    'data',
    'navigation',
    'redux',
  ]);

  useEffect(() => {
    if (props.debugAddOnView) {
      const keys = props.debugAddOnView.map((item) => item.title);
      setListTabDebug([...listTabDebug, ...keys]);
    }
  }, []);

  const renderTabContent = () => {
    if (!activeTab) return null;
    let debugView = null;
    switch (activeTab) {
      case 'network': {
        if (props.customNetworkComponent) {
          debugView = props.customNetworkComponent;
        } else {
          debugView = <NetworkComponent />;
        }
        break;
      }
      case 'data': {
        debugView = <DataInLocalComponent />;
        break;
      }
      case 'navigation': {
        debugView = <NavigationLogger navigationRef={props.navigationRef} />;
        break;
      }
      case 'redux': {
        debugView = <ReduxLogger />;
        break;
      }
    }
    if (props.debugAddOnView) {
      const view = props.debugAddOnView.find(
        (item) => item.title === activeTab
      );
      if (view) {
        debugView = view.component;
      }
    }
    return debugView;
  };

  const renderItem = (title: string) => {
    return (
      <TouchableOpacity
        style={[styles.tab, activeTab === title && styles.activeTab]}
        onPress={() => setActiveTab(title)}
      >
        <Text style={styles.tabText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal transparent={true} animationType={'fade'} visible={props.visible}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.containerCard}>
          <View style={styles.card}>
            <TouchableOpacity
              style={{
                height: '7%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 0.5,
              }}
              onPress={props.close}
            >
              <Text>Close</Text>
            </TouchableOpacity>
            <View style={{ height: '6%', width: '100%' }}>
              <ScrollView
                contentContainerStyle={styles.tabBar}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {listTabDebug.map((item) => renderItem(item))}
              </ScrollView>
            </View>
            <View style={styles.contentView}>{renderTabContent()}</View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentView: {
    height: '85%',
    borderTopWidth: 0.5,
    borderTopColor: 'grey',
  },
  containerCard: {
    alignSelf: 'stretch',
    height: '100%',
    width: '100%',
    backgroundColor: 'grey',
  },
  card: {
    alignSelf: 'stretch',
    height: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 20,
  },
  tabBar: {
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 40,
    backgroundColor: 'row',
  },
  tab: {
    padding: 10,
    paddingVertical: 6,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  tabText: {
    fontSize: 14,
  },
  tabContent: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AssistiveTouchModal;
