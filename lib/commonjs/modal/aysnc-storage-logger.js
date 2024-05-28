"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _asyncStorage = _interopRequireDefault(require("@react-native-async-storage/async-storage"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const PAGE_SIZE = 10;
const KeyValueTable = () => {
  const [editingKey, setEditingKey] = (0, _react.useState)(null);
  const [newValue, setNewValue] = (0, _react.useState)('');
  const [searchQuery, setSearchQuery] = (0, _react.useState)('');
  const [filteredData, setFilteredData] = (0, _react.useState)([]);
  const [currentPage, setCurrentPage] = (0, _react.useState)(1);
  const [loading, setLoading] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    fetchData();
  }, []);
  (0, _react.useEffect)(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);
  const fetchData = async () => {
    try {
      setLoading(true);
      const keys = await _asyncStorage.default.getAllKeys();
      const items = await _asyncStorage.default.multiGet(keys);
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
      _reactNative.Alert.alert('Confirm', 'Are you sure you want to delete this item?', [{
        text: 'Cancel',
        style: 'cancel'
      }, {
        text: 'OK',
        onPress: async () => {
          await _asyncStorage.default.removeItem(key);
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
      _reactNative.Alert.alert('Validation', 'New value cannot be empty');
      return;
    }
    try {
      _reactNative.Alert.alert('Confirm', 'Are you sure you want to save changes for this item?', [{
        text: 'Cancel',
        style: 'cancel'
      }, {
        text: 'OK',
        onPress: async () => {
          await _asyncStorage.default.setItem(key, newValue);
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
      const keys = await _asyncStorage.default.getAllKeys();
      const lowerQuery = query.toLowerCase();
      const filteredKeys = keys.filter(key => key.toLowerCase().includes(lowerQuery));
      const filteredItems = await _asyncStorage.default.multiGet(filteredKeys);
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
    const keys = await _asyncStorage.default.getAllKeys();
    const filteredKeys = keys.filter(key => key.toLowerCase().includes(searchQuery.toLowerCase()));
    const pageKeys = filteredKeys.slice(startIndex, startIndex + PAGE_SIZE);
    const items = await _asyncStorage.default.multiGet(pageKeys);
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
  }) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.row
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.cellContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.cell
  }, item.key), editingKey === item.key ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
    style: styles.input,
    value: newValue,
    onChangeText: setNewValue,
    placeholder: "Enter new value",
    multiline: true,
    numberOfLines: 10
  }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.button,
    onPress: () => handleEdit(item.key)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.buttonText
  }, "Save")), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.button,
    onPress: () => setEditingKey(null)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.buttonText
  }, "Cancel"))) : /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.cell,
    numberOfLines: 10,
    ellipsizeMode: 'tail'
  }, item.value)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.actionContainer
  }, editingKey !== item.key && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.button,
    onPress: () => {
      _reactNative.Clipboard.setString(JSON.stringify(item));
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.buttonText
  }, "Copy")), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.button,
    onPress: () => {
      setEditingKey(item.key);
      setNewValue(item.value);
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.buttonText
  }, "Edit")), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.button,
    onPress: () => handleDelete(item.key)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.buttonText
  }, "Delete")))));
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
    style: styles.searchInput,
    value: searchQuery,
    onChangeText: handleSearch,
    placeholder: "Search by key or value"
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.header
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.headerCell
  }, "Key"), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.headerCell
  }, "Value"), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.headerCell
  }, "Actions")), /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    data: filteredData,
    renderItem: renderItem,
    keyExtractor: item => item.key,
    onEndReached: loadMoreData,
    onEndReachedThreshold: 0.5,
    ListFooterComponent: loading ? /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
      size: 'small'
    }) : null
  }));
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  searchInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    borderRadius: 12,
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
var _default = exports.default = KeyValueTable;
//# sourceMappingURL=aysnc-storage-logger.js.map