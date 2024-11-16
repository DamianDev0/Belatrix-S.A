import React from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types/navigation.types';
import useVehicleMaintenance from './hooks/useMaintenace';
import Icon from 'react-native-vector-icons/Ionicons';

type MaintenanceScreenRouteProp = RouteProp<RootStackParamList, 'Maintenance'>;

const MaintenanceScreen = () => {
  const route = useRoute<MaintenanceScreenRouteProp>();
  const {vehicleId} = route.params;

  const {
    maintenanceData,
    loading,
    error,
    creating,
    creationError,
    modalVisible,
    setModalVisible,
    newMaintenance,
    handleCreateMaintenance,
    handleChange,
  } = useVehicleMaintenance(vehicleId);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!maintenanceData || maintenanceData.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No maintenance records found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Maintenance History</Text>

      <Icon
        name="add-circle"
        size={50}
        color="green"
        onPress={() => setModalVisible(true)}
      />

      <FlatList
        data={maintenanceData}
        keyExtractor={item => item.id?.toString() ?? 'undefined'}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.type}>{item.type}</Text>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.mileage}>Mileage: {item.mileage}</Text>
            <Text style={styles.notes}>Notes: {item.notes}</Text>
          </View>
        )}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Maintenance</Text>

          <TextInput
            style={styles.input}
            placeholder="Type"
            value={newMaintenance.type}
            onChangeText={text => handleChange('type', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Date"
            value={newMaintenance.date}
            onChangeText={text => handleChange('date', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Mileage"
            value={String(newMaintenance.mileage)}
            onChangeText={text => handleChange('mileage', parseInt(text))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Notes"
            value={newMaintenance.notes}
            onChangeText={text => handleChange('notes', text)}
          />

          {creationError && <Text style={styles.error}>{creationError}</Text>}

          <Button
            title="Save"
            onPress={handleCreateMaintenance}
            disabled={creating}
          />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  type: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    marginTop: 5,
  },
  mileage: {
    fontSize: 14,
    marginTop: 5,
  },
  notes: {
    fontSize: 14,
    marginTop: 5,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default MaintenanceScreen;
