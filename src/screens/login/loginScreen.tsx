import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import InputGeneric from '../../components/inputGeneric';
import useLogin from './hooks/useLogin';
import BottomSheet from '../../components/bottomSheet';
import CustomButton from '../../components/buttonGeneric';

const {width, height} = Dimensions.get('screen');

const LoginScreen: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    isModalVisible,
    toggleModal,
    isLoginSuccessful,
  } = useLogin();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <View style={styles.topContainer}>
            <Text style={styles.heyText}>Hey,</Text>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.welcomeText}>Back</Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/img/security.png')}
              style={styles.image}
            />
          </View>

          <View style={styles.formContainer}>
            <InputGeneric
              width={320}
              height={50}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <InputGeneric
              width={320}
              height={50}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              isPassword={true}
              keyboardType="default"
            />
            <CustomButton
              onPress={handleLogin}
              title="Login"
              backgroundColor="#000"
              color="#FFF"
            />
          </View>

          <BottomSheet
            isVisible={isModalVisible}
            onClose={toggleModal}
            backgroundColor="#F8E9B0">
            {isLoginSuccessful ? (
              <>
                <Text style={styles.modalTitle}>Wohoo, Login successfully!</Text>
                <Image
                  source={require('../../assets/img/succesfully.png')}
                  style={styles.successImage}
                />
              </>
            ) : (
              <Text>Signing in...</Text>
            )}
          </BottomSheet>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcf3cf',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  topContainer: {
  },
  imageContainer: {
    alignItems: 'center',
  },
  formContainer: {
    alignItems: 'center',
    gap: 20,
  },
  welcomeText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#000',
  },
  heyText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  successImage: {
    width: width * 0.7,
    height: height * 0.3,
    marginBottom: 10,
  },
  image: {
    width: width * 0.8,
    height: height * 0.36,
    resizeMode: 'contain',
  },
});

export default LoginScreen;
