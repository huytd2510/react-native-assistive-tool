import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Animated,
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
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [listTabDebug, setListTabDebug] = useState<string[]>(() => {
    const baseTabs = props.tabs || DEFAULT_TABS;
    if (props.debugAddOnView) {
      const keys = props.debugAddOnView.map((item) => item.title);
      return [...baseTabs, ...keys];
    }
    return baseTabs;
  });

  useEffect(() => {
    if (props.debugAddOnView) {
      const keys = props.debugAddOnView.map((item) => item.title);
      setListTabDebug((prev) => {
        // Chỉ thêm keys mới, không thêm duplicate
        const existingKeys = new Set(prev);
        const newKeys = keys.filter((key) => !existingKeys.has(key));
        return newKeys.length > 0 ? [...prev, ...newKeys] : prev;
      });
    }
  }, [props.debugAddOnView]);

  useEffect(() => {
    if (props.visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
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
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
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
    const isActive = activeTab === title;
    return (
      <TouchableOpacity
        key={title}
        style={[styles.tab, isActive && styles.activeTab]}
        onPress={() => setActiveTab(title)}
        activeOpacity={0.7}
      >
        <Text style={[styles.tabText, isActive && styles.activeTabText]}>
          {title}
        </Text>
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
            opacity: fadeAnim,
            transform: [
              {
                scale: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.9, 1],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.card}>
          <SafeAreaView style={styles.safeArea}>
            <TouchableOpacity style={styles.closeButton} onPress={props.close}>
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
          </SafeAreaView>
        </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  contentView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  card: {
    width: '100%',
    height: '95%',
    maxHeight: '95%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 16,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 6,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    minHeight: 44,
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginHorizontal: 3,
    borderRadius: 16,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  closeText: {
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '600',
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
    width: '100%',
  },
  closeButton: {
    height: 44,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  tabContainer: {
    backgroundColor: '#F8F9FA',
  },
});

export default AssistiveTouchModal;
