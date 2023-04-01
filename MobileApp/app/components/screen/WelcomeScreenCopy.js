import React from 'react';

import { View, StyleSheet, Image, Dimensions, Text, ScrollView } from 'react-native';
import Screen from '../Screen';
import Header from '../Header';
import AppButtonNew from '../AppButtonNew';

const {width, height} = Dimensions.get('screen');

function WelcomeScreenCopy(props) {
    return (
        <Screen>
            <Header
                header={'Welcome'}
            />
            <View style={{width: width, marginBottom: 60, justifyContent: 'center'}}>
                <Image
                    style={{width: width, height: height*0.25,}}
                    source={require('../../assets/banner_2.png')}
                />
            </View>
            <ScrollView >
                <View style={styles.container}>
                    <View style={styles.form}>
                        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: 30}}>
                            <Image
                                style={{width: width*0.35}}
                                source={require('../../assets/pngtree.png')}
                                />
                        </View>
                        <AppButtonNew
                            title={'Login'}
                            width='90%'
                            color='#B4C6D1'
                            />
                        <AppButtonNew
                            title={'Register'}
                            width='90%'
                            color='#FFFFFF'
                            />
                    </View>
                </View>
            </ScrollView>

        </Screen>
    );
}

const styles = StyleSheet.create({
    container:{
        // backgroundColor: 'red',
        // flexDirection: 'row',
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    form:{
        backgroundColor: '#578B9D',
        width: width*0.9,
        // height: 400,
        borderRadius: 25,
        paddingTop: 10,
        paddingBottom: 50,
    },
});

export default WelcomeScreenCopy;