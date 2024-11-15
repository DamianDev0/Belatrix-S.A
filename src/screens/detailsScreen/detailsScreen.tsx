import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import useVehicleDetails from './hooks/useDetails';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types/navigation.types';
import Icon from 'react-native-vector-icons/Ionicons';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const DetailsScreen = () => {
  const route = useRoute<DetailsScreenRouteProp>();
  const {vehicleId} = route.params;
  const {
    vehicle,
    loading,
    error,
    handleEdit,
    handleDelete,
    isModalVisible,
    openModal,
    closeModal,
    editableVehicle,
    setEditableVehicle,
  } = useVehicleDetails(vehicleId);

  const navigation = useNavigation();

  const handleInputChange = (field: string, value: string) => {
    if (editableVehicle) {
      setEditableVehicle({...editableVehicle, [field]: value});
    }
  };

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

  if (!vehicle) {
    return (
      <View style={styles.centered}>
        <Text>No vehicle details available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {vehicle.make} {vehicle.model} ({vehicle.year})
      </Text>
      {vehicle.photo ? (
        <Image source={{uri: vehicle.photo}} style={styles.image} />
      ) : (
        <Text>No image available</Text>
      )}
      <Text style={styles.vehicleText}>
        License Plate: {vehicle.licensePlate}
      </Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={openModal}>
          <Icon name="pencil" size={30} color="#62cff4" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleDelete(vehicle.id.toString())}>
          <Icon name="trash" size={30} color="red" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Vehicle</Text>
            <TextInput
              style={styles.input}
              value={editableVehicle?.make}
              onChangeText={text => handleInputChange('make', text)}
              placeholder="Make"
            />
            <TextInput
              style={styles.input}
              value={editableVehicle?.model}
              onChangeText={text => handleInputChange('model', text)}
              placeholder="Model"
            />
            <TextInput
              style={styles.input}
              value={editableVehicle?.year?.toString()}
              onChangeText={text => handleInputChange('year', text)}
              placeholder="Year"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={editableVehicle?.licensePlate}
              onChangeText={text => handleInputChange('licensePlate', text)}
              placeholder="License Plate"
            />
            <Button
              title="Save Changes"
              onPress={() => handleEdit(editableVehicle!)}
            />
            <Button title="Cancel" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 150,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  vehicleText: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#62cff4',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  iconButton: {
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default DetailsScreen;
