import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainTabParamList, RootStackParamList} from '../types/navigation.types';
import {NavigationContainer} from '@react-navigation/native';
import OnboardingScreen from '../screens/onboarding/onboarding.screen';
import HomeScreen from '../screens/home/homeScreen';
import LoginScreen from '../screens/login/loginScreen';
import SignUpScreen from '../screens/signUp/signUpScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from './TabBar';
import FormScreen from '../screens/formScreen/formScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();


const MyTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBarIcon: ({ color, size }) => (
        <TabBarIcon routeName={route.name} color={color} size={size} />
      ),
      tabBarActiveTintColor: '#34495e',
      tabBarInactiveTintColor: '#000',
      tabBarStyle: {
        backgroundColor: '#f9f9f9',
        borderTopColor: '#dddddd',
        height: 55,
      },
      tabBarLabelStyle: { fontSize: 11 },
      headerShown: false,
    })}>
    <Tab.Screen name="HomeTab" component={HomeScreen} />
    <Tab.Screen name="FormCreate" component={FormScreen} />
  </Tab.Navigator>
);

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen name="Home" component={MyTabs} options={{ headerShown: false }} />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
