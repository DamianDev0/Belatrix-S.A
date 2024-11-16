import { useState, useEffect } from 'react';
import {
  getVehicleMaintenance,
  createMaintenance,
} from '../../../services/maintenaceService';
import { Maintenance } from '../../../interfaces/maintenace.interface';
import { useAuth } from '../../../context/auth.context';

const useVehicleMaintenance = (vehicleId: string) => {
  const { token } = useAuth();
  const [maintenanceData, setMaintenanceData] = useState<Maintenance[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState<boolean>(false);
  const [creationError, setCreationError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newMaintenance, setNewMaintenance] = useState<Maintenance>({
    type: '',
    date: '',
    mileage: 0,
    notes: '',
  });

  useEffect(() => {
    const fetchMaintenance = async () => {
      if (!token) {
        setError('Token not available');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await getVehicleMaintenance(token, vehicleId);
        setMaintenanceData(data);
      } catch (error) {
        setError('Error fetching maintenance data');
      } finally {
        setLoading(false);
      }
    };

    if (vehicleId && token) {
      fetchMaintenance();
    }
  }, [vehicleId, token]);

  const addMaintenance = async (newMaintenance: Maintenance) => {
    if (!token) {
      setCreationError('Token not available');
      return;
    }

    setCreating(true);
    setCreationError(null);

    try {
      const data = await createMaintenance(token, vehicleId, newMaintenance);
      setMaintenanceData(prevData => (prevData ? [...prevData, data] : [data]));
    } catch (error) {
      setCreationError('Error creating maintenance');
    } finally {
      setCreating(false);
    }
  };

  const handleCreateMaintenance = () => {
    addMaintenance(newMaintenance);
    setModalVisible(false);
    setNewMaintenance({ type: '', date: '', mileage: 0, notes: '' });
  };

  const handleChange = (field: keyof Maintenance, value: string | number) => {
    setNewMaintenance((prev: any) => ({ ...prev, [field]: value }));
  };

  return {
    maintenanceData,
    loading,
    error,
    addMaintenance,
    creating,
    creationError,
    modalVisible,
    setModalVisible,
    newMaintenance,
    setNewMaintenance,
    handleCreateMaintenance,
    handleChange,
  };
};

export default useVehicleMaintenance;
