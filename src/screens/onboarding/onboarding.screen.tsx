import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { NavigationProp } from '../../types/navigation.types';

const {width, height} = Dimensions.get('screen');

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleNavigation = () => {
    console.log('Navigating to Login');
    navigation.navigate('Login');
  };

  return (
    <Onboarding
      onSkip={handleNavigation}
      onDone={handleNavigation}
      bottomBarHighlight={false}
      // eslint-disable-next-line react-native/no-inline-styles
      containerStyles={{paddingHorizontal: 15}}
      pages={[
        {
          backgroundColor: '#F8E9B0',
          image: (
            <Image
              source={require('../../assets/img/image1.png')}
              style={styles.image}
            />
          ),
          title: 'Lorem Ipsum Dolor',
          subtitle: 'Sed ut perspiciatis unde omnis iste natus error sit.',
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
        {
          backgroundColor: '#d1f2eb',
          image: (
            <Image
              source={require('../../assets/img/image2.png')}
              style={styles.image}
            />
          ),
          title: 'Consectetur Adipiscing',
          subtitle: 'Ut enim ad minim veniam, quis nostrud exercitation.',
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
        {
          backgroundColor: '#e9bcbe',
          image: (
            <Image
              source={require('../../assets/img/image3.png')}
              style={styles.image}
            />
          ),
          title: 'Eiusmod Tempor',
          subtitle: 'Excepteur sint occaecat cupidatat non proident.',
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: width * 1.0,
    height: height * 0.5,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default OnboardingScreen;
