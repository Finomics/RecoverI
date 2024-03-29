import React, { useEffect, useState, useContext } from 'react'
import StoreContext from './GlobalState';

import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';

import Header from '../Header';
import IconButton from '../IconButton';
import Screen from '../Screen';
import AppText from '../AppText';

const { width, height } = Dimensions.get('screen');

function AdminHomeScreenCopy({ navigation }) {

    const contextData = useContext(StoreContext);
    const [user, setUser] = useState(contextData.Role);

    let name="user";

    let str = user.employeeName;

    if(str.indexOf(' ')!=-1){

    name=str.substring(0, str.indexOf(' '));

    }else{
        name=str;
    }

    const handleAddMember = () => {
        console.log('handleAddMember');
        navigation.navigate("Add Member")
    }
    const handleClientList = () => {
        console.log('handleClientList')
        navigation.navigate("Clients Listing");
    }
    const handleReporting = () => {
        console.log('handleReporting');
        navigation.navigate("Summary");
    }
    const handleTransaction = () => {
        console.log('handleTransaction');
        navigation.navigate("Transactions");
    }
    const handlePasswordChange = () => {
        console.log('handlePasswordChang');
        navigation.navigate('Change Password');
    }
    return (
        <Screen>
            <Header
                header={'Admin'}
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
               <ScrollView automaticallyAdjustKeyboardInsets={true}>
                <IconButton
                    title={'Add Member'}
                    subTitle={'Add Cashier or Riders'}
                    image={require('../../assets/add-member.png')}
                    onPress={handleAddMember}
                />
                <IconButton
                    title={'Client List'}
                    subTitle={'View Clients Listing'}
                    image={require('../../assets/clients-list.png')}
                    onPress={handleClientList}
                />
                <IconButton
                    title={'Reports'}
                    subTitle={'View Collections'}
                    image={require('../../assets/document.png')}
                    onPress={handleReporting}
                />
                <IconButton
                    title={'Team Members'}
                    subTitle={'View Team Members'}
                    image={require('../../assets/client-list.png')}
                    onPress={() => navigation.navigate('TeamMember')}
                />
                <IconButton
                    title={'Transactions'}
                    subTitle={'View Transactions history'}
                    image={require('../../assets/transaction.png')}
                    onPress={handleTransaction}
                />
                <IconButton
                    title={'Change Password'}
                    subTitle={'Change your Password'}
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

export default AdminHomeScreenCopy;