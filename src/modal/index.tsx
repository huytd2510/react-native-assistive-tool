import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Animated,
  Dimensions,
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
  tabs?: string[];
}

const NetworkComponent: React.FC = () => {
  return <NetworkLogger />;
};

const DataInLocalComponent: React.FC = () => {
  return <KeyValueTable />;
};

const DEFAULT_TABS = ['network', 'data', 'navigation', 'redux'];

export const AssistiveTouchModal: React.FC<AssistiveModalProps> = (props) => {
  const [activeTab, setActiveTab] = useState<string>(
    props.tabs?.[0] || DEFAULT_TABS[0] || 'network'
  );
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get('window').height)
  ).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [listTabDebug, setListTabDebug] = useState<string[]>(
    props.tabs || DEFAULT_TABS
  );

  useEffect(() => {
    if (props.debugAddOnView) {
      const keys = props.debugAddOnView.map((item) => item.title);
      setListTabDebug((prev) => [...prev, ...keys]);
    }
  }, [props.debugAddOnView]);

  useEffect(() => {
    if (props.visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: Dimensions.get('window').height,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [props.visible, slideAnim, fadeAnim]);

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
        key={title}
        style={[styles.tab, activeTab === title && styles.activeTab]}
        onPress={() => setActiveTab(title)}
      >
        <Text style={styles.tabText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  if (!props.visible) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[
          styles.overlayBackground,
          {
            opacity: fadeAnim,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.modalContainer,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.containerCard}>
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={props.close}
              >
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
              <View style={styles.tabContainer}>
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
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  overlayBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
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
    color: '#000000',
  },
  closeText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  tabContent: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
  },
  closeButton: {
    height: '7%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  tabContainer: {
    height: '6%',
    width: '100%',
  },
});

export default AssistiveTouchModal;
