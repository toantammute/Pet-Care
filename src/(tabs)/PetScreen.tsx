import { View, Text, StyleSheet, StatusBar, FlatList } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import PetCard from '../../components/pet/PetCard'
import Spinner from 'react-native-loading-spinner-overlay'
import usePet from '../../hooks/usePets'
import { useFocusEffect } from '@react-navigation/native'
import FloatingAddButton from '../../components/pet/FloatingAddButton'

const PetScreen = () => {
  const { pets, isLoading, getPets } = usePet();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await getPets(); // Fetch pets data
    setRefreshing(false);
  };


  useFocusEffect(
    useCallback(() => {
      console.log('Screen focused, fetching pets');
      getPets();
    }, [])
  );


  const renderItem = ({ item }: { item: any }) => (
    <PetCard pet={item} />
  );

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      {/* <StatusBar barStyle="dark-content" /> */}
      <FlatList
        data={pets}
        keyExtractor={(item) => item.petid.toString()} // Adjust based on your pet's unique ID
        renderItem={renderItem}
        refreshing={refreshing} // Control the refreshing state
        onRefresh={onRefresh} // Call getPets when pulled down
        ListEmptyComponent={<Text>No pets available</Text>} // Handle empty list case
      />
      <FloatingAddButton /> {/* Add Floating Button */}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
    justifyContent: 'flex-start', 
    // alignItems: 'center',
  },
});

export default PetScreen;