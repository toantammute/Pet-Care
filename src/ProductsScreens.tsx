import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import ProductCard from '../components/product/ProductCard'
import useProduct from '../hooks/useProduct'
import { useFocusEffect } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler'
import useCart from '../hooks/useCart'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'

const ProductsScreens = () => {
  const { products, productLoading, getProducts } = useProduct();
  const { cart, getCart, addToCart } = useCart();
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await getProducts(); // Fetch pets data
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      console.log('Screen focused, fetching products');
      getProducts();
      getCart();
    }, [])
  );

  const renderItem = ({ item }: { item: any }) => (
    <ProductCard product={item}
    addToCart={addToCart} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        numColumns={2}
        columnWrapperStyle={styles.row}
        keyExtractor={(item) => item.product_id.toString()} // Adjust based on your pet's unique ID
        renderItem={renderItem}
        refreshing={refreshing} // Control the refreshing state
        onRefresh={onRefresh} // Call getPets when pulled down
        ListEmptyComponent={<Text>No products available</Text>} // Handle empty list case
        />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:8,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
})
export default ProductsScreens