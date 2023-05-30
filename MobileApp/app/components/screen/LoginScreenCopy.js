import React, { useEffect, useState, useContext } from 'react'

import { Image, ScrollView, StyleSheet, ActivityIndicator, Dimensions, View, Text } from 'react-native';
import * as Yup from 'yup';

import Screen from '../Screen';
import { AppForm, AppFormField, AppFormPassword, SubmitButton } from '../forms';
import AppButton from '../AppButton';
import axios from 'axios';
import StoreContext from './GlobalState';
import TopButtons from './TopButtons';
import { Url } from './Core';
import Header from '../Header';
import { TouchableOpacity } from 'react-native';


const { width, height } = Dimensions.get('screen');
const validationSchema = Yup.object().shape({
    email: Yup.string().label("Email"),
    password: Yup.string().label("Password"),
});


function LoginScreenCopy({ navigation }) {


    const [load, setLoad] = useState(false)
    const [UserId, setChangeText] = useState('')
    const AdminRole = useContext(StoreContext);

    // console.log(AdminRole,"AdminRole");

    const handlePress = (values) => {
        console.log(values.email, "login");
        setChangeText(values.email)
        setLoad(previousState => !previousState)
        console.log(load)
        axios({
            method: "post",
            url: Url + '/auth/login',
            data: {
                email: values.email,
                password: values.password,
            }
        }).then((res) => {
            // console.log(res.data,"login Response");
            console.log(res.data.Role);
            // localStorage.setItem("Role", JSON.stringify(res.data.Role))
            alert("Login Successfully!")
            setLoad(previousState => !previousState)
            // console.log(email)
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
            alert("You have entered incorrect login credentials. Please try again");
            setLoad(previousState => !previousState);
        })


    }

    function forgrtPassword() {
        console.log(UserId);
        axios({
            method: "post",
            url: Url + '/dash/forgrtPassword',
            data: {
                employeeEmail: UserId
            }
        }).then((response) => {
            console.log(response.data, "Forget Password Response");
            alert("Forget Password Successfull!")
        }).catch(() => {
            console.log(error, "Forget Password Error");
        })
    }

    return (
        <Screen style={styles.container}>
            <Header
                header={'Login'}
                navigation={navigation}
            />
            <View style={{ width: width, marginBottom: 0, justifyContent: 'center' }}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/logo.png')}
                />
            </View>
            <ScrollView automaticallyAdjustKeyboardInsets={true}>
                <View style={styles.container}>
                    <View style={styles.form}>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: 30 }}>
                            <Image
                                style={{ width: width * 0.35 }}
                                source={require('../../assets/pngtree.png')}
                            />
                        </View>


                        <AppForm
                            initialValues={{ email: '', password: '' }}
                            onSubmit={(values, { resetForm }) => {
                                handlePress(values)
                                // , resetForm({ values: initialValues });
                            }}
                            validationSchema={validationSchema}
                        >
                            <AppFormField
                                autoCapitalize='none'
                                autoCorrect={false}
                                icon='email'
                                keyboardType='email-address'
                                name='email'
                                placeholder='Email or Phone'
                                textContentType='emailAddress'
                                onChange={(e)=>{setChangeText(e.terget.value)}}
                            // onChangeText={text => onChangeText(text)}

                            />
                            <AppFormPassword
                                autoCapitalize='none'
                                autoCorrect={false}
                                icon='lock'
                                name='password'
                                placeholder='Password New'
                                textContentType='password'
                            />
                            {
                                load ?
                                    <ActivityIndicator
                                        size='large'
                                        color="#0000ff"
                                    />
                                    :
                                    <SubmitButton
                                        title='Login'
                                        color='teal'
                                    />
                            }
                            <TouchableOpacity onPress={forgrtPassword}>
                                <Text style={{ color: "white", textAlign: "right", marginTop: 15 }}>Forget Password?</Text>
                            </TouchableOpacity>

                        </AppForm>
                    </View>
                </View>

            </ScrollView>

            {/* <AppButton
                title='By pass to home Screen'
                color='black'
            onPress={()=> navigation.navigate('HomeScreen')}
            /> */}
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
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
        paddingBottom: 30,
        paddingHorizontal: 10,
    },
    logo: {
        width: '100%',
        height: 120,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
})
export default LoginScreenCopy; 