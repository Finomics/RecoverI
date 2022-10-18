import React, { useEffect, useState, useContext } from 'react'

import { Image, ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';
import * as Yup from 'yup';

import Screen from '../Screen';
import { AppForm, AppFormField, AppFormPassword, SubmitButton } from '../forms';
import AppButton from '../AppButton';
import axios from 'axios';
import StoreContext from './GlobalState';
import TopButtons from './TopButtons';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
});


function ChangePassword({ navigation }) {
    
    
    const [load, setLoad] = useState(false)

    const contextData = useContext(StoreContext);

     console.log("Role",contextData.Role);

    const handlePress = (values) => {
        console.log(values.email, "login");
        setLoad(previousState => !previousState)
        console.log(load)
        axios({
            method: "post",
            url: "https://paym-api.herokuapp.com/auth/login",
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
            contextData.setRole(res.data)
            if (res.data.Role === 'Admin') {
                navigation.navigate('Admin Home')

            } else if (res.data.Role === 'Cashier') {

                navigation.navigate('Cashier Home')

            } else if (res.data.Role === "Rider") {

                navigation.navigate('RiderHomeScreen')

            } else {
                navigation.navigate('Welcome Screen')

            }

        }).catch((err) => {
            console.log(err, "employee not found");
            alert("Login error, please retry later");
            setLoad(previousState => !previousState);
        })


    }

    return (
        <Screen style={styles.container}>
            <TopButtons header={''} navigation={navigation}/>
            <ScrollView>
                <Image
                    style={styles.logo}
                    source={require('../../assets/logo.png')}
                />
                <AppForm
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values, { resetForm }) => {
                        handlePress(values)
                        // , resetForm({ values: initialValues });
                    }}
                    validationSchema={validationSchema}
                >
                    <AppFormPassword
                        autoCapitalize='none'
                        autoCorrect={false}
                        icon='lock'
                        name='password'
                        placeholder='Password Old'
                        textContentType='password'
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
export default ChangePassword; 