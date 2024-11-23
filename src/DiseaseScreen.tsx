import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import useDisease from '../hooks/useDisease'
import AntDesign from 'react-native-vector-icons/AntDesign'
import DiseaseCard from '../components/disease/DiseaseCard'
import { useFocusEffect } from '@react-navigation/native'
import filter from 'lodash.filter'

interface Disease{
  disease_id: string;
  disease_name: string;
  description: string;
}

const DiseaseScreen = () => {
  const { diseases, diseaseLoading, getDiseases } = useDisease();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDiseases, setFilteredDiseases] = useState<Disease[]>([]);


  useFocusEffect(
    useCallback(() => {
      getDiseases();
    }, [])
  );

  useEffect(() => {
    setFilteredDiseases(diseases);
  }, [diseases]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getDiseases();
    setRefreshing(false);
  }

  const renderItems = ({ item }: { item: any }) => {
    return <DiseaseCard disease={item} />;
  };

  const removeDiacritics = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const normalizedQuery = removeDiacritics(query.toLowerCase());
    const filtered = diseases.filter(disease =>
      removeDiacritics(disease.disease_name.toLowerCase()).includes(normalizedQuery)
    );
    setFilteredDiseases(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search diseases..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={filteredDiseases}
        keyExtractor={(item) => item.disease_id.toString()}
        renderItem={renderItems}
        ListEmptyComponent={<Text>No diseases.</Text>} 
        refreshing={refreshing}
        onRefresh={onRefresh}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
  },
});

export default DiseaseScreen;