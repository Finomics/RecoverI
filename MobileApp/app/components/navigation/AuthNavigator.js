import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OTPScreen from '../screen/OTPScreen';
import RecoveryScreen from "../screen/RecoveryScreen";
import ClientScreen from "../screen/ClientScreen";
import HomeScreen from "../screen/HomeScreen";
import RiderAssignScreen from "../screen/RiderAssignScreen";
import PaymentScreen from "../screen/PaymentScreen";
// import ClientFormScreen from "../screen/ClientFormScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator=()=> (
    <Stack.Navigator>
        {/* <Stack.Screen name='ClientFormScreen' component={ClientFormScreen} /> */}
        <Stack.Screen name='ClientScreen' component={ClientScreen} />
        <Stack.Screen name='RecoveryScreen' component={RecoveryScreen} />
        <Stack.Screen name='OTPScreen' component={OTPScreen} />
        <Stack.Screen name='PaymentScreen' component={PaymentScreen} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='RiderAssignScreen' component={RiderAssignScreen} />
    </Stack.Navigator>
)

export default AuthNavigator;