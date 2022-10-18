import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OTPScreen from '../screen/OTPScreen';
import SummaryScreen from '../screen/SummaryScreen';
import DetailScreen from '../screen/DetailScreen';

import RecoveryScreen from "../screen/RecoveryScreen";
import ClientScreen from "../screen/ClientScreen";
import HomeScreen from "../screen/HomeScreen";
import RiderAssignScreen from "../screen/RiderAssignScreen";
import AddMemberScreen from "../screen/AddMemberScreen";
import PaymentScreen from "../screen/PaymentScreen";
import ClientFormScreen from "../screen/ClientFormScreen";
import RegisterScreen from '../screen/RegisterScreen';
import LoginScreen from '../screen/LoginScreen';
import ChangePassword from '../screen/ChangePassword';
import AdminHomeScreen from "../screen/AdminHomeScreen";
import CashierHomeScreen from "../screen/CashierHomeScreen";
import RiderHomeScreen from "../screen/RiderHomeScreen";
import WelcomeScreen from "../screen/WelcomeScreen";
import TransferScreen from "../screen/TransferScreen";
import UnverifierPaymentScreen from "../screen/UnverifierPaymentScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name='Change Password' component={ChangePassword} />
        <Stack.Screen name='Welcome Screen' component={WelcomeScreen} />
        <Stack.Screen name='AddMemberScreen' component={AddMemberScreen} />
        <Stack.Screen name='Admin Home' component={AdminHomeScreen}/>
        <Stack.Screen name='Cashier Home' component={CashierHomeScreen} />
        <Stack.Screen name='ClientFormScreen' component={ClientFormScreen} />
        <Stack.Screen name='ClientScreen' component={ClientScreen} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='OTPScreen' component={OTPScreen} />
        <Stack.Screen name='PaymentScreen' component={PaymentScreen} />
        <Stack.Screen name='RecoveryScreen' component={RecoveryScreen} />
        <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
        <Stack.Screen name='RiderAssignScreen' component={RiderAssignScreen} />
        <Stack.Screen name='Rider Home' component={RiderHomeScreen} />
        <Stack.Screen name='Unverified Payments Screen' component={UnverifierPaymentScreen} />
        <Stack.Screen name='TransferScreen' component={TransferScreen} />
        <Stack.Screen name='SummaryScreen' component={SummaryScreen} />
        <Stack.Screen name='Transactions' component={DetailScreen} />

    </Stack.Navigator>
)

export default AuthNavigator;