import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from 'react-native';
import NetworkLogger from 'react-native-network-logger';
import KeyValueTable from './aysnc-storage-logger';
import { NavigationLogger } from './navigation-logger';
import ReduxLogger from './redux-logger';

interface AssistiveModalProps {
  visible: boolean;
  close: () => void;
  customNetworkComponent?: React.ReactNode;
  navigationRef?: React.Ref<any>;
}

const NetworkComponent: React.FC = () => {
  return <NetworkLogger />;
};

const DataInLocalComponent: React.FC = () => {
  return <KeyValueTable />;
};

export const AssistiveTouchModal: React.FC<AssistiveModalProps> = (props) => {
  const [activeTab, setActiveTab] = useState<
    'network' | 'data' | 'dataMMKV' | 'navigation' | 'redux'
  >('network');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'network':
        return props.customNetworkComponent ? (
          props.customNetworkComponent
        ) : (
          <NetworkComponent />
        );
      case 'data':
        return <DataInLocalComponent />;
      case 'navigation':
        return <NavigationLogger navigationRef={props.navigationRef} />;
      case 'redux':
        return <ReduxLogger />;
      // case 'dataMMKV':
      //   return <MMKVKeyValueTable />;
      default:
        return null;
    }
  };

  return (
    <Modal transparent={true} animationType={'fade'} visible={props.visible}>
      <View style={styles.containerCard}>
        <View style={styles.card}>
          <TouchableOpacity
            style={{
              height: '5%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 0.5,
            }}
            onPress={props.close}
          >
            <Text>Closes</Text>
          </TouchableOpacity>
          <View style={{ height: 40, width: '100%' }}>
            <ScrollView
              contentContainerStyle={styles.tabBar}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === 'network' && styles.activeTab,
                ]}
                onPress={() => setActiveTab('network')}
              >
                <Text style={styles.tabText}>Network</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'data' && styles.activeTab]}
                onPress={() => setActiveTab('data')}
              >
                <Text style={styles.tabText}>AsyncStorage</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === 'navigation' && styles.activeTab,
                ]}
                onPress={() => setActiveTab('navigation')}
              >
                <Text style={styles.tabText}>Navigation</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'redux' && styles.activeTab]}
                onPress={() => setActiveTab('redux')}
              >
                <Text style={styles.tabText}>Redux</Text>
              </TouchableOpacity>
              {/*<TouchableOpacity*/}
              {/*  style={[styles.tab, activeTab === 'dataMMKV' && styles.activeTab]}*/}
              {/*  onPress={() => setActiveTab('dataMMKV')}*/}
              {/*>*/}
              {/*  <Text style={styles.tabText}>MMKV</Text>*/}
              {/*</TouchableOpacity>*/}
            </ScrollView>
          </View>
          {renderTabContent()}
        </View>
      </View>
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
  containerCard: {
    alignSelf: 'stretch',
    height: '100%',
    width: '100%',
    backgroundColor: 'grey',
  },
  card: {
    alignSelf: 'stretch',
    height: '80%',
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
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  tabText: {
    fontSize: 16,
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
