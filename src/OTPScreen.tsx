import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react'
import { Text, TouchableOpacity } from 'react-native';
import { StyleSheet, TextInput, View } from 'react-native';
import useOTP from '../hooks/useOTP';
import AsyncStorage from '@react-native-async-storage/async-storage';


  
const OTPScreen = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(60);
    const inputs = useRef<Array<TextInput | null>>([]);
    const navigation = useNavigation<NavigationProp<{ Login: undefined }>>();
    const { verifyOTP, resendOTP } = useOTP(); // Get OTP functions from useOTP

    const [username, setUsername] = useState('');

    useEffect(() => {
        // Load username when component mounts
        const loadUsername = async () => {
        try {
            const savedUsername = await AsyncStorage.getItem('username');
            if (savedUsername) {
            setUsername(savedUsername);
            }
        } catch (error) {
            console.error('Error loading username:', error);
        }
    };

    loadUsername();
  }, []);

    useEffect(() => {
        if (timer > 0) {
          const interval = setInterval(() => setTimer(timer - 1), 1000);
          return () => clearInterval(interval);
        }
      }, [timer]);
  
  
    const handleOtpChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    
        if (value && index < otp.length - 1) {
            inputs.current[index + 1]?.focus();
        }
    };

    
    
  
  
    const handleKeyPress = (e: any, index: number) => {
      if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    };
  
    const handleVerifyOTP = () => {
        const otpString = otp.join('');
        // Add your OTP verification logic here
        verifyOTP(otpString, username);
    
        console.log('Verifying OTP:', otpString);
      };
    
      const handleResendOTP = () => {
        setTimer(60);
          // Add your resend OTP logic here    
          resendOTP(username);

      };
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Verification Code</Text>
          <Text style={styles.subtitle}>
            Please enter the verification code sent to your email
          </Text>
  
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => inputs.current[index] = ref}
                style={styles.otpInput}
                maxLength={1}
                keyboardType="number-pad"
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>
  
          <TouchableOpacity 
            style={styles.verifyButton}
            onPress={handleVerifyOTP}
          >
            <Text style={styles.verifyButtonText}>Verify</Text>
          </TouchableOpacity>
  
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>
              {timer > 0 ? `Resend code in ${timer}s` : "Didn't receive code?"}
            </Text>
            {timer === 0 && (
              <TouchableOpacity onPress={handleResendOTP}>
                <Text style={styles.resendLink}>Resend</Text>
              </TouchableOpacity>
            )}
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
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: '#666',
      textAlign: 'center',
      marginBottom: 30,
    },
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 30,
    },
    otpInput: {
      width: 50,
      height: 50,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      textAlign: 'center',
      fontSize: 24,
      backgroundColor: '#f9f9f9',
    },
    verifyButton: {
      backgroundColor: '#007AFF',
      borderRadius: 10,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    verifyButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    resendContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
    },
    resendText: {
      color: '#666',
      fontSize: 14,
    },
    resendLink: {
      color: '#007AFF',
      fontSize: 14,
      fontWeight: '500',
      },
      loginContainer: {
        flexDirection: 'row',
        marginTop: 20,
        gap: 5
    }
  });
export default OTPScreen