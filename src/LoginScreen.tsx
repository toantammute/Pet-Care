import React, { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import IconInput from "react-native-vector-icons/FontAwesome";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

const LoginScreen = () => {
    const navigation = useNavigation<NavigationProp<{ Register: undefined }>>();
  
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
  
    const {isLoading, Login} = useContext(AuthContext);
  
    // const val = useContext(AuthContext);
  
    return (
      <View style={styles.container}>
        <Spinner visible={isLoading} />
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>Please sign in to continue</Text>
          </View>
  
          <View style={styles.inputContainer}>
            <IconInput name="user" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={username}
              placeholder="Username"
              placeholderTextColor="#666"
              onChangeText={setUsername}
            />
          </View>
  
          <View style={styles.inputContainer}>
            <IconInput name="lock" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#666"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color="#666" />
            </TouchableOpacity>
          </View>
  
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => Login(username, password)}
          >
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>
  
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      padding: 20,
      justifyContent: 'center',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: 15,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    header: {
      alignItems: 'center',
      marginBottom: 30,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: '#666',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      borderRadius: 10,
      marginBottom: 15,
      paddingHorizontal: 15,
      height: 50,
    },
    inputIcon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: '#333',
    },
    loginButton: {
      backgroundColor: '#007AFF',
      borderRadius: 10,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    loginButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    registerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
    registerText: {
      color: '#666',
      fontSize: 14,
    },
    registerLink: {
      color: '#007AFF',
      fontSize: 14,
      fontWeight: '500',
    },
  });
  
export default LoginScreen;