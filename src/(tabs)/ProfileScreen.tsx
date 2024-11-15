import { View, Text, TouchableOpacity, Image, StyleSheet, Button } from 'react-native'
import React from 'react'

const ProfileScreen = () =>{
  return (
    <View>
      <TouchableOpacity>
        <Image
        source={{ uri: 'https://bhd.1cdn.vn/2024/06/03/cdn.tuoitre.vn-471584752817336320-2024-6-3-_doraemon-3-17173722166781704981911.jpeg' }} style={styles.avatar}/>
      </TouchableOpacity>
      <View>
        <Text>Full name</Text>
        <Text>Lê Nguyễn Toàn Tâm</Text>
      </View>
      <View>
        <Text>Username</Text>
        <Text>tota</Text>
      </View>
      <View>
        <Text>Email</Text>
        <Text>tamtoanlenguyen@gmail.com</Text>
      </View>
      <View>
        <Text>Phone Number</Text>
        <Text>01234567890</Text>
      </View>
      <Button title="Change Password"/>
      <Button title="Change Profile Information"/>
      <Button title="Logout" color="red" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar:{
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  }
})

export default ProfileScreen;