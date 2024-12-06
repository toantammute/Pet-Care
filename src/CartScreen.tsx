import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React, { useCallback, useState } from 'react'
import useCart from '../hooks/useCart'
import CartCard from '../components/cart/CartCard'
import { ScrollView } from 'react-native-gesture-handler'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import SplashScreen from './SplashScreen'

const CartScreen = () => {

    const navigation = useNavigation<any>();

    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');

    const { getCart, cart, cartLoading, deleteItem, addToCart, checkout, checkoutRes } = useCart();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await getCart();
        setRefreshing(false);
    }

    useFocusEffect(
        useCallback(() => {
            getCart();
        }, [])
    );

    while (cartLoading) {
        return <SplashScreen />
    }

    const renderItem = ({ item }: { item: any }) => (
        <CartCard cart={item}
            deleteItem={deleteItem}
            addToCart={addToCart}
            refreshCart={onRefresh} />
    );

    const handleCheckout = async () => {
        try {
            const response = await checkout(address, note);
            console.log('Checkout successful', response); // Use the captured response
            if (response) {
                navigation.navigate('CheckoutScreen', { order_id: response.order_id });
            } else {
                console.log('Checkout response is undefined');
            }
        } catch (error) {
            console.log('Error checking out:', error);
        }
    }

    return (
        <ScrollView style={styles.scrollViewContent}>
            <FlatList
                data={cart}
                keyExtractor={(item) => item.product_id.toString()}
                renderItem={renderItem}
                refreshing={refreshing}
                onRefresh={onRefresh}
                ListEmptyComponent={<Text>No items in cart</Text>}
                scrollEnabled={false} />

            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: ${cart.reduce((acc, item) => acc + item.total_price, 0).toFixed(2)}</Text>
                <View style={styles.bottomLine} />
            </View>

            <TextInput
                style={styles.input}
                placeholder="Enter your address"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter a note"
                value={note}
                onChangeText={setNote}
            />

            <TouchableOpacity
                onPress={handleCheckout}
                style={[styles.checkoutButton, !address && styles.checkoutButtonDisabled]}
                disabled={!address} >
                <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        // padding: 16,
    },
    totalContainer: {
        marginVertical: 20,
        alignItems: 'center',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    checkoutButton: {
        backgroundColor: '#ff6347',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        width: 250,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    checkoutButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    checkoutButtonDisabled: {
        backgroundColor: '#ccc',
    },
    bottomLine: {
        width: '85%',
        height: 1,
        backgroundColor: '#ccc',
        marginTop: 10,
        // marginVertical: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 8,
        marginLeft: 20,
        marginRight: 20,
        // alignItems: 'center',
        // alignSelf: 'center',
    },
})
export default CartScreen