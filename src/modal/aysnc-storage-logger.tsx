import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Clipboard,
  Share,
  Modal,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PAGE_SIZE = 10;

interface KeyValueItem {
  key: string;
  value: string;
}

const KeyValueTable: React.FC = () => {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [newValue, setNewValue] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<KeyValueItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [viewingItem, setViewingItem] = useState<KeyValueItem | null>(null);

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
      const formattedData = items.map(([key, value]) => ({ key, value }));
      // @ts-ignore
      setFilteredData(formattedData.slice(0, PAGE_SIZE));
      setCurrentPage(1);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const formatJSON = (text: string): string => {
    try {
      const parsed = JSON.parse(text);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return text;
    }
  };

  const handleViewFull = (item: KeyValueItem) => {
    setViewingItem(item);
  };

  const handleShare = async (item: KeyValueItem) => {
    try {
      const shareContent = `Key: ${item.key}\nValue: ${item.value}`;
      await Share.share({
        message: shareContent,
        title: 'AsyncStorage Item',
      });
    } catch (error) {
      console.error('Error sharing item:', error);
    }
  };

  const handleDelete = async (key: string) => {
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

  const handleEdit = async (key: string) => {
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

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      fetchData();
      return;
    }

    try {
      setLoading(true);
      const keys = await AsyncStorage.getAllKeys();
      const lowerQuery = query.toLowerCase();
      const filteredKeys = keys.filter((key) =>
        key.toLowerCase().includes(lowerQuery)
      );
      const filteredItems = await AsyncStorage.multiGet(filteredKeys);
      const formattedData = filteredItems.map(([key, value]) => ({
        key,
        value,
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
    setLoading(true);
    const nextPage = currentPage + 1;
    const startIndex = nextPage * PAGE_SIZE;
    const keys = await AsyncStorage.getAllKeys();
    let filteredKeys = keys;
    if (searchQuery.trim() !== '') {
      filteredKeys = keys.filter((key) =>
        key.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    const pageKeys = filteredKeys.slice(startIndex, startIndex + PAGE_SIZE);
    const items = await AsyncStorage.multiGet(pageKeys);
    const additionalData = items.map(([key, value]) => ({ key, value }));
    setLoading(false);
    // @ts-ignore
    setFilteredData((prevData) => [...prevData, ...additionalData]);
    setCurrentPage(nextPage);
  };

  const renderItem = ({ item }: { item: KeyValueItem }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.keyText} numberOfLines={1} ellipsizeMode="tail">
          {item.key}
        </Text>
        {editingKey !== item.key && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleShare(item)}
            >
              <Text style={styles.iconButtonText}>📤</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                Clipboard.setString(JSON.stringify(item));
                Alert.alert('Copied', 'Item copied to clipboard');
              }}
            >
              <Text style={styles.iconButtonText}>📋</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                setEditingKey(item.key);
                setNewValue(item.value);
              }}
            >
              <Text style={styles.iconButtonText}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconButton, styles.deleteButton]}
              onPress={() => handleDelete(item.key)}
            >
              <Text style={styles.iconButtonText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.cardBody}>
        {editingKey === item.key ? (
          <>
            <TextInput
              style={styles.input}
              value={newValue}
              onChangeText={setNewValue}
              placeholder="Enter new value"
              multiline={true}
              numberOfLines={8}
              textAlignVertical="top"
            />
            <View style={styles.editActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.saveButton]}
                onPress={() => handleEdit(item.key)}
              >
                <Text style={styles.actionButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => setEditingKey(null)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <TouchableOpacity
            style={styles.valueContainer}
            onPress={() => handleViewFull(item)}
            activeOpacity={0.7}
          >
            <Text style={styles.valueText} numberOfLines={8} ellipsizeMode="tail">
              {item.value || '(empty)'}
            </Text>
            {item.value.length > 200 && (
              <Text style={styles.truncatedText}>
                Tap to view full ({item.value.length} characters)
              </Text>
            )}
            {item.value.length <= 200 && item.value && (
              <Text style={styles.tapHint}>Tap to view formatted</Text>
            )}
          </TouchableOpacity>
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
        placeholder="🔍 Search by key..."
        placeholderTextColor="#9CA3AF"
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#007AFF" />
            </View>
          ) : null
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <Modal
        visible={viewingItem !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setViewingItem(null)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Value Details</Text>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setViewingItem(null)}
            >
              <Text style={styles.closeModalText}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalKeyContainer}>
            <Text style={styles.modalKeyLabel}>Key:</Text>
            <Text style={styles.modalKeyText}>{viewingItem?.key}</Text>
          </View>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalValueLabel}>Value (Formatted):</Text>
            <Text style={styles.modalValueText}>
              {viewingItem ? formatJSON(viewingItem.value) : ''}
            </Text>
          </ScrollView>
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalActionButton, styles.modalActionButtonWithMargin]}
              onPress={() => {
                if (viewingItem) {
                  Clipboard.setString(viewingItem.value);
                  Alert.alert('Copied', 'Value copied to clipboard');
                }
              }}
            >
              <Text style={styles.modalActionButtonText}>📋 Copy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalActionButton}
              onPress={() => {
                if (viewingItem) {
                  handleShare(viewingItem);
                }
              }}
            >
              <Text style={styles.modalActionButtonText}>📤 Share</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    backgroundColor: '#F8F9FA',
    borderColor: '#E9ECEF',
    borderWidth: 1,
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    margin: 16,
    marginBottom: 12,
    fontSize: 14,
    color: '#000000',
    height: 40,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F5',
  },
  keyText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginRight: 8,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    marginLeft: 6,
  },
  deleteButton: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FEE2E2',
  },
  iconButtonText: {
    fontSize: 16,
  },
  cardBody: {
    minHeight: 60,
  },
  valueContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    minHeight: 60,
  },
  valueText: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 20,
    fontFamily: 'monospace',
  },
  truncatedText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#007AFF',
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    minHeight: 150,
    fontSize: 13,
    color: '#000000',
    fontFamily: 'monospace',
    marginBottom: 12,
  },
  editActions: {
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  cancelButton: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  tapHint: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
    fontStyle: 'italic',
    textAlign: 'right',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  closeModalButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  closeModalText: {
    fontSize: 18,
    color: '#374151',
    fontWeight: '600',
  },
  modalKeyContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    backgroundColor: '#F8F9FA',
  },
  modalKeyLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6C757D',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  modalKeyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  modalValueLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6C757D',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  modalValueText: {
    fontSize: 13,
    color: '#374151',
    fontFamily: 'monospace',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    lineHeight: 20,
  },
  modalActions: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  modalActionButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalActionButtonWithMargin: {
    marginRight: 12,
  },
  modalActionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default KeyValueTable;
