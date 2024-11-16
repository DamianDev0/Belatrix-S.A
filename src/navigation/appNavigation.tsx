import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '../types/navigation.types';
import { NavigationContainer } from '@react-navigation/native';
import OnboardingScreen from '../screens/onboarding/onboarding.screen';
import HomeScreen from '../screens/home/homeScreen';
import LoginScreen from '../screens/login/loginScreen';
import SignUpScreen from '../screens/signUp/signUpScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from './TabBar';
import FormScreen from '../screens/formScreen/formScreen';
import DetailsVehicleScreen from '../screens/detailsScreen/detailsScreen';
import MaintenaceScreen from '../screens/maintenanceScreen/maintenanceScree';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/auth.context'; 

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MyTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
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
  const { isAuthenticated } = useAuth();
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasCompletedOnboarding = await AsyncStorage.getItem('onboardingCompleted');
      setIsFirstLaunch(hasCompletedOnboarding === null);
      setLoading(false);
    };
    checkFirstLaunch();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          isAuthenticated
            ? 'Home'
            : isFirstLaunch
            ? 'Onboarding'
            : 'Login'
        }>
        
        {isFirstLaunch && !isAuthenticated && (
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
        )}

        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="Home"
              component={MyTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Details"
              component={DetailsVehicleScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Maintenance"
              component={MaintenaceScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
