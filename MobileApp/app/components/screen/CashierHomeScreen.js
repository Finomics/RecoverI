import React from 'react';

import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import Screen from '../Screen';
import AppText from '../AppText';
import Icon from '../Icon';
import colors from '../colors';
import TopButtons from './TopButtons';

function CashierHomeScreen({navigation}) {
    return (
        <Screen>
            <TopButtons header={''}navigation={navigation} />
            <View style={styles.logoContainer}>
                <Image  
                    source={require('../../assets/logo.png')}
                    style={styles.logoName}
                />
            </View>
            
            <View style={{width: '100%', height: '50%', paddingHorizontal: 20}}>
                <View style={{width: '100%', height: '50%', flexDirection: 'row'}}>
                    <View style={{ width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Icon 
                            name='motorbike' 
                            backgroundColor={colors.backGround}
                            iconColor={colors.teal}
                            size={150}
                            title='Assign Rider'
                             onPress={()=> navigation.navigate('Assign Rider Screen')}
                        />
                    </View>
                    <View style={{ width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Icon 
                            name='account-multiple-plus-outline' 
                            backgroundColor={colors.backGround}
                            iconColor={colors.teal}
                            size={150}
                            title='Add Client'
                            onPress={()=> navigation.navigate('Client Form')}
                        />
                    </View>
                </View>
                <View style={{ width: '100%', height: '50%', flexDirection: 'row'}}>
                    <View style={{ width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Icon 
                            name='file-document-edit-outline' 
                            backgroundColor={colors.backGround}
                            iconColor={colors.teal}
                            size={150}
                            title='Deposit'
                             onPress={()=> navigation.navigate('Transfer Screen')}//shuldbe PaymentScreen
                        />
                    </View>
                    <View style={{ width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Icon 
                            name='cash-multiple' 
                            backgroundColor={colors.backGround}
                            iconColor={colors.teal}
                            size={150}
                            title='View Payments'
                            onPress={()=> navigation.navigate('Unverified Payments Screen')}
                        />
                    </View>
                </View>

                <TouchableOpacity 
                    style={{width: '50%', alignSelf: 'flex-end', marginTop: 15,}}
                    onPress={()=> navigation.navigate('Change Password')}>
                    <AppText>
                        Change Password?
                    </AppText>
                </TouchableOpacity>

            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    logoContainer:{
        width: '100%',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    logoName:{
        width: '90%',
        height: 130,
    },

})

export default CashierHomeScreen;