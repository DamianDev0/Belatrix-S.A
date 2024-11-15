import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

interface TabBarIconProps {
  routeName: string;
  color: string;
  size: number;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({routeName, color, size}) => {
  let iconName: string;

  switch (routeName) {
    case 'HomeTab':
      iconName = 'home-outline';
      break;
    case 'FormCreate':
      iconName = 'car-outline';
      break;
    default:
      iconName = 'alert-circle-outline';
  }

  return <Icon name={iconName} color={color} size={size} />;
};

export default TabBarIcon;
