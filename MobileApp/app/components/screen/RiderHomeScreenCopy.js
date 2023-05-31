import React, { useEffect, useState, useContext } from 'react'
import StoreContext from './GlobalState';

import { View, StyleSheet, Image, Dimensions, ScrollView, Text } from 'react-native';
import AppText from '../AppText';

import Header from '../Header';
import IconButton from '../IconButton';
import Screen from '../Screen';

const {width, height} = Dimensions.get('screen');

function RiderHomeScreenCopy({navigation}) {
    const contextData = useContext(StoreContext);
    const [user,setUser]=useState(contextData.Role);

    const handleClientList=()=>{
        console.log('handleClientList');
        navigation.navigate('Clients Listing');
    }
    const handlePaymentCollection=()=>{
        console.log('handlePaymentCollection');
        navigation.navigate('Collections')
    }
    const handleVerifyPayments=()=>{
        console.log('handleVerifyPayments');;
        navigation.navigate('All Payments');
    }
    const handleTransfer=()=>{
        console.log('handleTransfer');
        navigation.navigate('Transfer');
    }
    const handlePasswordChange=()=>{
        console.log('handlePasswordChang');
        navigation.navigate('Change Password');
    }

    return (
        <Screen>
            <Header
                header={'Rider Home'}
                navigation={navigation}
            />
           <View style={{alignItems: 'center',backgroundColor:"white"}}>
                <AppText style={{color:"#2E6C81"}}>
                    Welcome : {user.employeeName}
                </AppText>
            </View>
            <View style={{width: width, height: height*0.2, justifyContent: 'center'}}>
                <Image
                    style={{width: width, height: height*0.13,}}
                    source={require('../../assets/kollectit.png')}
                />

            </View>
            <ScrollView>
                <IconButton
                    title={'Client List'}
                    subTitle={'View list of clients assigned to you.'}
                    image={require('../../assets/client-list.png')}
                    onPress={handleClientList}
                />
                <IconButton
                    title={'Payment Collection'}
                    subTitle={'View all payments collected by you.'}
                    image={require('../../assets/payment-collection.png')}
                    onPress={handlePaymentCollection}
                />
                <IconButton
                    title={'Verify Payments'}
                    subTitle={'View Unverified Payments to verify'}
                    image={require('../../assets/verify-payments.png')}
                    onPress={handleVerifyPayments}
                />
                <IconButton
                    title={'Transfer'}
                    subTitle={'Transfer payments to cashier'}
                    image={require('../../assets/transfer.png')}
                    onPress={handleTransfer}
                />
                 <IconButton
                    title={'Change Password'}
                    subTitle={'Change Password'}
                    image={require('../../assets/password.png')}
                    onPress={handlePasswordChange}
                />
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container:{},
});

export default RiderHomeScreenCopy;