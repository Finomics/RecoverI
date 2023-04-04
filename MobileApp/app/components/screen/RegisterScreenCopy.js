import React, {useState} from 'react';

import { Image, ScrollView, StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';
import * as Yup from 'yup';
import Icon from '../Icon';
import { Url } from './Core';

import AppButton from '../AppButton';
import Screen from '../Screen';
import colors from '../colors';
import TopButtons from './TopButtons';
import { AppForm, AppFormField, AppFormPassword, SubmitButton } from '../forms';
import axios from 'axios';
import Header from '../Header';


const {width, height} = Dimensions.get('screen');
const validationSchema = Yup.object().shape({
    name: Yup.string().label("Name"),
    cName: Yup.string().label("CName"),
    sCode: Yup.string().label("SCode"),
    email: Yup.string().email().label("Email"),
    password: Yup.string().label("Password"),
});





function RegisterScreenCopy({ navigation }) {

    const [load, setLoad] = useState(false)

    const handlePress = (values) => {

        setLoad(previousState => !previousState)
         console.log(values, "registration form");
        axios({
            method: "post",
            url: Url+"/auth/employe_",
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
            <Header
                header={'Register'}
            />
            <View style={{width: width, marginBottom:60, justifyContent: 'center'}}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/logo.png')}
                />
            </View>
            <ScrollView>

                <View style={styles.container}>
                    <View style={styles.form}>
                        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: 30}}>
                            <Image
                                style={{width: width*0.35}}
                                source={require('../../assets/pngtree.png')}
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
                                autoCapitalize='words'
                                autoCorrect={false}
                                icon='card-account-details-outline'
                                name='cName'
                                placeholder='Company Name'
                                textContentType='name'
                                />
                                 <AppFormField
                                autoCapitalize='words'
                                autoCorrect={false}
                                icon='card-account-details-outline'
                                name='sCode'
                                placeholder='Company Short Code '
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
    form:{
        backgroundColor: '#578B9D',
        width: width*0.9,
        // height: 400,
        borderRadius: 25,
        paddingTop: 10,
        paddingBottom:30,
        paddingHorizontal: 10,
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
    logo: {
        width: '100%',
        height: 120,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
})
export default RegisterScreenCopy; 