import React, { useEffect, useState } from 'react';
import registerNNPushToken from 'native-notify';
import { getIndieNotificationInbox } from 'native-notify';
import * as Updates from 'expo-updates';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalProvider } from './app/components/context/GlobalState'

import { Linking, StyleSheet } from 'react-native';
import AuthNavigator from './app/components/navigation/AuthNavigator';
import { StoreProvider } from './app/components/screen/GlobalState';

import ClientScreen from './app/components/screen/ClientScreen'
import OTPScreen from './app/components/screen/OTPScreen'
import Screen from './app/components/Screen';

import RecoveryScreen from './app/components/screen/RecoveryScreen';
import AddMemberScreen from './app/components/screen/AddMemberScreen';
import RegisterScreen from './app/components/screen/RegisterScreen';
import LoginScreen from './app/components/screen/LoginScreen';
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
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';


const setupNotificationResponseListener = () => {
  Notifications.addNotificationResponseReceivedListener(response => {
    const { notification } = response;
    const { data } = notification;
    Linking.openURL('https://play.google.com/store/apps/details?id=com.anostrat.kollectIt')
    // console.log(data, "data");
    console.log(response, "raza");
    // window.open('https://play.google.com/store/apps/details?id=com.anostrat.kollectIt')
    // Perform actions based on the notification data
    // let notifications = getIndieNotificationInbox('put your Indie Push Sub ID here as a string', 8894, 'Xvkd1z26mZdXP4RGbC0vEs');
    // console.log("notifications: ", notifications);
    // Linking.openURL('https://play.google.com/store/apps/details?id=com.anostrat.kollectIt');
    // if (data && data.url) {
    // Open the URL in a browser or navigate to a specific screen
    // }
  });

  // useEffect(async () => {
  // setData(notifications);
  // }, []);
};

export default function App() {

  registerNNPushToken(8894, 'Xvkd1z26mZdXP4RGbC0vEs');
  useEffect(() => {
    setupNotificationResponseListener();
  }, [])

  const [Role, setRole] = useState({})
  const [ClientId, setClientId] = useState([])

  // console.log(Role, "Set GolbalState Data");

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

  }, [])

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