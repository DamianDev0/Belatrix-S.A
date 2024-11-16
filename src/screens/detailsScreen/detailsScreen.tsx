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
  Dimensions,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types/navigation.types';
import Icon from 'react-native-vector-icons/Ionicons';
import useVehicleDetails from './hooks/useDetails';
import useImageUploader from './hooks/useimage';
import CustomButton from '../../components/buttonGeneric';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
const {width} = Dimensions.get('screen');

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

  const navigation = useNavigation<any>();

  const {selectImage} = useImageUploader({
    vehicleId,
    onImageUpload: (photoUrl: string | null) => {
      if (vehicle) {
        vehicle.photo = photoUrl;
      }
    },
  });

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

  const handleNavigateToMaintenance = () => {
    navigation.navigate('Maintenance', {vehicleId: vehicle.id.toString()});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {vehicle.make} {vehicle.model} ({vehicle.year})
      </Text>

      <TouchableOpacity onPress={selectImage}>
        {vehicle.photo ? (
          <Image source={{uri: vehicle.photo}} style={styles.image} />
        ) : (
          <Text style={styles.noImageText}>No image available</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.vehicleText}>
        License Plate: {vehicle.licensePlate}
      </Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={openModal}>
          <Icon name="pencil" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleDelete(vehicle.id.toString())}>
          <Icon name="trash" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleNavigateToMaintenance}>
          <Icon name="settings" size={30} color="black" />
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
            <View style={styles.containerButtons}>
              <CustomButton
                title="Save Changes"
                onPress={() => handleEdit(editableVehicle!)}
                backgroundColor="#000"
                color="#FFFF"
              />
              <CustomButton
                title="Cancel"
                onPress={closeModal}
                backgroundColor="#000"
                color="#FFFF"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  image: {
    width: 350,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  noImageText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  vehicleText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#444',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    marginTop: 30,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
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
    marginTop: 30,
  },
  iconButton: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    elevation: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#62cff4',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#f1f1f1',
    marginTop: 10,
  },
  containerButtons: {
    gap: width * 0.04,
  },
});

export default DetailsScreen;
