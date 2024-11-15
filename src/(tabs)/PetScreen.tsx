import { View, Text, StyleSheet, StatusBar, FlatList } from 'react-native'
import React, { useContext, useEffect } from 'react'
import PetCard from '../../components/pet/PetCard'
import { PetContext } from '../../context/PetContext'
import Spinner from 'react-native-loading-spinner-overlay'

const PetScreen = () => {
  const {pets, isLoading, getPets} = useContext(PetContext);

  useEffect(() => {
    console.log('useEffect');
    getPets();
  }, []);



  // const renderItem = ({item}) => {
  //   return <PetCard pet={item}/>
  // };
  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <StatusBar barStyle="dark-content" />
      <FlatList
                data={pets}
                keyExtractor={(item) => item.petid.toString()} // Adjust based on your pet's unique ID
                renderItem={({ item }) => <PetCard pet={item} />}
            />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
  },
});

export default PetScreen;