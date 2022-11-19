import React from 'react';

import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import Screen from '../Screen';
import AppText from '../AppText';
import Icon from '../Icon';
import colors from '../colors';
import TopButtons from './TopButtons';

function RiderHomeScreen({navigation}) {
    return (
        <Screen>
            <TopButtons header={''} navigation={navigation}/>
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
                            name='account-plus-outline' 
                            backgroundColor={colors.backGround}
                            iconColor={colors.teal}
                            size={150}
                            title='Clients List'
                             onPress={()=> navigation.navigate('Client Screen')}
                        />
                    </View>
                    <View style={{ width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Icon 
                            name='cash-lock' 
                            backgroundColor={colors.backGround}
                            iconColor={colors.teal}
                            size={150}
                            title='Payments Collected'
                            onPress={()=> navigation.navigate('Payment Screen')}
                        />
                    </View>
                </View>
                <View style={{ width: '100%', height: '50%', flexDirection: 'row'}}>
                    <View style={{ width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Icon 
                            name='cash-check' 
                            backgroundColor={colors.backGround}
                            iconColor={colors.teal}
                            size={150}
                            title='Verify Payments'
                             onPress={()=> navigation.navigate('All Payments Screen')}//shuldbe PaymentScreen
                        />
                    </View>
                    <View style={{ width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Icon 
                            name='cash-refund' 
                            backgroundColor={colors.backGround}
                            iconColor={colors.teal}
                            size={150}
                            title='Transfer'
                            onPress={()=> navigation.navigate('Transfer Screen')}
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

export default RiderHomeScreen;