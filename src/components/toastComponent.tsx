import Toast from 'react-native-toast-message';

interface CustomToastProps {
  type: 'success' | 'error' | 'info';
  text1: string;
  text2?: string;
}

const CustomToast: React.FC<CustomToastProps> = ({type, text1, text2}) => {
  Toast.show({
    type,
    text1,
    text2,
  });

  return null;
};

export default CustomToast;
