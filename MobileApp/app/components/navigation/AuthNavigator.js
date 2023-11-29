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
//import LoginScreenCopy from '../screen/LoginScreenCopy';
import ChangePasswordCopy from '../screen/changePasswordCopy';

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
import ClientFormScreenCopy from '../screen/ClientFormScreenCopy';
import RiderCard from "../RiderCard";
import TeamMember from "../screen/TeamMember/TeamMember";
import VIewClientMember_Sunny from "../screen/VIewClientMember_Sunny";
import SettingScreen from "../screen/SettingScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name='Welcome' component={ WelcomeScreenCopy}  options={{headerShown: false}} />
        <Stack.Screen name='SettingScreen' component={ SettingScreen }  options={{headerShown: false}} />
        <Stack.Screen name='ViewClientMember' component={ VIewClientMember_Sunny}  options={{headerShown: false}} />

        <Stack.Screen name='Login' component={LoginScreenCopy}  options={{headerShown: false}} />
        <Stack.Screen name='Change Password' component={ChangePasswordCopy}  options={{headerShown: false}}/>
        <Stack.Screen name='Assign Rider' component={RiderAssignScreen} options={{headerShown: false}} />
        <Stack.Screen name='Rider Home' component={RiderHomeScreenCopy}  options={{headerShown: false}}/>
        <Stack.Screen name='OTP Screen' component={OTPScreen}  options={{headerShown: false}} />
        <Stack.Screen name='Client Form' component={ClientFormScreenCopy}  options={{headerShown: false}} />
        <Stack.Screen name='Add Member' component={AddMemberScreen}  options={{headerShown: false}} />
        <Stack.Screen name='Admin Home' component={AdminHomeScreenCopy}  options={{headerShown: false}}/>
        <Stack.Screen name='Cashier Home' component={CashierHomeScreenCopy}  options={{headerShown: false}} />
        <Stack.Screen name='Clients Listing' component={ClientScreen}  options={{headerShown: false}} />
        {/* <Stack.Screen name='HomeScreen' component={HomeScreen} /> */}
        <Stack.Screen name='Collections' component={PaymentScreen} options={{headerShown: false}} />
        <Stack.Screen name='Recovery Screen' component={RecoveryScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Register' component={RegisterScreenCopy} options={{headerShown: false}} />
        <Stack.Screen name='All Payments' component={UnverifierPaymentScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Transfer' component={TransferScreen} options={{headerShown: false}} />
        <Stack.Screen name='Summary' component={SummaryScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Transactions' component={DetailScreen} options={{headerShown: false}} />
        <Stack.Screen name='RiderCard' component={RiderCard} options={{headerShown: false}} />
        <Stack.Screen name='TeamMember' component={TeamMember} options={{headerShown: false}} />
        {/* <Stack.Screen name='Change Password' component={ChangePassword}/> */}
    </Stack.Navigator>
)

export default AuthNavigator;