import React from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import useVehicles from './hooks/useVehicles';
import {NavigationProp} from '../../types/navigation.types';

interface HomeScreenProps {
  navigation: NavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {vehicles, loading, error, loadVehicles} = useVehicles();

  useFocusEffect(
    React.useCallback(() => {
      loadVehicles();
    }, [loadVehicles]),
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#34495e" />
        <Text style={styles.loaderText}>Loading vehicles...</Text>
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  const handleVehiclePress = (vehicleId: string) => {
    navigation.navigate('Details', {vehicleId});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehicles</Text>
      <FlatList
        data={vehicles}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handleVehiclePress(item.id.toString())}>
            <View style={styles.item}>
              {item.photo ? (
                <Image source={{uri: item.photo}} style={styles.image} />
              ) : (
                <Text style={styles.noImageText}>No Image Available</Text>
              )}
              <Text style={styles.vehicleText}>
                {item.make} {item.model} ({item.year})
              </Text>
              <Text style={styles.licenseText}>
                License Plate: {item.licensePlate}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#34495e',
  },
  item: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 15,
    padding: 15,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  noImageText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
  },
  vehicleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  licenseText: {
    fontSize: 16,
    color: '#555',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 18,
    color: '#34495e',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  separator: {
    height: 10,
    backgroundColor: '#f1f1f1',
  },
});

export default HomeScreen;
