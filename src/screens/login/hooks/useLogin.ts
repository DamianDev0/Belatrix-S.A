import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {NavigationProp} from '../../../types/navigation.types';
import {useAuth} from '../../../context/auth.context';
import Toast from 'react-native-toast-message';

const useLogin = () => {
  const navigation = useNavigation<NavigationProp>();
  const {login} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLogin = async () => {
    try {
      await login(email, password);
      setIsLoginSuccessful(true);
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'Welcome back!',
      });

      navigation.navigate('Home');
    } catch (error) {
      console.error('Login failed:', error);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Please try again.',
      });
    }
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
