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
const KeyValueTable = () => {
  const [data, setData] = (0, _react.useState)([]);
  const [editingKey, setEditingKey] = (0, _react.useState)(null);
  const [newValue, setNewValue] = (0, _react.useState)('');
  (0, _react.useEffect)(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const keys = await _asyncStorage.default.getAllKeys();
      const items = await _asyncStorage.default.multiGet(keys);
      const formattedData = items.map(([key, value]) => ({
        key,
        value
      }));
      // @ts-ignore
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
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
    multiline: true // Cho phép nhập nhiều dòng
    ,
    numberOfLines: 4 // Số dòng hiển thị ban đầu
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Button, {
    title: "Save",
    onPress: () => handleEdit(item.key)
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Button, {
    title: "Cancel",
    onPress: () => setEditingKey(null)
  })) : /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.cell
  }, item.value)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.actionContainer
  }, editingKey !== item.key && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.Button, {
    title: "Edit",
    onPress: () => {
      setEditingKey(item.key);
      setNewValue(item.value);
    }
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Button, {
    title: "Delete",
    onPress: () => handleDelete(item.key)
  }))));
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.header
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.headerCell
  }, "Key"), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.headerCell
  }, "Value"), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.headerCell
  }, "Actions")), /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    data: data,
    renderItem: renderItem
    // @ts-ignore
    ,
    keyExtractor: item => item.key
  }));
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
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
    // Điều chỉnh chiều cao của TextInput
    textAlignVertical: 'top' // Hiển thị văn bản từ trên xuống
  },
  actionContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
});
var _default = exports.default = KeyValueTable;
//# sourceMappingURL=aysnc-storage-logger.js.map