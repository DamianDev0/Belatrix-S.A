import {useState, useEffect} from 'react';
import {
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from '../../../services/vehiclesService';
import {Vehicle} from '../../../interfaces/vehicle.interface';
import {useAuth} from '../../../context/auth.context';
import Toast from 'react-native-toast-message';
import {NavigationProp} from '../../../types/navigation.types';
import {useNavigation} from '@react-navigation/native';

const useVehicleDetails = (vehicleId: string) => {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editableVehicle, setEditableVehicle] = useState<Vehicle | null>(null);
  const navigation = useNavigation<NavigationProp>();

  const {token} = useAuth();

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        if (token) {
          setLoading(true);
          const data = await getVehicleById(token, vehicleId);
          setVehicle(data);
          setEditableVehicle(data);
        }
      } catch (err) {
        setError('Failed to load vehicle details');
      } finally {
        setLoading(false);
      }
    };

    if (vehicleId) {
      fetchVehicle();
    }
  }, [token, vehicleId]);

  const handleEdit = async (updatedData: Vehicle) => {
    try {
      if (token && vehicleId) {
        await updateVehicle(token, vehicleId, updatedData);
        setVehicle(updatedData);
        setEditableVehicle(updatedData);
        setIsModalVisible(false);
        Toast.show({
          type: 'success',
          text1: 'Vehicle updated successfully!',
        });
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Failed to update vehicle.',
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleDelete = async (vehicleId: string) => {
    setIsDeleting(true);
    try {
      if (token && vehicleId) {
        await deleteVehicle(token, vehicleId);
        setVehicle(null);
        Toast.show({
          type: 'success',
          text1: 'Vehicle deleted successfully!',
        });
        navigation.goBack();
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Failed to delete vehicle.',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return {
    vehicle,
    loading,
    error,
    handleEdit,
    handleDelete,
    isDeleting,
    isModalVisible,
    openModal,
    closeModal,
    editableVehicle,
    setEditableVehicle,
  };
};

export default useVehicleDetails;
