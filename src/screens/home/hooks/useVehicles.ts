/* eslint-disable @typescript-eslint/no-shadow */
import {useState, useEffect} from 'react';
import {getAllVehicles} from '../../../services/vehiclesService';
import {Vehicle} from '../../../interfaces/vehicle.interface';
import {useAuth} from '../../../context/auth.context';

const useVehicles = () => {
  const {token} = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVehicles = async () => {
      if (token) {
        try {
          const data = await getAllVehicles(token);
          setVehicles(data);
        // eslint-disable-next-line no-catch-shadow
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setError('No token found');
        setLoading(false);
      }
    };

    loadVehicles();
  }, [token]);

  return {vehicles, loading, error};
};

export default useVehicles;
