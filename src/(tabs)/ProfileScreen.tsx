import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import UserProfile from '../../components/user_profile/UserProfile';
import useUser from '../../hooks/useUser';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/Feather';
import SplashScreen from '../SplashScreen';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const { user, isLoading: userLoading, getUser } = useUser(); // Destructure the values from the custom hook
  const { Logout, isLoading: authLoading } = useContext(AuthContext); // Access Logout and isLoading from AuthContext

  useFocusEffect(
    React.useCallback(() => {
      getUser(); // Fetch user data when screen is focused
    }, [])
  ); // Empty dependency array means it will run once when the component mounts

  // Show a loading indicator while data is being fetched
  // const isLoading = userLoading || authLoading;

  if (userLoading || authLoading) {
    return (
      // <Text>Loading...</Text>
      <SplashScreen />
    );
  }


  // Show the user profile data once it's fetched
  return (
    <View>
      {/* <Spinner visible={isLoading} /> */}
      <UserProfile userData={user} /> :null;
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={Logout}>
        <Icon name="log-out" size={20} color="#FFFFFF" style={styles.logoutIcon} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;