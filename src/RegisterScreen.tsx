import React, { useContext, useState } from "react";
import { StyleSheet, Text, Button, TextInput, View, SafeAreaView, TouchableOpacity, Alert, StatusBar, ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from "../context/AuthContext";
import useImagePicker from "../hooks/useImagePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = () => {
    const navigation = useNavigation<NavigationProp<{ OTPVerification: undefined }>>();
    const navigation2 = useNavigation<NavigationProp<{ Login: undefined }>>();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { image, pickImage } = useImagePicker(); // Dùng hook để chọn ảnh

    const {isLoading, Register} = useContext(AuthContext);


    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };
  
    const handleRegister = async () => {
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

        await AsyncStorage.setItem('username', username);

        try {
            // Gọi hàm đăng ký từ AuthContext
            await Register(email, password, fullName, username, image);
            // Navigate to OTP verification screen after successful registration
            navigation.navigate('OTPVerification');
        } catch (error) {
            console.error('Error during registration:', error);
            Alert.alert('Error', 'Registration failed. Please try again.');
        }
  };
  return (
    <View style={styles.mainContainer}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <ScrollView 
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
        >
            <Text style={styles.title}>Create Account</Text>
            
            <TouchableOpacity onPress={pickImage} style={styles.imagePickerContainer}>
                {image ? (
                    <Image source={{ uri: image.uri }} style={styles.profileImage} />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Icon name="camera" size={30} color="#666" />
                    </View>
                )}
            </TouchableOpacity>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    value={fullName}
                    onChangeText={setFullName}
                    placeholderTextColor="#666"
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    placeholderTextColor="#666"
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#666"
                  />
            
    
                
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!isPasswordVisible}
                        placeholderTextColor="#666"
                    />
                    <TouchableOpacity 
                        onPress={togglePasswordVisibility} 
                        style={styles.eyeIcon}
                    >
                        <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color="#666" />
                    </TouchableOpacity>
                </View>
                
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!isConfirmPasswordVisible}
                        placeholderTextColor="#666"
                    />
                    <TouchableOpacity 
                        onPress={toggleConfirmPasswordVisibility} 
                        style={styles.eyeIcon}
                    >
                        <Icon name={isConfirmPasswordVisible ? 'eye-off' : 'eye'} size={20} color="#666" />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity 
                style={styles.registerButton} 
                onPress={handleRegister}
                disabled={isLoading}
            >
                <Text style={styles.registerButtonText}>
                    {isLoading ? 'Creating Account...' : 'Register'}
                </Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <TouchableOpacity 
                    onPress={() => navigation2.navigate('Login')}
                >
                    <Text style={styles.loginLink}>Sign In</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.loginContainer}>
                {/* <Text style={styles.loginText}>OTP</Text> */}
                <TouchableOpacity 
                    onPress={() => navigation.navigate('OTPVerification')}
                >
                    <Text style={styles.loginLink}>OTP Verification</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </View>
);
};

const styles = StyleSheet.create({
mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
},
container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center'
},
title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333'
},
imagePickerContainer: {
    marginBottom: 20,
    elevation: 3,
},
profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50
},
imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed'
},
inputContainer: {
    width: '100%',
    gap: 15
},
input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    elevation: 2,
},
passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
},
passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16
},
eyeIcon: {
    padding: 12
},
registerButton: {
    backgroundColor: '#007AFF',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    elevation: 3,
},
registerButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
},
loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 5
},
loginText: {
    color: '#666'
},
loginLink: {
    color: '#007AFF',
    fontWeight: 'bold'
}
});


export default RegisterScreen;