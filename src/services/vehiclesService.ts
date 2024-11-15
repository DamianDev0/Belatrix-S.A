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

export const getVehicleById = async (
  token: string,
  vehicleId: string,
): Promise<Vehicle> => {
  if (!token) {
    throw new Error('No token found');
  }

  if (!vehicleId) {
    throw new Error('No vehicle ID provided');
  }

  try {
    const response = await axios.get(`${URL}/${vehicleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching vehicle details:', error.message);
    throw new Error('Failed to fetch vehicle details');
  }
};

export const updateVehicle = async (
  token: string,
  vehicleId: string,
  updatedVehicleData: FormData | Partial<Vehicle>,
): Promise<Vehicle> => {
  if (!token) {
    throw new Error('No token found');
  }

  if (!vehicleId) {
    throw new Error('No vehicle ID provided');
  }

  try {
    const response = await axios.patch(
      `${URL}/${vehicleId}`,
      updatedVehicleData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type':
            updatedVehicleData instanceof FormData
              ? 'multipart/form-data'
              : 'application/json',
        },
      },
    );

    return response.data.data;
  } catch (error: any) {
    console.error('Error updating vehicle:', error.message);
    throw new Error('Failed to update vehicle');
  }
};

export const deleteVehicle = async (
  token: string,
  vehicleId: string,
): Promise<void> => {
  if (!token) {
    throw new Error('No token found');
  }

  if (!vehicleId) {
    throw new Error('No vehicle ID provided');
  }

  try {
    await axios.delete(`${URL}/${vehicleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    console.error('Error deleting vehicle:', error.message);
    throw new Error('Failed to delete vehicle');
  }
};
