import React, {useState} from 'react';

import { Image, ScrollView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import * as Yup from 'yup';
import Icon from '../Icon';
import { Url } from './Core';

import AppButton from '../AppButton';
import Screen from '../Screen';
import colors from '../colors';
import TopButtons from './TopButtons';
import { AppForm, AppFormField, AppFormPassword, SubmitButton } from '../forms';
import axios from 'axios';

const validationSchema = Yup.object().shape({
    name: Yup.string().label("Name"),
    email: Yup.string().email().label("Email"),
    password: Yup.string().label("Password"),
});





function LoginScreen({ navigation }) {

    const [load, setLoad] = useState(false)

    const handlePress = (values) => {

        setLoad(previousState => !previousState)
        // console.log(values, "form");
        axios({
            method: "post",
            url: Url+"/auth/employe",
            data: {
                name: values.name,
                email: values.email,
                password: values.password,
                Role: "Admin",
            }
        }).then((res) => {

            alert("Admin has been Created")
            setLoad(previousState => !previousState)
            navigation.navigate('Welcome')

            // if(values.name=='Admin'){
            //     navigation.navigate('AdminHomeScreen')
            // }else if(values.name=='Cashier'){
            //     navigation.navigate('CashierHomeScreen')
            // }else if(values.name=='Rider') {
            //     navigation.navigate('RiderHomeScreen')
            // }
           

        }).catch((err) => { 
            console.log(err, "Admin Created Error");
            setLoad(previousState => !previousState); 
            alert ("Error in Registration: please try again later.");
            setLoad(false);
        })
    }


    return (
        <Screen style={styles.container}>
            <TopButtons header={''} navigation={navigation}/>
               <ScrollView automaticallyAdjustKeyboardInsets={true}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/kollectit.png')}
                        style={styles.logoName}
                    />
                    <Icon
                        name='account-tie-outline'
                        backgroundColor={colors.backGround}
                        iconColor={colors.secondary}
                        size={150}
                    />
                </View>
                <AppForm
                    initialValues={{ email: '', password: '', name: '' }}
                    onSubmit={(values, { resetForm }) => {
                        handlePress(values)
                        // , resetForm({ values: initialValues });
                    }}
                    validationSchema={validationSchema}
                >
                    <AppFormField
                        autoCapitalize='words'
                        autoCorrect={false}
                        icon='card-account-details-outline'
                        name='name'
                        placeholder='Name'
                        textContentType='name'
                    />
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
                                title='Register'
                                color='teal'
                            /> 
                    }

                    {/* <SubmitButton 
                        title='Register'
                        color='teal'
                    /> */}
                </AppForm>
            </ScrollView>

            {/* <view>Login</view> */}

            {/* <AppButton
                title='By pass to home Screen'
                color='black'
                onPress={() => navigation.navigate('HomeScreen')}
            /> */}
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        backgroundColor: colors.backGround,
        paddingBottom: 10,
    },
    logoContainer: {
        width: '100%',
        height: 250,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20,
    },
    logoName: {
        width: '100%',
        height: 120,
    },
})
export default LoginScreen; 