import * as Updates from 'expo-updates';
import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalProvider } from './app/components/context/GlobalState'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Alert, StyleSheet, Text } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import ClientScreen from './app/components/screen/ClientScreen'
import OTPScreen from './app/components/screen/OTPScreen'
import Screen from './app/components/Screen';

import RecoveryScreen from './app/components/screen/RecoveryScreen';
import AuthNavigator from './app/components/navigation/AuthNavigator';
import AddMemberScreen from './app/components/screen/AddMemberScreen';
import RegisterScreen from './app/components/screen/RegisterScreen';
import LoginScreen from './app/components/screen/LoginScreen';
import { StoreProvider } from './app/components/screen/GlobalState';
import AdminHomeScreen from './app/components/screen/AdminHomeScreen';
import WelcomeScreen from './app/components/screen/WelcomeScreen';
import TransferScreen from './app/components/screen/TransferScreen';
import CashierHomeScreen from './app/components/screen/CashierHomeScreen';
import RiderHomeScreen from './app/components/screen/RiderHomeScreen';
import TopButtons from './app/components/screen/TopButtons';
import SummaryScreen from './app/components/screen/SummaryScreen';
import ClientFormScreen from './app/components/screen/ClientFormScreen';
import HomeScreen from './app/components/screen/HomeScreen';
import PaymentScreen from './app/components/screen/PaymentScreen';
import RiderAssignScreen from './app/components/screen/RiderAssignScreen';
import DetailScreen from './app/components/screen/DetailScreen';
import AppPasswordInput from './app/components/AppPasswordInput';
import IconButton from './app/components/IconButton';
import { Title } from 'react-native-paper';
import Header from './app/components/Header';
import CashierHomeScreenCopy from './app/components/screen/CashierHomeScreenCopy';
import AdminHomeScreenCopy from './app/components/screen/AdminHomeScreenCopy';
import RiderHomeScreenCopy from './app/components/screen/RiderHomeScreenCopy';
import WelcomeScreenCopy from './app/components/screen/WelcomeScreenCopy';
import RegisterScreenCopy from './app/components/screen/RegisterScreenCopy';
import LoginScreenCopy from './app/components/screen/LoginScreenCopy';
import ClientFormScreenCopy from './app/components/screen/ClientFormScreenCopy';

import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  // added dummy user for testing
  const [Role, setRole] = useState({})
  const [ClientId, setClientId] = useState([])
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();


  console.log(expoPushToken, "expoPushToken");
  console.log(notification, "notification");
  // OA-RH_T6ed4KCqLCyAVY64nkwk5hhUp7mdRpMqDm
  // console.log(Role, "Set GolbalState Data");
  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }

  const fetchLatestAppVersion = async () => {
    let a = com.anostrat.kollectIt
    // const { com.anostrat.kollectIt } = Constants.manifest.android;
    const url = `https://play.google.com/store/apps/details?id=${com.anostrat.kollectIt}`;

    // const url = 'https://play.google.com/store/apps/details?id=com.miniclip.eightballpool';
    // console.log(url, "ddddddddddddddddddd");

    try {
      const response = await fetch(url);
      console.log(response, "response");
      const html = await response.text();

      // Extract the latest version number from the HTML
      const match = html.match(/Current Version:.*?>(.*?)</);
      console.log(match, "match");
      const latestVersion = match ? match[1] : null;
      console.log(latestVersion);
      // return latestVersion;
    } catch (error) {
      console.log('Error fetching latest app version:', error);
      return null;
    }
  };

  const checkForUpdate = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        // An update is available, check if it's the latest version
        const latestVersion = await fetchLatestAppVersion();

        if (latestVersion && latestVersion !== update.manifest.version) {
          // Prompt the user to update
          // You can use any UI component or library to display a prompt to the user
          // For example, you can use the `react-native-modal` library to show a modal
          // with the update prompt
          // console.log('Update available:', latestVersion);
        }
      }
    } catch (error) {
      console.log('Error checking for update:', error);
    }
  };

  const checkAppVersion = async () => {
    try {
      const { manifest } = await Updates.fetchUpdateAsync();
      const appVersion = manifest.version;
      // console.log('App version:', appVersion);

      // Use the app version as needed
      // For example, you can compare it with a server version or display it in your UI
    } catch (error) {
      console.log('Error checking app version:', error);
    }
  };


  useEffect(() => {
    // checkForUpdate();
    // checkAppVersion()
    fetchLatestAppVersion()
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };


  }, [])


  // useEffect(() => {
  //   if (requestUserPermission()) {
  //     messaging().getToken().then(token => {
  //       console.log(token);
  //     })
  //   } else {
  //     console.log("fail token status");
  //   }
  //   messaging().getInitialNotification().then(async remoteMessage => {
  //     if (remoteMessage) {
  //       console.log("Nutification Caused app to open", remoteMessage.notification);
  //     }
  //   })

  //   messaging().onNotificationOpenedApp(async remoteMessage => {
  //     console.log(remoteMessage.notification, "Notification  caused open from backgroung State");
  //   })

  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //   });

  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, [])

  return (
    // <Screen>
    // <AddMemberScreen/>
    // <AdminHomeScreen/>
    // <CashierHomeScreen/>
    // <ClientFormScreen/>
    // <ClientScreen/>
    // <HomeScreen/>
    // <PaymentScreen/>
    // <RecoveryScreen/>
    // <RiderAssignScreen/>
    // <RiderHomeScreen/>
    // <SummaryScreen/>
    //  <TransferScreen/>
    // <IconButton
    //   title={'Title'}
    //   subTitle={'Sub-Title'}
    //   image={require('./app/assets/delivery-man.png')}
    // />

    // <Header/>
    // <CashierHomeScreenCopy/>
    // <AdminHomeScreenCopy/>
    // <RiderHomeScreenCopy/>
    // <WelcomeScreenCopy/>
    // <RegisterScreenCopy/>
    // <LoginScreenCopy/>
    // <ClientFormScreenCopy/>
    // <DetailScreen/>


    // <WelcomeScreen/>
    //  <RegisterScreen/> 
    // <LoginScreen/>

    // <RiderHomeScreen/>
    // <OTPScreen/>
    // <TopButtons/>

    // <StoreProvider value={{ Role, setRole }}>
    //   <NavigationContainer>
    //     <AuthNavigator />
    //   </NavigationContainer>
    // </StoreProvider>



    <StoreProvider value={{ Role, setRole, ClientId, setClientId }}>
      <NavigationContainer>
        {/* <Text>Your expo push token: {expoPushToken}</Text>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text> */}
        <AuthNavigator />
      </NavigationContainer>
    </StoreProvider>


    // <AppPasswordInput
    //   icon={'lock'}
    // />


  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})


async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}