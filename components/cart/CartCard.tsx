import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import productImage from '../../assets/images/image.png'

interface Cart {
  id:string, 
  cart_id:string,
  product_id: string,
  product_name: string,
  quantity: number,
  total_price: number
  unit_price: number
}

interface CartCardProps {
  cart: Cart;
  deleteItem: (product_id: string) => void;
  addToCart: (product_id: string, quantity: number) => void;
  refreshCart: () => Promise<void>;
}

const CartCard:React.FC<CartCardProps> = ({cart, deleteItem, addToCart, refreshCart}) => {

  const handleDeletePress = async () => {
    try {
      console.log("delete id:",cart.product_id);
      await deleteItem(cart.product_id);
      await refreshCart();
    } catch (error) {
      console.log('Error deleting item:', error);
    }
  }
  const handlePlusPress = async () => {
    try {
      console.log("add id:",cart.product_id);
      await addToCart(cart.product_id, 1);
      await refreshCart();
    } catch (error) {
      console.log('Error adding to cart:', error);
    }
  }
  const handleMinusPress = async () => {
    try {
      console.log("minus id:",cart.product_id);
      await addToCart(cart.product_id, -1);
      await refreshCart();
    } catch (error) {
      console.log('Error adding to cart:', error);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Image source={productImage}
          style={styles.profileImage} />

      </View>

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.productName}>{cart.product_name}</Text>
          <TouchableOpacity onPress={handleDeletePress}>
            <Icon name="trash" size={16} color='red' />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.price}>{cart.unit_price.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.totalPrice}>{cart.total_price.toFixed(3)}</Text>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={styles.quantityButton} onPress={handlePlusPress}>
              <Icon name="plus" size={16} color='black' />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{cart.quantity}</Text>
            <TouchableOpacity
              style={[styles.quantityButton, cart.quantity === 0 && styles.disabledButton]}
              onPress={handleMinusPress}
              disabled={cart.quantity === 0}
            >
              <Icon name="minus" size={16} color='black' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    gap: 5,
    padding: 10,
    marginLeft: 10,
    marginTop:10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: Dimensions.get('window').width - 20,
  },
  rightContainer: {
    flexDirection: 'column',
    padding: 5,
    width: Dimensions.get('window').width - 160,
  },
  row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // padding: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
})
export default CartCard