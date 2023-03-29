import React from 'react';

import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';

import Header from '../Header';
import IconButton from '../IconButton';
import Screen from '../Screen';
import AppText from '../AppText';

const {width, height} = Dimensions.get('screen');

function AdminHomeScreenCopy(props) {


    const handleAddMember=()=>{
        console.log('handleAddMember')
    }
    const handleClientList=()=>{
        console.log('handleClientList')
    }
    const handleReporting=()=>{
        console.log('handleReporting')
    }
    const handleTransaction=()=>{
        console.log('handleTransaction')
    }

    return (
        <Screen>
            <Header
                header={'Admin'}
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
                    title={'Add Member'}
                    subTitle={'Sub-Title'}
                    image={require('../../assets/add-member.png')}
                    onPress={handleAddMember}
                />
                <IconButton
                    title={'Client List'}
                    subTitle={'Sub-Title'}
                    image={require('../../assets/clients-list.png')}
                    onPress={handleClientList}
                />
                <IconButton
                    title={'Reporting'}
                    subTitle={'Sub-Title'}
                    image={require('../../assets/document.png')}
                    onPress={handleReporting}
                />
                <IconButton
                    title={'Transactions'}
                    subTitle={'Sub-Title'}
                    image={require('../../assets/transaction.png')}
                    onPress={handleTransaction}
                />
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container:{},
});

export default AdminHomeScreenCopy;