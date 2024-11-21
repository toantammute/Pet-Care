import React, { useContext, useState } from "react";
import { StyleSheet, Text, Button, TextInput, View, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import useImagePicker from "../hooks/useImagePicker";

const RegisterScreen = () => {
    const navigation = useNavigation<NavigationProp<{ Login: undefined }>>();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { image, loading, pickImage } = useImagePicker(); // Dùng hook để chọn ảnh

    const {isLoading, register} = useContext(AuthContext);


    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };
  
    const handleRegister = () => {
      // Kiểm tra mật khẩu xác nhận có trùng khớp không
      if (password !== confirmPassword) {
          Alert.alert('Error', 'Passwords do not match');
          return;
      }

      // Kiểm tra các điều kiện khác, ví dụ email hợp lệ
      if (!email || !fullName || !username || !password) {
          Alert.alert('Error', 'Please fill in all fields');
          return;
      }

      // Gọi hàm đăng ký từ AuthContext
      register(email, password, fullName, username, image);
  };


    return(
        <SafeAreaView style={styles.container}>
            <Spinner visible={isLoading} />
            <View style={styles.containerSmall}>
                <Text style={styles.title}>Register</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    value={fullName}
                    placeholder="Full Name"
                    onChangeText={(text) => setFullName(text)}
                />
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

                <View style={styles.pwdContainer}>
                    <TextInput
                        style={styles.inputpwd}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        secureTextEntry={!isConfirmPasswordVisible}
                    />
                    <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.iconContainer}>
                        <Icon name={isConfirmPasswordVisible ? 'eye-off' : 'eye'} size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <Button title="Register" onPress={() =>{
                    register(email, password, fullName, username);
                }} />
                <View style={styles.register}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{color: 'blue'}}>Sign in?</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </SafeAreaView>
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
  

export default RegisterScreen;