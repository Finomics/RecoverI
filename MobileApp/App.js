import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StyleSheet } from 'react-native';

import ClientScreen from './app/components/screen/ClientScreen'
import OTPScreen from './app/components/screen/OTPScreen'
import Screen from './app/components/Screen';

import RecoveryScreen from './app/components/screen/RecoveryScreen';
import AuthNavigator from './app/components/navigation/AuthNavigator';


export default function App() {
  return (
    // <Screen>
    //   <ClientScreen/>
    // </Screen>
    <NavigationContainer>
      <AuthNavigator/>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems: 'center',
  },
})