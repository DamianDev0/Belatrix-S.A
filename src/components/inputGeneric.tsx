import React from 'react';
import {TextInput, View, StyleSheet, TextInputProps} from 'react-native';

interface InputGenericProps extends TextInputProps {
  width?: number;
  height?: number;
  placeholder?: string;
  value?: string;
  onChangeText: (text: string) => void;
  isPassword?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  editable?: boolean;
}

const InputGeneric: React.FC<InputGenericProps> = ({
  width = 300,
  height = 50,
  placeholder = '',
  value,
  onChangeText,
  isPassword = false,
  keyboardType = 'default',
  editable = true,
  ...props
}) => {
  return (
    <View style={[styles.container, {width, height}]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword}
        keyboardType={keyboardType}
        editable={editable}
        placeholderTextColor="#888"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',

    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default InputGeneric;
