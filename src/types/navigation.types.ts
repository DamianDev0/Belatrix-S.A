import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
};

export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Onboarding' | 'Signup'
>;

export type MainTabParamList = {
  HomeTab: undefined;
  FormCreate: undefined;
};
