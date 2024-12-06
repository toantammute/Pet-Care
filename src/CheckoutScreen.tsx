import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import useCart from '../hooks/useCart'
import usePayment from '../hooks/usePayment';
import { useFocusEffect, useRoute } from '@react-navigation/native';

const CheckoutScreen = () => {
  const route = useRoute();
  const { order_id } = route.params as { order_id: string };
  const { CheckoutDetail, getCheckoutDetail } = useCart();
  const { makePayment, paymentRes } = usePayment();

  // const paymentData = {
  //   accountNo: "220220222419",
  //   accountName: "Pet Care Management App",
  //   acqId: "970422",
  //   amount: parseInt(CheckoutDetail?.total_amount?.toString() || '1', 10),
  //   addInfo: "Thanh toan don hang " + order_id,
  //   format: "text",
  //   template: "compact2",
  //   order_id: parseInt(order_id, 10),
  // };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const checkoutDetail = await getCheckoutDetail(order_id);

        const paymentData = {
          accountNo: "220220222419",
          accountName: "Pet Care Management App",
          acqId: "970422",
          amount: parseInt(checkoutDetail?.total_amount?.toString() || '1', 10),
          addInfo: "Thanh toan don hang " + order_id,
          format: "text",
          template: "compact2",
          order_id: parseInt(order_id, 10),
        };

        await makePayment(paymentData);
      };

      fetchData();
    }, [order_id])
  );
  
  const base64Image = `data:image/png;base64,${paymentRes?.qrDataURL}`;
  console.log('Payment response:', base64Image);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Checkout Information</Text>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: paymentRes?.qrDataURL }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Order ID: {order_id}</Text>
        <Text style={styles.infoText}>Total amount: {CheckoutDetail?.total_amount.toFixed(3)} VNĐ</Text>
        <Text style={styles.infoText}>Order date: {CheckoutDetail?.order_date}</Text>
        <Text style={styles.infoText}>Shipping address: {CheckoutDetail?.shipping_address}</Text>
      </View>
    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    // marginVertical: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop:10,
    marginBottom: 20,
  },
  image: {
    width: 400,
    height: 400,
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 5,
  },
})
export default CheckoutScreen