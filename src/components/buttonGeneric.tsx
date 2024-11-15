import React from 'react';
import {TouchableOpacity, Text, StyleSheet, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type DimensionValue = number | string | undefined;

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  width?: DimensionValue;
  height?: DimensionValue;
  backgroundColor?: string;
  color?: string;
  icon?: string;
  iconSize?: number;
  borderRadius?: number;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  width = '100%',
  height = 50,
  backgroundColor = '#007BFF',
  color = '#FFF',
  icon,
  iconSize = 20,
  borderRadius = 10,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {width, height, backgroundColor, borderRadius} as ViewStyle,
      ]}
      onPress={onPress}>
      {icon && <Icon name={icon} size={iconSize} color={color} style={styles.icon} />}
      <Text style={[styles.text, {color}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 8,
  },
});

export default CustomButton;
