import React, { useContext } from 'react';
import {StyleSheet, Text, SafeAreaView, View} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../src/(tabs)/HomeScreen';
import LoginScreen from '../src/LoginScreen';
import RegisterScreen from '../src/RegisterScreen';
import { AuthContext } from '../context/AuthContext';
import SplashScreen from '../src/SplashScreen';
import TabLayout from '../src/(tabs)/_layout';

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
          <Stack.Screen name='Tab' component={TabLayout} options={{headerShown:false}}/>
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
