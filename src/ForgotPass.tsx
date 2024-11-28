import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useUser from '../hooks/useUser';

const ForgotPass = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation<NavigationProp<{ Login: undefined }>>();
    const { resetPassword } = useUser();


    const handleResetPassword = async () => {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address');
        return;
      }
  
      setIsLoading(true);
      try {
          // Implement your password reset logic here
          const success = await resetPassword(email);
          if (success) {
            Alert.alert(
              'Success',
              'Password reset instructions have been sent to your email',
              [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
            );
          } else {
            Alert.alert('Error', 'Failed to send reset instructions. Please try again.');
          }
        // For example: await auth.sendPasswordResetEmail(email);
        Alert.alert(
          'Success',
          'Password reset instructions have been sent to your email',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } catch (error) {
        Alert.alert('Error', 'Failed to send reset instructions. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/Forgot-password-amico.png')} // Make sure to add your image
              style={styles.image}
              resizeMode="contain"
            />
          </View>
  
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter your email address to receive password reset instructions
          </Text>
  
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
          </View>
  
          <TouchableOpacity
            style={styles.button}
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Reset Password</Text>
            )}
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Back to Login</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    content: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
    },
    imageContainer: {
      alignItems: 'center',
      marginBottom: 40,
    },
    image: {
      width: 200,
      height: 200,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginBottom: 30,
      paddingHorizontal: 20,
    },
    inputContainer: {
      marginBottom: 20,
    },
    input: {
      backgroundColor: '#f5f5f5',
      borderRadius: 10,
      padding: 15,
      fontSize: 16,
      color: '#333',
      borderWidth: 1,
      borderColor: '#ddd',
    },
    button: {
      backgroundColor: '#007AFF',
      borderRadius: 10,
      padding: 15,
      alignItems: 'center',
      marginBottom: 15,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    backButton: {
      alignItems: 'center',
    },
    backButtonText: {
      color: '#007AFF',
      fontSize: 16,
    },
  });

export default ForgotPass