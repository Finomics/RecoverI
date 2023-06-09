import React, { useEffect, useState, useContext } from 'react'
import StoreContext from './GlobalState';

import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';

import Header from '../Header';
import IconButton from '../IconButton';
import Screen from '../Screen';
import AppText from '../AppText';

const { width, height } = Dimensions.get('screen');

function CashierHomeScreenCopy({ navigation }) {
    const contextData = useContext(StoreContext);
    const [user, setUser] = useState(contextData.Role)
   
    let name="user";

    let str = user.employeeName;

    if(str.indexOf(' ')!=-1){

    name=str.substring(0, str.indexOf(' '));

    }else{
        name=str;
    }
    const handleClientList = () => {
        console.log('handleClientList');
        navigation.navigate('Clients Listing');
    }
    const handleAssignRider = () => {
        console.log('Assign Rider');
        navigation.navigate('Assign Rider');
    }
    const handleAddClient = () => {
        console.log('Add Client');
        navigation.navigate('Client Form');
    }
    const handleDeposit = () => {
        console.log('Deposit');
        navigation.navigate('Transfer')
    }
    const handleViewPayments = () => {
        console.log('View Payments');
        navigation.navigate('All Payments');
    }

    const handlePasswordChange = () => {
        console.log('handlePasswordChang');
        navigation.navigate('Change Password');
    }
    return (
        <Screen>
            <Header
                header={'Cashier Home'}
                navigation={navigation}
            />
            <View style={{ alignItems: 'center', backgroundColor: "white" }}>
                <AppText style={{ color: "#2E6C81" }}>
                    Welcome : {`${name} ( ${user.shortCode})`}
                </AppText>
            </View>
            <View style={{ width: width, height: height * 0.2, justifyContent: 'center' }}>
                <Image
                    style={{ width: width, height: height * 0.13, }}
                    source={require('../../assets/kollectit.png')}
                />

            </View>


            <ScrollView>
                <IconButton
                    title={'Assign Rider'}
                    subTitle={'Assign Rider to your clients'}
                    image={require('../../assets/delivery-man.png')}
                    onPress={handleAssignRider}
                />
                <IconButton
                    title={'Add Client'}
                    subTitle={'Add new Clients'}
                    image={require('../../assets/add-user.png')}
                    onPress={handleAddClient}
                />
                <IconButton
                    title={'Deposit'}
                    subTitle={'Deposit Payments'}
                    image={require('../../assets/deposit.png')}
                    onPress={handleDeposit}
                />
                <IconButton
                    title={'View Payments'}
                    subTitle={'view collected payments'}
                    image={require('../../assets/credit-card.png')}
                    onPress={handleViewPayments}
                />
                <IconButton
                    title={'Client List'}
                    subTitle={'View Clients &  collect Payments'}
                    image={require('../../assets/client-list.png')}
                    onPress={handleClientList}
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
    container: {},
});

export default CashierHomeScreenCopy;