import React, { useState, useContext } from "react";

import { Image, ScrollView, StyleSheet, View, Dimensions, ActivityIndicator } from "react-native";
import * as Yup from "yup";

import { AppForm, AppFormField, AppFormPhone, SubmitButton } from "../forms";
import { CommonActions, useNavigation } from '@react-navigation/native';

import Screen from "../Screen";
import AppText from "../AppText";
import colors from "../colors";
import axios from "axios";
import TopButtons from "./TopButtons";
import StoreContext from "./GlobalState";
import { Url } from "./Core";
import Header from "../Header";

// import LogoName from '../components/LogoName';

const {width, height} = Dimensions.get('screen');
const validationSchema = Yup.object().shape({
  clientID: Yup.string().label("Client ID"),
  clientName: Yup.string().label("Client Name").required('Client Name is required'),
  phone: Yup.string().label("phone").required('Phone is required'),
  email: Yup.string().email().label("Email"),
  amount: Yup.string().label("Amount"),
});

function ClientFormScreenCopy({ props, navigation }) {
  const initialValues = {
    clientID: "",
    clientName: "",
    cnic: "",
    phone: "",
    email: "",
    amount: "",
  };
  // let values=null;
  const GlobalEmployeeID = useContext(StoreContext)
  const [load, setLoad] = useState(false);

  const resetNavigation = useNavigation();


  const handleResetScreen = () => {
    resetNavigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Client Form' }],
        animation: true,
      })
    );
  };

  const handlePress = (values) => {
    setLoad(true);
    console.log(values, "form");
    

    axios({
      method: "post",
      url: Url + "/ClientData",
      data: {
        ClientId: values.clientID,
        ClientName: values.clientName,
        ClientPhoneNumber: values.phone.slice(1),
        ClientAmount: values.amount,
        ClientEmail: values.email,
        BelongsTo: GlobalEmployeeID.Role.createdBy,

      },
    })
      .then((res) => {
        var a = res.data;
        console.log(a, "response");
        alert("Client has been added");
        setLoad(false);
      })
      .catch((err) => {
        console.log(err, "error");
        alert("Error occured in submitting the form");
        setLoad(false);
      });

      handleResetScreen();
      
  };

    return (
        <Screen>
            <Header
                header={'Add Client'}
                navigation={navigation}
            />
            <View style={{width: width, marginBottom:60, justifyContent: 'center'}}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/kollectit.png')}
                />
            </View>
               <ScrollView automaticallyAdjustKeyboardInsets={true}>

                <View style={styles.container}>
                    <View style={styles.form}>
                        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: 30}}>
                            <Image
                                style={{width: width*0.35}}
                                source={require('../../assets/pngtree.png')}
                                />
                        </View>

                        <AppForm
                            initialValues={initialValues}
                            onSubmit={(values, { resetForm }) => {
                                handlePress(values), resetForm({ values: initialValues });
                            }}
                            validationSchema={validationSchema}
                        >
                            <AppFormField
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon="card-account-details-outline"
                                keyboardType="default"
                                name="clientID"
                                placeholder="Client ID"
                                textContentType="givenName"
                            />
                            <AppFormField
                                autoCapitalize="words"
                                autoCorrect={false}
                                icon="account-outline"
                                keyboardType="default"
                                name="clientName"
                                placeholder="Client Name"
                                // secureTextEntry={true}
                                textContentType="name"
                            />
                            <AppFormPhone
                                autoCapitalize='none'
                                autoCorrect={false}
                                icon='phone-outline'
                                keyboardType='numeric'
                                name='phone'
                                placeholder='Contact Number'
                                textContentType='emailAddress'
                            />
                            {/* <Text style={{color: colors.teal}}>With country code without '00' or '+'</Text> */}
                            <AppFormField
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon="email-outline"
                                keyboardType="email-address"
                                name="email"
                                placeholder="Client Email"
                                // secureTextEntry={true}
                                textContentType="emailAddress"
                            />
                            <AppFormField
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon=""
                                keyboardType="numeric"
                                name="amount"
                                placeholder="Client Amount"
                                // secureTextEntry={true}
                                textContentType="none"
                            />
                            {
                                load ?
                                    <ActivityIndicator
                                        size='large'
                                        color="#0000ff"
                                    />
                                    :
                                    <SubmitButton 
                                        title="Confirm"
                                        color='teal' 
                                    />
                            }
                        </AppForm>
                    </View>
                </View>


                
            </ScrollView>
        </Screen>
  );
}

const styles = StyleSheet.create({
    container: {
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
    header: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: "900",
    },
    logo: {
        width: '100%',
        height: 120,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
});

export default ClientFormScreenCopy;
