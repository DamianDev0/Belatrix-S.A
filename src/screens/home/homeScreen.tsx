import React from 'react';
import { Text, View, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import useVehicles from './hooks/useVehicles';
import { NavigationProp } from '../../types/navigation.types';

interface HomeScreenProps {
  navigation: NavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { vehicles, loading, error, loadVehicles } = useVehicles();

  useFocusEffect(
    React.useCallback(() => {
      loadVehicles();
    }, [loadVehicles])
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000" />
        <Text>Loading vehicles...</Text>
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const handleVehiclePress = (vehicleId: string) => {
    navigation.navigate('Details', { vehicleId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehicles</Text>
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleVehiclePress(item.id.toString())}>
            <View style={styles.item}>
              {item.photo ? (
                <Image source={{ uri: item.photo }} style={styles.image} />
              ) : (
                <Text>No Image Available</Text>
              )}
              <Text style={styles.vehicleText}>
                {item.make} {item.model} ({item.year})
              </Text>
              <Text style={styles.vehicleText}>License Plate: {item.licensePlate}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  vehicleText: {
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
