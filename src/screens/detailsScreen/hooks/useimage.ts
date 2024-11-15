import {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {updateVehicle} from '../../../services/vehiclesService';
import {useAuth} from '../../../context/auth.context';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions'; // Importar permisos

interface UseImageUploaderProps {
  vehicleId: string;
  onImageUpload: (photoUrl: string) => void;
}

const useImageUploader = ({
  vehicleId,
  onImageUpload,
}: UseImageUploaderProps) => {
  const {token} = useAuth();
  const [uploading, setUploading] = useState(false);

  const checkAndRequestPermissions = async () => {
    try {
      const permissionStatus = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE); // Cambia según la plataforma (Android/iOS)

      if (permissionStatus === RESULTS.GRANTED) {
        console.log('Permiso otorgado');
        selectImage();
      } else {
        console.error('Permiso denegado');
      }
    } catch (error) {
      console.error('Error al pedir permisos:', error);
    }
  };

  const selectImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.5,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (result.errorMessage) {
        console.error('ImagePicker Error: ', result.errorMessage);
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        if (imageUri) {
          await uploadImage(imageUri);
        }
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const uploadImage = async (imageUri: string) => {
    if (!token) {
      console.error('No token found, user is not authenticated.');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'vehicle-photo.jpg',
      });

      const updatedVehicle = await updateVehicle(token, vehicleId, formData);

      if (updatedVehicle?.photo) {
        onImageUpload(updatedVehicle.photo);
      }
    } catch (error) {
      console.error('Error uploading vehicle photo:', error);
    } finally {
      setUploading(false);
    }
  };

  return {
    selectImage: checkAndRequestPermissions,
    uploading,
  };
};

export default useImageUploader;
