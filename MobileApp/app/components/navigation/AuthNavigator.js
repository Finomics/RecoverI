import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OTPScreen from '../screen/OTPScreen';
import RecoveryScreen from "../screen/RecoveryScreen";
import ClientScreen from "../screen/ClientScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator=()=> (
    <Stack.Navigator>
        <Stack.Screen name='ClientScreen' component={ClientScreen} />
        <Stack.Screen name='RecoveryScreen' component={RecoveryScreen} />
        <Stack.Screen name='OTPScreen' component={OTPScreen} />
    </Stack.Navigator>
)

export default AuthNavigator;