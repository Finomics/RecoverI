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
        <Stack.Screen name='Welcome' component={WelcomeScreen} />
        <Stack.Screen name='Change Password' component={ChangePassword} />
        <Stack.Screen name='Add Member' component={AddMemberScreen} />
        <Stack.Screen name='Admin Home' component={AdminHomeScreen}/>
        <Stack.Screen name='Cashier Home' component={CashierHomeScreen} />
        <Stack.Screen name='Client Form' component={ClientFormScreen} />
        <Stack.Screen name='Client Screen' component={ClientScreen} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='OTP Screen' component={OTPScreen} />
        <Stack.Screen name='Payment Screen' component={PaymentScreen} />
        <Stack.Screen name='Recovery Screen' component={RecoveryScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Assign Rider' component={RiderAssignScreen} />
        <Stack.Screen name='Rider Home' component={RiderHomeScreen} />
        <Stack.Screen name='All Payments' component={UnverifierPaymentScreen} />
        <Stack.Screen name='Transfer Screen' component={TransferScreen} />
        <Stack.Screen name='Summary Screen' component={SummaryScreen} />
        <Stack.Screen name='Transactions' component={DetailScreen} />
        {/* <Stack.Screen name='Change Password' component={ChangePassword}/> */}
    </Stack.Navigator>
)

export default AuthNavigator;