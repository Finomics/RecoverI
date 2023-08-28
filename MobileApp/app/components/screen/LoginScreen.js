import React, { useEffect, useState, useContext } from 'react'

import { Image, ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';
import * as Yup from 'yup';

import Screen from '../Screen';
import { AppForm, AppFormField, AppFormPassword, SubmitButton } from '../forms';
import AppButton from '../AppButton';
import axios from 'axios';
import StoreContext from './GlobalState';
import TopButtons from './TopButtons';
import { Url } from './Core';

const validationSchema = Yup.object().shape({
    email: Yup.string().label("Email"),
    password: Yup.string().label("Password"),
});


function LoginScreen({ navigation }) {


    const [load, setLoad] = useState(false)

    const AdminRole = useContext(StoreContext);

    // console.log(AdminRole,"AdminRole");

    const handlePress = (values) => {
        console.log(values.email, "login");
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
            alert("Login Successfuly")
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

    return (
        <Screen style={styles.container}>
            <TopButtons header={''} navigation={navigation} />
               <ScrollView automaticallyAdjustKeyboardInsets={true}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/kollectit.png')}
                />
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

                </AppForm>
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
        paddingHorizontal: 20,
    },
    logo: {
        width: '100%',
        height: 120,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
})
export default LoginScreen; 