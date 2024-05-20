import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const KeyValueTable = () => {
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState(null);
  const [newValue, setNewValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    handleSearch(searchQuery);
  }, [data, searchQuery]);
  const fetchData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      const formattedData = items.map(([key, value]) => ({
        key,
        value
      }));
      // @ts-ignore
      setData(formattedData);
      // @ts-ignore
      setFilteredData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
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
  const handleSearch = query => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
      // @ts-ignore
      item => item.key.includes(query) || item.value.includes(query));
      setFilteredData(filtered);
    }
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
    numberOfLines: 4
  }), /*#__PURE__*/React.createElement(Button, {
    title: "Save",
    onPress: () => handleEdit(item.key)
  }), /*#__PURE__*/React.createElement(Button, {
    title: "Cancel",
    onPress: () => setEditingKey(null)
  })) : /*#__PURE__*/React.createElement(Text, {
    style: styles.cell
  }, item.value)), /*#__PURE__*/React.createElement(View, {
    style: styles.actionContainer
  }, editingKey !== item.key && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    title: "Edit",
    onPress: () => {
      setEditingKey(item.key);
      setNewValue(item.value);
    }
  }), /*#__PURE__*/React.createElement(Button, {
    title: "Delete",
    onPress: () => handleDelete(item.key)
  }))));
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
    renderItem: renderItem
    // @ts-ignore
    ,
    keyExtractor: item => item.key
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
    textAlignVertical: 'top'
  },
  actionContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
});
export default KeyValueTable;
//# sourceMappingURL=aysnc-storage-logger.js.map