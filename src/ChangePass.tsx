import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Alert, KeyboardAvoidingView, Platform, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import useUser from '../hooks/useUser';
import { AuthContext } from '../context/AuthContext';

const ChangePass = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // const navigation = useNavigation<NavigationProp<{ Login: undefined }>>();
    const { updatePassword } = useUser();
    const {Logout} = useContext(AuthContext);

    const validatePassword = () => {
      if (newPassword.length < 8) {
        Alert.alert('Invalid Password', 'New password must be at least 8 characters long');
        return false;
      }
      if (newPassword !== confirmPassword) {
        Alert.alert('Password Mismatch', 'New password and confirmation do not match');
        return false;
      }
      return true;
    };
  
    const handleChangePassword = async () => {
        if (!validatePassword()) return;
    
        setIsLoading(true);
        try {
          await updatePassword(oldPassword, newPassword);
          Alert.alert(
            'Success',
            'Password has been changed successfully',
            [{ text: 'OK', onPress: () => {
              Logout();
              // navigation.navigate('Login');
            }}]
          );
        } catch (error) {
          Alert.alert('Error', 'Failed to change password. Please verify your current password and try again.');
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
              source={require('../assets/images/Reset-password-amico.png')} // Make sure to add your image
              style={styles.image}
              resizeMode="contain"
            />
          </View>
  
          <Text style={styles.title}>Change Password</Text>
          <Text style={styles.subtitle}>
            Please enter your current password and choose a new secure password
          </Text>
  
          <View style={styles.inputContainer}>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Current Password"
                placeholderTextColor="#666"
                secureTextEntry={!showOldPassword}
                value={oldPassword}
                onChangeText={setOldPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowOldPassword(!showOldPassword)}
              >
                <Text>{showOldPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>
  
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="New Password"
                placeholderTextColor="#666"
                secureTextEntry={!showNewPassword}
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                <Text>{showNewPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>
  
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                placeholderTextColor="#666"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Text>{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>
          </View>
  
          <TouchableOpacity
            style={styles.button}
            onPress={handleChangePassword}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Change Password</Text>
            )}
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.backButton}
            // onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Cancel</Text>
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
      gap: 15,
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    input: {
      flex: 1,
      padding: 15,
      fontSize: 16,
      color: '#333',
    },
    eyeIcon: {
      padding: 15,
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

export default ChangePass