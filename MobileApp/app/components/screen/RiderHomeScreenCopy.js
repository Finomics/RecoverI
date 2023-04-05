import React from 'react';

import { View, StyleSheet, Image, Dimensions, ScrollView, Text } from 'react-native';
import AppText from '../AppText';

import Header from '../Header';
import IconButton from '../IconButton';
import Screen from '../Screen';

const {width, height} = Dimensions.get('screen');

function RiderHomeScreenCopy({navigation}) {


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

    return (
        <Screen>
            <Header
                header={'Rider'}
            />
            <View style={{alignItems: 'center'}}>
                <AppText>
                    Logged in as: "Hammad"
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
                    subTitle={'Sub-Title'}
                    image={require('../../assets/client-list.png')}
                    onPress={handleClientList}
                />
                <IconButton
                    title={'Payment Collection'}
                    subTitle={'Sub-Title'}
                    image={require('../../assets/payment-collection.png')}
                    onPress={handlePaymentCollection}
                />
                <IconButton
                    title={'Verify Payments'}
                    subTitle={'Sub-Title'}
                    image={require('../../assets/verify-payments.png')}
                    onPress={handleVerifyPayments}
                />
                <IconButton
                    title={'Transfer'}
                    subTitle={'Sub-Title'}
                    image={require('../../assets/transfer.png')}
                    onPress={handleTransfer}
                />
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container:{},
});

export default RiderHomeScreenCopy;