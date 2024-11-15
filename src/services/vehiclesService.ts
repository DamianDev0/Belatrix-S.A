import axios from 'axios';
import {URL_BACKEND} from '../constants/data';
import {Vehicle} from '../interfaces/vehicle.interface';

const URL = `${URL_BACKEND}/api/v1/vehicles`;

export const getAllVehicles = async (token: string): Promise<Vehicle[]> => {
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching vehicles:', error.message);
    throw new Error('Failed to fetch vehicles');
  }
};
