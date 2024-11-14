import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import NotifyIcon from 'react-native-vector-icons/Ionicons'
import React from 'react'

const Header = () => {
  return (
    <View style={styles.containerRow}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image
            source={{ uri: 'https://cdn.popsww.com/blog/sites/2/2021/03/doraemon-wiki-mieng-cua-doraemon.png' }}
            style={styles.profileImage} />
          <View>
            <Text style={styles.name}>Welcome,</Text>
            <Text>Username</Text>
          </View>
          <View style={styles.rightContainer}>
            <TouchableOpacity>
              <NotifyIcon name="notifications-outline" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  containerRow:{
    flexDirection:'row',
    // flex:1,

  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 16,
  },
});

export default Header