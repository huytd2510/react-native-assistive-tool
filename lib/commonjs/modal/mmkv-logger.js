// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, Button, TextInput, Alert } from 'react-native';
// import MMKVStorage from 'react-native-mmkv-storage';
//
// const MMKVKeyValueTable = () => {
//   const [data, setData] = useState([]);
//   const [editingKey, setEditingKey] = useState(null);
//   const [newValue, setNewValue] = useState('');
//   const mmkv = new MMKVStorage.Loader().initialize();
//
//   useEffect(() => {
//     fetchData();
//   }, []);
//
//   const fetchData = async () => {
//     try {
//       const keys = await mmkv.getAllKeys();
//       const items = await mmkv.multiGet(keys);
//       const formattedData = items.map(([key, value]) => ({
//         key,
//         value,
//       }));
//       setData(formattedData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//
//   const handleDelete = async (key) => {
//     try {
//       Alert.alert(
//         'Confirm',
//         'Are you sure you want to delete this item?',
//         [
//           {
//             text: 'Cancel',
//             style: 'cancel',
//           },
//           {
//             text: 'OK',
//             onPress: async () => {
//               await mmkv.removeItem(key);
//               fetchData();
//             },
//           },
//         ],
//         { cancelable: false }
//       );
//     } catch (error) {
//       console.error('Error deleting item:', error);
//     }
//   };
//
//   const handleEdit = async (key) => {
//     if (newValue.trim() === '') {
//       Alert.alert('Validation', 'New value cannot be empty');
//       return;
//     }
//
//     try {
//       Alert.alert(
//         'Confirm',
//         'Are you sure you want to save changes for this item?',
//         [
//           {
//             text: 'Cancel',
//             style: 'cancel',
//           },
//           {
//             text: 'OK',
//             onPress: async () => {
//               await mmkv.setItem(key, newValue);
//               setEditingKey(null);
//               setNewValue('');
//               fetchData();
//             },
//           },
//         ],
//         { cancelable: false }
//       );
//     } catch (error) {
//       console.error('Error updating item:', error);
//     }
//   };
//
//   const renderItem = ({ item }) => (
//     <View style={styles.row}>
//       <View style={styles.cellContainer}>
//         <Text style={styles.cell}>{item.key}</Text>
//         {editingKey === item.key ? (
//           <>
//             <TextInput
//               style={styles.input}
//               value={newValue}
//               onChangeText={setNewValue}
//               placeholder="Enter new value"
//               multiline={true}
//               numberOfLines={4}
//             />
//             <Button title="Save" onPress={() => handleEdit(item.key)} />
//             <Button title="Cancel" onPress={() => setEditingKey(null)} />
//           </>
//         ) : (
//           <Text style={styles.cell}>{item.value}</Text>
//         )}
//       </View>
//       <View style={styles.actionContainer}>
//         {editingKey !== item.key && (
//           <>
//             <Button title="Edit" onPress={() => { setEditingKey(item.key); setNewValue(item.value); }} />
//             <Button title="Delete" onPress={() => handleDelete(item.key)} />
//           </>
//         )}
//       </View>
//     </View>
//   );
//
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerCell}>Key</Text>
//         <Text style={styles.headerCell}>Value</Text>
//         <Text style={styles.headerCell}>Actions</Text>
//       </View>
//       <FlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.key}
//       />
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderBottomColor: '#000',
//   },
//   headerCell: {
//     flex: 1,
//     fontWeight: 'bold',
//     padding: 8,
//   },
//   row: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//     alignItems: 'center',
//   },
//   cellContainer: {
//     flex: 3,
//     flexDirection: 'column',
//   },
//   cell: {
//     padding: 8,
//   },
//   input: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     padding: 8,
//     margin: 8,
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   actionContainer: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//   },
// });
//
// export default MMKVKeyValueTable;
"use strict";
//# sourceMappingURL=mmkv-logger.js.map