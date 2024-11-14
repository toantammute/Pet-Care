import React, { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
  
    return(
      <View style={styles.container}>
        <Spinner visible={isLoading} />
        <View style={styles.containerSmall}>
  
  
          <Text style={styles.title}>Login</Text>
  
          <TextInput
            style={styles.input}
            value={username}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
          />
          <View style={styles.pwdContainer}>
                <TextInput
                    style={styles.inputpwd}
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
                    <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="black" />
                </TouchableOpacity>
            </View>
          {/* <Button title="Login"/> */}
  
          <Button title="Login" onPress={() =>{Login(username,password);} } />
          
          <View style={styles.register}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{color: 'blue'}}>Sign up?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
}
  
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    containerSmall: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      width: '100%'
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
    },
    input: {
      width: '100%',
      padding: 8,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
    },
    register: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    pwdContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    inputpwd: {
        width: '80%',
        padding: 10,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        flex: 1,
        height: 40
    },
    iconContainer: {
        paddingLeft: 10
        
    }
  });
  
export default LoginScreen;