import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard,
} from 'react-native';
import React, { useState } from 'react';

export interface NavigationLoggerProps {
  navigationRef?: React.Ref<any>;
}
export const NavigationLogger = (props: NavigationLoggerProps) => {
  // @ts-ignore
  const data = props.navigationRef?.current?.getRootState().routes;

  const [expandedIndexes, setExpandedIndexes] = useState({});

  const toggleExpansion = (key: any) => {
    setExpandedIndexes((prevIndexes) => ({
      ...prevIndexes,
      // @ts-ignore
      [key]: !prevIndexes[key],
    }));
  };

  const renderNestedItems = (item: any, level = 0) => {
    // @ts-ignore
    const isExpanded = expandedIndexes[item.key];
    return (
      <View key={item.key} style={[styles.item, { marginLeft: level * 20 }]}>
        <TouchableOpacity onPress={() => toggleExpansion(item.key)}>
          <Text style={styles.text}>{`Name: ${item.name}`}</Text>
        </TouchableOpacity>
        {isExpanded && item.state && item.state.routes && (
          <View style={styles.routesContainer}>
            <Text style={styles.routesTitle}>Routes:</Text>
            {
              // @ts-ignore
              item.state.routes.map((route) =>
                renderNestedItems(route, level + 1)
              )
            }
          </View>
        )}
        {isExpanded && item.params && (
          <Text
            style={styles.text}
          >{`Params: ${JSON.stringify(item.params)}`}</Text>
        )}
      </View>
    );
  };
  if (!data) {
    return (
      <View>
        <Text>Can't show navigation stack</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'white', padding: 5, paddingRight: 20}}>
        <TouchableOpacity
          onPress={() => {
            // @ts-ignore
            Clipboard.setString(JSON.stringify(data));
          }}
        >
          <Text style={{ color: 'blue', opacity: 0.7 }}>
            Copy current stack in navigation
          </Text>
        </TouchableOpacity>
      </View>
      {data.map((item: any) => renderNestedItems(item))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  text: {
    marginBottom: 5,
  },
  routesContainer: {
    marginLeft: 10,
  },
  routesTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
