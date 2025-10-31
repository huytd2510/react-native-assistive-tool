// ReduxLogger.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Clipboard,
} from 'react-native';
import { useSelector } from 'react-redux';

const isObject = (item: any) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

const RenderObject: React.FC<{ data: any; level: number }> = ({
  data,
  level,
}) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleExpansion = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View>
      {Object.keys(data).map((key) => (
        <View key={key} style={[styles.item, { marginLeft: level * 20 }]}>
          {isObject(data[key]) ? (
            <>
              <TouchableOpacity onPress={() => toggleExpansion(key)}>
                <Text
                  style={styles.text}
                >{`${key}: ${expanded[key] ? '↑' : '↓'}`}</Text>
              </TouchableOpacity>
              {expanded[key] && (
                <RenderObject data={data[key]} level={level + 1} />
              )}
            </>
          ) : (
            <TouchableOpacity
              style={styles.text}
              onPress={() => {
                Clipboard.setString(JSON.stringify(data[key]));
              }}
            >
              <Text>{`${key}: ${JSON.stringify(data[key])}`}</Text>
              <Text style={styles.textLip}>Click here to copy </Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
};

const ReduxLogger: React.FC = () => {
  const storeData = useSelector((state) => state);

  return (
    <ScrollView style={styles.container}>
      <RenderObject data={storeData} level={0} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  textLip: {
    marginTop: 3,
    fontSize: 9,
  },
});

export default ReduxLogger;
