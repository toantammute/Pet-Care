import React from 'react';
import {StyleSheet, Text, SafeAreaView, View} from 'react-native';
import Navigation from './components/Navigation';
import { AuthProvider } from './context/AuthContext';
import { StatusBar } from 'react-native';
import TabLayout from './src/(tabs)/_layout';

const App = () => {
  return (
    <AuthProvider>
      <StatusBar backgroundColor='#06bcee'/>
      <Navigation />
      {/* <TabLayout /> */}
    </AuthProvider>
  );
};


export default App;