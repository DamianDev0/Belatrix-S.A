import React from 'react';
import { Text, View, FlatList, Image, StyleSheet } from 'react-native';
import useVehicles from './hooks/useVehicles';

const HomeScreen = () => {
  const { vehicles, loading, error } = useVehicles();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehicles</Text>
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {item.photo ? (
              <Image source={{ uri: item.photo }} style={styles.image} />
            ) : (
              <Text>No Image Available</Text>
            )}
            <Text style={styles.vehicleText}>
              {item.make} {item.model} ({item.year})
            </Text>
            <Text style={styles.vehicleText}>
              License Plate: {item.licensePlate}
            </Text>
          </View>
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
});

export default HomeScreen;
