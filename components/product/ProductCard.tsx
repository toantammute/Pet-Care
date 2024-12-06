import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import imageproduct from '../../assets/images/images.jpg'
import Icon from 'react-native-vector-icons/FontAwesome'

interface Product {
  product_id: string,
  name: string,
  price: number,
  stock: number,
  data_image: string,
}

interface ProductCardProps {
  product: Product;
  addToCart: (product_id: string, quantity: number) => void;
}

const ProductCard:React.FC<ProductCardProps> = ({product, addToCart}) => {

  const handleAddToCart = async() => {
    try {
      await addToCart(product.product_id, 1);
    } catch (error) {
      console.log('Error adding to cart:', error);
    }
  }

  return (
    <View style={styles.cotainer}>
      <View>
        <Image
          source={imageproduct}
          style={styles.productImage} />
      </View>
      <View style={styles.Under}>
        <View>
          <Text>{product.name}</Text>
          <Text>{product.price}</Text>
        </View>
        <TouchableOpacity onPress={handleAddToCart}>
          <Icon name="cart-plus" size={30} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  cotainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
    marginTop: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#ffffff',
    paddingBottom: 8,
    // width: 'auto'
  },
  Under: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    // backgroundColor: 'red'
  },
  productImage: {
    width: 170,
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
})
export default ProductCard
