import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import { AuthProvider } from './context/AuthContext';
import { StatusBar } from 'react-native';
import notifee, { AuthorizationStatus, EventType } from '@notifee/react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';



const App = () => {
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