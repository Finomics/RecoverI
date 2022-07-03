import React, { useState } from 'react';

import { Image, ScrollView, StyleSheet } from 'react-native';
import * as Yup from 'yup';

import Screen from '../Screen';
import { AppForm, AppFormField, SubmitButton } from '../forms';
import AppText from '../AppText';
import colors from '../colors';
// import LogoName from '../components/LogoName';


const validationSchema = Yup.object().shape({
    clientID: Yup.string().required().label("Client ID"),
    clientName: Yup.string().required().label("Client Name"),
    contact: Yup.string().required().label("Contact"),
    email: Yup.string().required().email().label("Email"),
    amount: Yup.string().required().label("Amount"),
});

function ClientFormScreen(props) {
    const initialValues={clientID:'', clientName:'', cnic:'', contact:'', email:'', amount:''}
    // let values=null;
    
    return (
        <Screen style={styles.container}>
            <ScrollView>
            <AppText style={styles.header}>Client Input Form</AppText>
            <AppForm
                initialValues={initialValues}
                onSubmit = {(values)=>console.log(values)}
                validationSchema={validationSchema}
            >
                <AppFormField
                    autoCapitalize='none' 
                    autoCorrect={false}
                    icon='card-account-details-outline'
                    keyboardType='default'
                    name='clientID'
                    placeholder='Client ID'
                    textContentType='givenName' 
                />
                <AppFormField
                    autoCapitalize='words' 
                    autoCorrect={false}
                    icon='account-outline'
                    keyboardType= 'default'
                    name='clientName'
                    placeholder='Client Name'
                    // secureTextEntry={true} 
                    textContentType='name'
                />
                <AppFormField
                    autoCapitalize='none' 
                    autoCorrect={false}
                    icon='cellphone-settings'
                    keyboardType= 'numeric'
                    name='contact'
                    placeholder='Client Contact Number'
                    // secureTextEntry={true} 
                    textContentType='telephoneNumber'
                />
                <AppFormField
                    autoCapitalize='none' 
                    autoCorrect={false}
                    icon='email-outline'
                    keyboardType= 'email-address'
                    name='email'
                    placeholder='Client Email'
                    // secureTextEntry={true} 
                    textContentType='emailAddress'
                />
                <AppFormField
                    autoCapitalize='none' 
                    autoCorrect={false}
                    icon='currency-rupee'
                    keyboardType= 'numeric'
                    name='amount'
                    placeholder='Client Amount'
                    // secureTextEntry={true} 
                    textContentType='none'
                />
                <SubmitButton 
                    title='Confirm'
                    color='teal'
                />
            </AppForm>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container:{
        padding: 10,
    },
    header:{
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '900',
    },
})

export default ClientFormScreen;