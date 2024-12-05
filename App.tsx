import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import { AuthProvider } from './context/AuthContext';
import { PermissionsAndroid, Platform, StatusBar } from 'react-native';
import notifee, { AuthorizationStatus, EventType } from '@notifee/react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';



const App = () => {
  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL; 
  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //     getFcmToken();
  //   }
  // };
  // const getFcmToken = async () => {
  //   const fcmToken = await messaging().getToken();
  //   // console.log('Your Firebase Token is:', fcmToken);
  //   if (fcmToken) {
  //     console.log('Your Firebase Token is:', fcmToken);
  //   } else {
  //     console.log('Failed', 'No token received');
  //   }
  // };
  // useEffect(() => {
  //   requestUserPermission();
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived in foreground!', JSON.stringify(remoteMessage));
  //   });
  //   return unsubscribe;
  // }, []);
  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
        } else {
          console.log('Location permission denied');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    async function requestUserPermission() {
      const setting = await notifee.requestPermission();

      if (setting.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
        console.log('Permissuon settings: ', setting);
      }
      else {
        console.log('Permission Denied');
      }
    }
    requestUserPermission();
  }, []);

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <StatusBar backgroundColor='#06bcee' />
        <Navigation />
      </AuthProvider>
    </GestureHandlerRootView>

  );
};



export default App;