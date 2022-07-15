import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OTPScreen from '../screen/OTPScreen';
import RecoveryScreen from "../screen/RecoveryScreen";
import ClientScreen from "../screen/ClientScreen";
import HomeScreen from "../screen/HomeScreen";
import RiderAssignScreen from "../screen/RiderAssignScreen";
import AddMemberScreen from "../screen/AddMemberScreen";
import PaymentScreen from "../screen/PaymentScreen";
import ClientFormScreen from "../screen/ClientFormScreen";
import RegisterScreen from '../screen/RegisterScreen';
import LoginScreen from '../screen/LoginScreen';
import AdminHomeScreen from "../screen/AdminHomeScreen";
import CashierHomeScreen from "../screen/CashierHomeScreen";
import RiderHomeScreen from "../screen/RiderHomeScreen";
import WelcomeScreen from "../screen/WelcomeScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
        <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='AdminHomeScreen' component={AdminHomeScreen}/>
        <Stack.Screen name='CashierHomeScreen' component={CashierHomeScreen} />
        <Stack.Screen name='RiderHomeScreen' component={RiderHomeScreen} />
        <Stack.Screen name='AddMemberScreen' component={AddMemberScreen} />
        <Stack.Screen name='ClientFormScreen' component={ClientFormScreen} />
        <Stack.Screen name='ClientScreen' component={ClientScreen} />
        <Stack.Screen name='RecoveryScreen' component={RecoveryScreen} />
        <Stack.Screen name='OTPScreen' component={OTPScreen} />
        <Stack.Screen name='PaymentScreen' component={PaymentScreen} />
        <Stack.Screen name='RiderAssignScreen' component={RiderAssignScreen} />
    </Stack.Navigator>
)

export default AuthNavigator;