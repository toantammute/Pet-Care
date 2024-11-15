import React from 'react';
import {StyleSheet, Text, SafeAreaView, View} from 'react-native';
import Navigation from './components/Navigation';
import { AuthProvider } from './context/AuthContext';
import { PetProvider } from './context/PetContext';
import { StatusBar } from 'react-native';


const App = () => {
  return (
    <AuthProvider>
      <PetProvider>
        <StatusBar backgroundColor='#06bcee'/>
        <Navigation />
      </PetProvider>
    </AuthProvider>
  );
};



export default App;