import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import apiService from '../services/authService';
import {ApiResponse} from '../interfaces/auth.interface';

interface AuthContextProps {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    loadStoredToken();
  }, []);

  const loadStoredToken = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    const storedUserId = await AsyncStorage.getItem('userId');

    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const {data} = await apiService.login(email, password);
      handleLoginSuccess(data.data);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (data: ApiResponse['data']) => {
    if (!data || !data.access_token || !data.user) {
      throw new Error('Invalid login response');
    }

    const {access_token, user} = data;
    const {id} = user;

    if (access_token && id) {
      storeToken(access_token, id.toString());
      setSuccessMessage('Login Successful. Welcome back!');
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'Welcome back!',
      });
    } else {
      throw new Error('Token or user ID missing in response');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const storeToken = async (token: string, userId: string) => {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('userId', userId);
    setToken(token);
    setUserId(userId);
    setIsAuthenticated(true);
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {data} = await apiService.register(email, password, name);
      setSuccessMessage(
        'Registration Successful. Your account has been created.',
      );
      Toast.show({
        type: 'success',
        text1: 'Registration Successful',
        text2: 'Your account has been created.',
      });
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (message: string) => {
    setErrorMessage(message);
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'An error occurred. Please try again!',
    });
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    setToken(null);
    setUserId(null);
    setIsAuthenticated(false);
    setSuccessMessage('You have been logged out successfully.');
    Toast.show({
      type: 'success',
      text1: 'Logged Out',
      text2: 'You have been logged out successfully.',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        isAuthenticated,
        login,
        logout,
        loading,
        errorMessage,
        successMessage,
        signUp,
      }}>
      {children}
      <Toast />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
