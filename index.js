/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);

//     // Display a notification
//     await notifee.displayNotification({
//         title: remoteMessage.notification.title,
//         body: remoteMessage.notification.body,
//         android: {
//             channelId: 'default',
//             smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
//         },
//     });
// });

// Handle foreground events
// notifee.onForegroundEvent(async ({ type, detail }) => {
//     const { notification, pressAction } = detail;

//     switch (type) {
//         case EventType.DISMISSED:
//             console.log('User dismissed notification', notification);
//             break;
//         case EventType.PRESS:
//             console.log('User pressed notification', notification);
//             if (pressAction.id === 'default') {
//                 // Handle the action
//                 console.log('User pressed the default action');
//             }
//             break;
//         case EventType.DELIVERED:
//             console.log('Notification delivered with title:', notification.title);
//             break;
//     }
// });

notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;

    if (type === EventType.ACTION_PRESS && pressAction.id === 'default') {
        // Handle the action
        console.log('User pressed the notification');
    }

    if (type === EventType.DELIVERED) {
        console.log('Notification delivered in background with title:', notification.title);
    }
});

AppRegistry.registerComponent(appName, () => App);
