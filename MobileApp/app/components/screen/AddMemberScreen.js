import React, { useState } from 'react';

import { View, Image, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import Constants from 'expo-constants';
import DropDownPicker from 'react-native-dropdown-picker'


import { AppForm, AppFormField, SubmitButton } from '../forms';
import Screen from '../Screen'
import colors from '../colors';
import axios from "axios";


const validationSchema = Yup.object().shape({
    email: Yup.string().required().label("email"),
    password: Yup.string().required().min(4).label("Password"),
});

function AddMemberScreen(props) {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Rider', value: 'Rider' },
        { label: 'Cashier', value: 'Cashier' },
    ]);



    const handlePress = ({ values, value }) => {
   
        console.log(values, value, "a");
        axios({
            method: "post",
            url: "https://paym-api.herokuapp.com/auth/employe",
            data: {
                email: values.email,
                password: values.password,
                Role: value,
            },
        })
            .then((res) => {
                console.log(res.data, "response");
                alert(`youe ${value} hase been created`)
            })
            .catch((err) => {
                console.log(err, "error");
            });


    }

    return (
        <Screen style={styles.backGround}>
            <View style={styles.logoContainer}>
                <Image
                    style={{ width: 330, height: 140 }}
                    source={require('../../assets/logo.png')}
                />
            </View>
            <View style={styles.inputContianer}>

                <AppForm
                    initialValues={{ email: '', password: '' }}
                    // onSubmit={values => console.log(values, value,":sasas")}
                    onSubmit={values => { handlePress({ values, value }) }}
                    validationSchema={validationSchema}
                >
                    <AppFormField
                        autoCapitalize='none'
                        autoCorrect={false}
                        icon='account-circle-outline'
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

                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        style={{ backgroundColor: colors.lightGrey, borderRadius: 25 }}
                    />

                    <SubmitButton title='Confirm'
                      color='teal' />
                </AppForm>

            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    backGround: {
        backgroundColor: '#D6DCE5',
        flex: 1,
    },
    logo: {
        height: 120,
        width: 300,
    },
    logoContainer: {
        alignItems: 'center',
        width: '100%',
        marginVertical: 10,
    },
    inputContianer: {
        paddingHorizontal: 15,
    },
})

export default AddMemberScreen;