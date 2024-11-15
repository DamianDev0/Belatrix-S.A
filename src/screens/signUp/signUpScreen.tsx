import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import InputGeneric from '../../components/inputGeneric';
import CustomButton from '../../components/buttonGeneric';
import useSignUp from './hooks/useRegister';

const SignUpScreen = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    handleSignUp,
    handleGoToLogin
  } = useSignUp();

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.heyText}>Let`s get</Text>
        <Text style={styles.welcomeText}>Started</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/img/bmw-wlcom.png')}
          style={styles.image}
        />
      </View>

      <View style={styles.conatinerForm}>
        <InputGeneric
          width={320}
          height={50}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          keyboardType="default"
        />
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
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Sign Up"
          onPress={handleSignUp}
          backgroundColor="#000"
        />
      </View>


      <View style={styles.signInContainer}>
        <TouchableOpacity onPress={handleGoToLogin}>
          <Text style={styles.signInText}>
            Already have an account? Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    justifyContent: 'center',
  },
  topContainer: {
    marginBottom: 40,
  },
  heyText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#000',
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#000',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '70%',
    height: 200,
    resizeMode: 'contain',
  },
  conatinerForm: {
    gap: 16,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  signInContainer: {
    marginTop: 70,
    alignItems: 'center',
  },
  signInText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default SignUpScreen;
