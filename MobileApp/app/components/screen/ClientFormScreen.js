import React, { useState, useContext } from "react";

import { Image, ScrollView, StyleSheet, Text, ActivityIndicator } from "react-native";
import * as Yup from "yup";

import Screen from "../Screen";
import { AppForm, AppFormField, AppFormPhone, SubmitButton } from "../forms";
import AppText from "../AppText";
import colors from "../colors";
import axios from "axios";
import TopButtons from "./TopButtons";
import StoreContext from "./GlobalState";
import { Url } from "./Core";

// import LogoName from '../components/LogoName';

const validationSchema = Yup.object().shape({
  clientID: Yup.string().label("Client ID"),
  clientName: Yup.string().label("Client Name"),
  contact: Yup.string().label("Contact"),
  email: Yup.string().email().label("Email"),
  amount: Yup.string().label("Amount"),
});

function ClientFormScreen({ props, navigation }) {
  const initialValues = {
    clientID: "",
    clientName: "",
    cnic: "",
    contact: "",
    email: "",
    amount: "",
  };
  // let values=null;
  const GlobalEmployeeID = useContext(StoreContext)
  const [load, setLoad] = useState(false);

  const handlePress = (values) => {
    setLoad(true);
    console.log(values, "form");
    

    axios({
      method: "post",
      url: Url + "/ClientData",
      data: {
        ClientId: values.clientID,
        ClientName: values.clientName,
        ClientPhoneNumber: values.number.slice(1),
        ClientAmount: values.amount,
        ClientEmail: values.email,
        BelongsTo: GlobalEmployeeID.Role.createdBy,

      },
    })
      .then((res) => {
        var a = res.data;
        console.log(a, "response");
        alert("Form has been Submit!");
        setLoad(false);
      })
      .catch((err) => {
        console.log(err, "error");
      });
      
  };

  return (
    <Screen style={styles.container}>
      <TopButtons header={''} navigation={navigation} />
      <ScrollView>
        <AppText style={styles.header}>Client Input Form</AppText>
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
            name='number'
            placeholder='Contact Number'
            textContentType='emailAddress'
          />
          <Text style={{color: colors.teal}}>With country code without '00' or '+'</Text>
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
            icon="currency-rupee"
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
          <SubmitButton title="Confirm"
            color='teal' />
           }
        </AppForm>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "900",
  },
});

export default ClientFormScreen;
