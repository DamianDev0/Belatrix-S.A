import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  Details: {vehicleId: string};
};

export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home' | 'Onboarding' | 'Signup' | 'Details'
>;

export type MainTabParamList = {
  HomeTab: undefined;
  FormCreate: undefined;
};
