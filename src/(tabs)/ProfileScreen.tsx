import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserProfile from '../../components/user_profile/UserProfile';
import useUser from '../../hooks/useUser';

const ProfileScreen = () => {
  const {user, isLoading, getUser} = useUser(); // Destructure the values from the custom hook

  // If you want to fetch user data only once when the component mounts, you can use this effect
  useEffect(() => {
    getUser(); // Call the custom hook's function to fetch user data
  }, []); // Empty dependency array means it will run once when the component mounts

  // Show a loading indicator while data is being fetched
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Show the user profile data once it's fetched
  return <UserProfile userData={user} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default ProfileScreen;
