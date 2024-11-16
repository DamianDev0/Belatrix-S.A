import axios from 'axios';
import {URL_BACKEND} from '../constants/data';
import {Maintenance} from '../interfaces/maintenace.interface';

const URL = `${URL_BACKEND}/api/v1/vehicles`;

export const getVehicleMaintenance = async (
  token: string,
  vehicleId: string,
): Promise<Maintenance[]> => {
  if (!token) {
    throw new Error('No token found');
  }

  if (!vehicleId) {
    throw new Error('No vehicle ID provided');
  }

  try {
    const response = await axios.get(`${URL}/${vehicleId}/maintenance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching vehicle maintenance:', error.message);
    throw new Error('Failed to fetch vehicle maintenance');
  }
};

export const createMaintenance = async (
  token: string,
  vehicleId: string,
  maintenanceData: Maintenance,
): Promise<Maintenance> => {
  if (!token) {
    throw new Error('No token found');
  }

  if (!vehicleId) {
    throw new Error('No vehicle ID provided');
  }

  try {
    const response = await axios.post(
      `${URL}/${vehicleId}/maintenance`,
      maintenanceData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.data;
  } catch (error: any) {
    console.error('Error creating maintenance:', error.message);
    throw new Error('Failed to create maintenance');
  }
};
