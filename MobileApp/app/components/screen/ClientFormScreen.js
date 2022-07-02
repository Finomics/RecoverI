import React, { useState } from "react";

import { Image, ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../Screen";
import { AppForm, AppFormField, SubmitButton } from "../forms";
import AppText from "../AppText";
import colors from "../colors";
import axios from "axios";
// import LogoName from '../components/LogoName';

const validationSchema = Yup.object().shape({
  clientID: Yup.string().label("Client ID"),
  clientName: Yup.string().label("Client Name"),
  contact: Yup.string().label("Contact"),
  email: Yup.string().email().label("Email"),
  amount: Yup.string().label("Amount"),
});

function ClientFormScreen(props) {
  const initialValues = {
    clientID: "",
    clientName: "",
    cnic: "",
    contact: "",
    email: "",
    amount: "",
  };
  // let values=null;

  const handlePress = (values) => {
    console.log(values.clientID, "form");

    axios({
      method: "post",
      url: "https://paym-api.herokuapp.com/ClientData",
      data: {
        ClientId: values.clientID,
        ClientName: values.clientName,
        ClientPhoneNumber: values.contact,
        ClientAmount: values.email,
        ClientEmail: values.amount,
      },
    })
      .then((res) => {
        var a = res.data;
        console.log(a, "response");
        alert("Form has been Submit!");
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  return (
    <Screen style={styles.container}>
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
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="cellphone-settings"
            keyboardType="numeric"
            name="contact"
            placeholder="Client Contact Number"
            // secureTextEntry={true}
            textContentType="telephoneNumber"
          />
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
          <SubmitButton title="Confirm" />
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
