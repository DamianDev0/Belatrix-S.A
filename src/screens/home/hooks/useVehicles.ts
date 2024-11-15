/* eslint-disable no-catch-shadow */
import {useState, useEffect, useCallback} from 'react';
import {getAllVehicles, deleteVehicle} from '../../../services/vehiclesService';
import {Vehicle} from '../../../interfaces/vehicle.interface';
import {useAuth} from '../../../context/auth.context';

const useVehicles = () => {
  const {token} = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadVehicles = useCallback(async () => {
    if (token) {
      try {
        setLoading(true);
        const data = await getAllVehicles(token);
        console.log('Updated vehicles:', data); // Verifica aquí los datos actualizados
        setVehicles(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError('No token found');
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadVehicles();
  }, [token, loadVehicles]);

  const handleDeleteVehicle = async (vehicleId: string) => {
    if (token) {
      try {
        await deleteVehicle(vehicleId, token);
        loadVehicles();
        // eslint-disable-next-line @typescript-eslint/no-shadow
      } catch (error: any) {
        setError('Error deleting vehicle');
      }
    }
  };

  return {vehicles, loading, error, loadVehicles, handleDeleteVehicle};
};

export default useVehicles;
