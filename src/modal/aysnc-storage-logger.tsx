import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PAGE_SIZE = 10;

const KeyValueTable = () => {
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState(null);
  const [newValue, setNewValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, data]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      const formattedData = items.map(([key, value]) => ({ key, value }));
      // @ts-ignore
      setData(formattedData);
      // @ts-ignore
      setFilteredData(formattedData.slice(0, PAGE_SIZE));
      setCurrentPage(1);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (key: any) => {
    try {
      Alert.alert(
        'Confirm',
        'Are you sure you want to delete this item?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              await AsyncStorage.removeItem(key);
              fetchData();
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = async (key: any) => {
    if (newValue.trim() === '') {
      Alert.alert('Validation', 'New value cannot be empty');
      return;
    }

    try {
      Alert.alert(
        'Confirm',
        'Are you sure you want to save changes for this item?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              await AsyncStorage.setItem(key, newValue);
              setEditingKey(null);
              setNewValue('');
              fetchData();
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleSearch = (query: any) => {
    setSearchQuery(query);
    const lowerQuery = query.toLowerCase();
    const filtered = data.filter(
      (item) =>
        // @ts-ignore
        item.key.toLowerCase().includes(lowerQuery) ||
        // @ts-ignore
        item.value.toLowerCase().includes(lowerQuery)
    );
    setFilteredData(filtered.slice(0, PAGE_SIZE));
    setCurrentPage(1);
  };

  const loadMoreData = () => {
    if (loading) return;
    const nextPage = currentPage + 1;
    const startIndex = nextPage * PAGE_SIZE;
    const additionalData = filteredData.concat(
      data.slice(startIndex, startIndex + PAGE_SIZE)
    );
    setFilteredData(additionalData);
    setCurrentPage(nextPage);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.row}>
      <View style={styles.cellContainer}>
        <Text style={styles.cell}>{item.key}</Text>
        {editingKey === item.key ? (
          <>
            <TextInput
              style={styles.input}
              value={newValue}
              onChangeText={setNewValue}
              placeholder="Enter new value"
              multiline={true}
              numberOfLines={4}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleEdit(item.key)}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setEditingKey(null)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.cell}>{item.value}</Text>
        )}
      </View>
      <View style={styles.actionContainer}>
        {editingKey !== item.key && (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setEditingKey(item.key);
                setNewValue(item.value);
              }}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDelete(item.key)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Search by key or value"
      />
      <View style={styles.header}>
        <Text style={styles.headerCell}>Key</Text>
        <Text style={styles.headerCell}>Value</Text>
        <Text style={styles.headerCell}>Actions</Text>
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        // @ts-ignore
        keyExtractor={(item) => item.key}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <Text>Loading...</Text> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  cellContainer: {
    flex: 3,
    flexDirection: 'column',
  },
  cell: {
    padding: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    margin: 8,
    height: 200,
    textAlignVertical: 'top',
  },
  actionContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 8,
    marginVertical: 4,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default KeyValueTable;
