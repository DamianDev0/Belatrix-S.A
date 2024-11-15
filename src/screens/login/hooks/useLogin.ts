import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { NavigationProp } from '../../../types/navigation.types';

const useLogin = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    setIsLoginSuccessful(true);
    setModalVisible(true);
  };

  const handleGoToSignUp = () => {
    navigation.navigate('Signup');
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleGoToSignUp,
    isModalVisible,
    toggleModal,
    isLoginSuccessful,
  };
};

export default useLogin;
