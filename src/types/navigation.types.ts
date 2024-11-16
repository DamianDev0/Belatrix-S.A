import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  Details: {vehicleId: string};
  Maintenance: {vehicleId: string};
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type MainTabParamList = {
  HomeTab: undefined;
  FormCreate: undefined;
};
