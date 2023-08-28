import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Image, Dimensions, Text, ScrollView } from 'react-native';
import Screen from '../Screen';
import Header from '../Header';
import AppButtonNew from '../AppButtonNew';
import { Url } from './Core';
import StoreContext from './GlobalState';
import axios from 'axios';


const { width, height } = Dimensions.get('screen');

function WelcomeScreenCopy({ navigation }) {


    let AdminRole = useContext(StoreContext);

    const loginHandler = async () => {

        let User_Details = await AsyncStorage.getItem('User');

        // console.log("from Async", User_Details);

        if (User_Details != null) {
            const user = JSON.parse(User_Details)
            console.log("UserDetail by default", user);
            axios({
                method: "post",
                url: Url + '/auth/login',
                data: {
                    loginId: user.loginId,
                    password: user.password,
                }
            }).then((res) => {

                console.log(res.data.Role, "Response Welcom Role");

                AdminRole.setRole(res.data)
                if (res.data.Role === 'Admin') {
                    navigation.navigate('Admin Home')

                } else if (res.data.Role === 'Cashier') {

                    navigation.navigate('Cashier Home')

                } else if (res.data.Role === "Rider") {

                    navigation.navigate('Rider Home')

                } else {
                    navigation.navigate('Welcome')

                }

            }).catch((err) => {
                console.log(err, "employee not found");
                // navigation.navigate('Login')
                alert("You have entered incorrect login credentials. Please try again");
            })
        } else {
            alert("Fast login not available")
        }
    }
    return (
        <Screen>
            <Header
                header={'Welcome'}
                navigation={navigation}
            />
            <View style={{ width: width, marginBottom: 60, justifyContent: 'center' }}>
                <Image
                    style={{ width: width, height: height * 0.20, }}
                    source={require('../../assets/kollectit.png')}
                />
            </View>
            <ScrollView >
                <View style={styles.container}>
                    <View style={styles.form}>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: 30 }}>
                            <Image
                                style={{ width: width * 0.35 }}
                                source={require('../../assets/pngtree.png')}
                            />
                        </View>
                        <AppButtonNew
                            title={'Login'}
                            onPress={() => navigation.navigate('Login')}
                            width='90%'
                            color='#B4C6D1'
                        />
                        <AppButtonNew
                            title={'Register'}
                            onPress={() => navigation.navigate('Register')}
                            width='90%'
                            color='#FFFFFF'
                        />
                        <AppButtonNew
                            title='Fast Login'
                            onPress={loginHandler}
                            width='90%'
                            color='#B4C6D1'
                        />
                    </View>
                </View>
            </ScrollView>

        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        // flexDirection: 'row',
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    form: {
        backgroundColor: '#578B9D',
        width: width * 0.9,
        // height: 400,
        borderRadius: 25,
        paddingTop: 10,
        paddingBottom: 50,
    },
});

export default WelcomeScreenCopy;