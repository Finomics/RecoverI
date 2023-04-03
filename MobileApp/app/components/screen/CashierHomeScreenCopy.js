import React from 'react';

import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';

import Header from '../Header';
import IconButton from '../IconButton';
import Screen from '../Screen';
import AppText from '../AppText';

const {width, height} = Dimensions.get('screen');

function CashierHomeScreenCopy({navigation}) {


    const handleAssignRider=()=>{
        console.log('Assign Rider')
    }
    const handleAddClient=()=>{
        console.log('Add Client');
        navigation.navigate('Client Form');
    }
    const handleDeposit=()=>{
        console.log('Deposit')
    }
    const handleViewPayments=()=>{
        console.log('View Payments')
    }

    return (
        <Screen>
            <Header
                header={'Cashier'}
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
                    title={'Assign Rider'}
                    subTitle={'Sub-Title'}
                    image={require('../../assets/delivery-man.png')}
                    onPress={handleAssignRider}
                />
                <IconButton
                    title={'Add Client'}
                    subTitle={'Sub-Title'}
                    image={require('../../assets/add-user.png')}
                    onPress={handleAddClient}
                />
                <IconButton
                    title={'Deposit'}
                    subTitle={'Sub-Title'}
                    image={require('../../assets/deposit.png')}
                    onPress={handleDeposit}
                />
                <IconButton
                    title={'View Payments'}
                    subTitle={'Sub-Title'}
                    image={require('../../assets/credit-card.png')}
                    onPress={handleViewPayments}
                />
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container:{},
});

export default CashierHomeScreenCopy;