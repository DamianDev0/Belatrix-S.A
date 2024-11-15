import {useState} from 'react';
import {useAuth} from '../../../context/auth.context';
import {NavigationProp} from '../../../types/navigation.types';
import {useNavigation} from '@react-navigation/native';

const useSignUp = () => {
  const {signUp, loading, successMessage, errorMessage} = useAuth();
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignUp = async () => {
    await signUp(email, password, name);
    navigation.goBack();
  };

  const handleGoToLogin = () => {
    navigation.navigate('Login');
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    handleSignUp,
    loading,
    successMessage,
    errorMessage,
    handleGoToLogin,
  };
};

export default useSignUp;
