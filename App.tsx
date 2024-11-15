import React from 'react';
import AppNavigation from './src/navigation/appNavigation';
import Toast from 'react-native-toast-message';
import {AuthProvider} from './src/context/auth.context';

const App = () => {
  return (
    <AuthProvider>
      <AppNavigation />
      <Toast />
    </AuthProvider>
  );
};

export default App;
