import React from 'react';

import { Image, ScrollView, StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import * as Yup from 'yup';

import Screen from '../Screen';
import { AppForm, AppFormField, SubmitButton } from '../forms';
import AppButton from '../AppButton';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
});


function LoginScreen( {navigation} ) {

    return (
        <Screen style={styles.container}>
            <ScrollView>
                <Image
                    style={styles.logo}
                    source={require('../../assets/logo.png')}
                />
                <AppForm
                    initialValues={{email:'', password:''}}
                    onSubmit={values => console.log(values)}
                    validationSchema={validationSchema}
                >
                    <AppFormField
                        autoCapitalize='none' 
                        autoCorrect={false}
                        icon='email'
                        keyboardType='email-address'
                        name='email'
                        placeholder='Email'
                        textContentType='emailAddress' 
                    />
                    <AppFormField
                        autoCapitalize='none' 
                        autoCorrect={false}
                        icon='lock'
                        name='password'
                        placeholder='Password'
                        secureTextEntry={true} 
                        textContentType='password'
                    />
                    <SubmitButton 
                        title='Login'
                    />
                </AppForm>
            </ScrollView>

            <AppButton 
                title='By pass to home Screen' 
                color='black'
                onPress={()=> navigation.navigate('HomeScreen')}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 20,
    },
    logo:{
        width: '100%',
        height: 120,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
})
export default LoginScreen; 