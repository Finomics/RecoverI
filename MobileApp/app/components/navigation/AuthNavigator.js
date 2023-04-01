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
import CashierHomeScreenCopy from '../screen/CashierHomeScreenCopy';
import AdminHomeScreenCopy from '../screen/AdminHomeScreenCopy';
import RiderHomeScreenCopy from '../screen/RiderHomeScreenCopy';
import WelcomeScreenCopy from '../screen/WelcomeScreenCopy';
import RegisterScreenCopy from '../screen/RegisterScreenCopy';
import LoginScreenCopy from '../screen/LoginScreenCopy';


const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginScreenCopy} />
        <Stack.Screen name='Welcome' component={ WelcomeScreenCopy} />
        <Stack.Screen name='Rider Home' component={RiderHomeScreenCopy} />
        <Stack.Screen name='Change Password' component={ChangePassword} />
        <Stack.Screen name='OTP Screen' component={OTPScreen} />
        <Stack.Screen name='Add Member' component={AddMemberScreen} />
        <Stack.Screen name='Admin Home' component={AdminHomeScreen}/>
        <Stack.Screen name='Cashier Home' component={CashierHomeScreen} />
        <Stack.Screen name='Client Form' component={ClientFormScreen} />
        <Stack.Screen name='Clients Listing' component={ClientScreen} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='Collections' component={PaymentScreen} />
        <Stack.Screen name='Recovery Screen' component={RecoveryScreen} />
        <Stack.Screen name='Register' component={RegisterScreenCopy} />
        <Stack.Screen name='Assign Rider' component={RiderAssignScreen} />
        <Stack.Screen name='All Payments' component={UnverifierPaymentScreen} />
        <Stack.Screen name='Transfer' component={TransferScreen} />
        <Stack.Screen name='Summary' component={SummaryScreen} />
        <Stack.Screen name='Transactions' component={DetailScreen} />
        {/* <Stack.Screen name='Change Password' component={ChangePassword}/> */}
    </Stack.Navigator>
)

export default AuthNavigator;