import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import InputGeneric from '../../components/inputGeneric';

const SignUpScreen  = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <InputGeneric
        width={300}
        height={50}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <InputGeneric
        width={300}
        height={50}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        isPassword={true}
        keyboardType="default"
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
});

export default SignUpScreen;
