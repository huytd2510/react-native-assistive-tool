import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Alert, TouchableOpacity, ActivityIndicator, Clipboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PAGE_SIZE = 10;
const KeyValueTable = () => {
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
  }, [searchQuery]);
  const fetchData = async () => {
    try {
      setLoading(true);
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      const formattedData = items.map(([key, value]) => ({
        key,
        value
      }));
      // @ts-ignore
      setFilteredData(formattedData.slice(0, PAGE_SIZE));
      setCurrentPage(1);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  const handleDelete = async key => {
    try {
      Alert.alert('Confirm', 'Are you sure you want to delete this item?', [{
        text: 'Cancel',
        style: 'cancel'
      }, {
        text: 'OK',
        onPress: async () => {
          await AsyncStorage.removeItem(key);
          fetchData();
        }
      }], {
        cancelable: false
      });
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  const handleEdit = async key => {
    if (newValue.trim() === '') {
      Alert.alert('Validation', 'New value cannot be empty');
      return;
    }
    try {
      Alert.alert('Confirm', 'Are you sure you want to save changes for this item?', [{
        text: 'Cancel',
        style: 'cancel'
      }, {
        text: 'OK',
        onPress: async () => {
          await AsyncStorage.setItem(key, newValue);
          setEditingKey(null);
          setNewValue('');
          fetchData();
        }
      }], {
        cancelable: false
      });
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };
  const handleSearch = async query => {
    setSearchQuery(query);
    if (query.trim() === '') {
      fetchData();
      return;
    }
    try {
      setLoading(true);
      const keys = await AsyncStorage.getAllKeys();
      const lowerQuery = query.toLowerCase();
      const filteredKeys = keys.filter(key => key.toLowerCase().includes(lowerQuery));
      const filteredItems = await AsyncStorage.multiGet(filteredKeys);
      const formattedData = filteredItems.map(([key, value]) => ({
        key,
        value
      }));

      // @ts-ignore
      setFilteredData(formattedData.slice(0, PAGE_SIZE));
      setCurrentPage(1);
      setLoading(false);
    } catch (error) {
      console.error('Error searching data:', error);
      setLoading(false);
    }
  };
  const loadMoreData = async () => {
    if (loading) return;
    const nextPage = currentPage + 1;
    const startIndex = nextPage * PAGE_SIZE;
    const keys = await AsyncStorage.getAllKeys();
    const filteredKeys = keys.filter(key => key.toLowerCase().includes(searchQuery.toLowerCase()));
    const pageKeys = filteredKeys.slice(startIndex, startIndex + PAGE_SIZE);
    const items = await AsyncStorage.multiGet(pageKeys);
    const additionalData = items.map(([key, value]) => ({
      key,
      value
    }));

    // @ts-ignore
    setFilteredData(prevData => [...prevData, ...additionalData]);
    setCurrentPage(nextPage);
  };
  const renderItem = ({
    item
  }) => /*#__PURE__*/React.createElement(View, {
    style: styles.row
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.cellContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.cell
  }, item.key), editingKey === item.key ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TextInput, {
    style: styles.input,
    value: newValue,
    onChangeText: setNewValue,
    placeholder: "Enter new value",
    multiline: true,
    numberOfLines: 10
  }), /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.button,
    onPress: () => handleEdit(item.key)
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.buttonText
  }, "Save")), /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.button,
    onPress: () => setEditingKey(null)
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.buttonText
  }, "Cancel"))) : /*#__PURE__*/React.createElement(Text, {
    style: styles.cell,
    numberOfLines: 10,
    ellipsizeMode: 'tail'
  }, item.value)), /*#__PURE__*/React.createElement(View, {
    style: styles.actionContainer
  }, editingKey !== item.key && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.button,
    onPress: () => {
      Clipboard.setString(JSON.stringify(item));
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.buttonText
  }, "Copy")), /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.button,
    onPress: () => {
      setEditingKey(item.key);
      setNewValue(item.value);
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.buttonText
  }, "Edit")), /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.button,
    onPress: () => handleDelete(item.key)
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.buttonText
  }, "Delete")))));
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(TextInput, {
    style: styles.searchInput,
    value: searchQuery,
    onChangeText: handleSearch,
    placeholder: "Search by key or value"
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.header
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.headerCell
  }, "Key"), /*#__PURE__*/React.createElement(Text, {
    style: styles.headerCell
  }, "Value"), /*#__PURE__*/React.createElement(Text, {
    style: styles.headerCell
  }, "Actions")), /*#__PURE__*/React.createElement(FlatList, {
    data: filteredData,
    renderItem: renderItem,
    keyExtractor: item => item.key,
    onEndReached: loadMoreData,
    onEndReachedThreshold: 0.5,
    ListFooterComponent: loading ? /*#__PURE__*/React.createElement(ActivityIndicator, {
      size: 'small'
    }) : null
  }));
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  searchInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000'
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    padding: 8
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center'
  },
  cellContainer: {
    flex: 3,
    flexDirection: 'column'
  },
  cell: {
    padding: 8
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    margin: 8,
    height: 200,
    textAlignVertical: 'top',
    color: 'black'
  },
  actionContainer: {
    flex: 1,
    height: '100%',
    paddingTop: 20,
    flexDirection: 'column'
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 8,
    marginVertical: 4,
    borderRadius: 4
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center'
  }
});
export default KeyValueTable;
//# sourceMappingURL=aysnc-storage-logger.js.map