import React, { useContext } from 'react';
import {StyleSheet, Text, SafeAreaView, View} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../src/HomeScreen';
import LoginScreen from '../src/LoginScreen';
import RegisterScreen from '../src/RegisterScreen';
import { AuthContext } from '../context/AuthContext';
import SplashScreen from '../src/SplashScreen';

const Stack = createNativeStackNavigator();


const Navigation = () => {

  const {userInfo, splashLoading} = useContext(AuthContext);
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {splashLoading ? 
        (
          <Stack.Screen name='Splash' component={SplashScreen} options={{headerShown:false}}/>
        ) : 
        userInfo.access_token ? (
          <Stack.Screen name='Home' component={HomeScreen} options={{headerShown:false}}/>
        ) : (
            <>
            <Stack.Screen name='Login' component={LoginScreen} options={{headerShown:false}}/>
            <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown:false}}/>
            </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
