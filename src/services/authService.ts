import axios from 'axios';
import { ApiResponse, RegisterResponse } from '../interfaces/auth.interface';
import { URL_BACKEND } from '../constants/data';

const API_URL = `${URL_BACKEND}`;

console.log(API_URL);

const apiService = {
  login: async (email: string, password: string): Promise<ApiResponse> => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/login`, {
        email,
        password,
      });

      console.log('Login API response:', response);
      return {
        statusCode: response.status,
        message: response.statusText,
        data: response.data,
      };
    } catch (error: any) {
      console.log('Login error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  register: async (
    email: string,
    password: string,
    name: string
  ): Promise<RegisterResponse> => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/register`, {
        email,
        password,
        name,
      });
      return response.data;
    } catch (error: any) {
      console.log('Register error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Register failed');
    }
  },
};

export default apiService;
