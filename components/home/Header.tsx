import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import NotifyIcon from 'react-native-vector-icons/Ionicons'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigation } from '@react-navigation/native'

const Header = () => {
  const { userInfo } = useContext(AuthContext)
  const navigation = useNavigation<any>();

  const base64Image = `data:image/png;base64,${userInfo.user.data_image}`;
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image
          source={{ uri: base64Image }}
          style={styles.profileImage} />
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.usernameText}>{userInfo.user.username}</Text>
        </View>
      </View>
      <View style={styles.control}>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('AI_Chat')}>
            <NotifyIcon name="chatbox-outline" size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <NotifyIcon name="notifications-outline" size={30} />
          </TouchableOpacity>
        </View>
      </View>

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'white',
    width: '100%',
    height: 'auto',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  welcomeContainer: {
    flexDirection: 'column',
    gap: 2,
    alignItems: 'flex-start',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 600,
    fontFamily: 'Duplet'
  },
  usernameText: {
    fontSize: 25,
    fontWeight: 400,
    fontFamily: 'Duplet'
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  rightContainer: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    borderColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 16,
  },
  control:{
    flexDirection: 'row',
    gap: 6
  }
});

export default Header