import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Text,
  Linking,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Yup from "yup";
import Icon from "../Icon";
import { Url } from "./Core";

import AppButton from "../AppButton";
import Screen from "../Screen";
import colors from "../colors";
import TopButtons from "./TopButtons";
import { AppForm, AppFormField, AppFormPassword, SubmitButton } from "../forms";
import axios from "axios";
import Header from "../Header";
import { useEffect } from "react";
import TermsConditionModal from "./TermsConditionModal";

const { width, height } = Dimensions.get("screen");
const validationSchema = Yup.object().shape({
  name: Yup.string().label("Name"),
  cName: Yup.string().label("CName"),
  sCode: Yup.string().label("SCode"),
  email: Yup.string().email().label("Email"),
  phone: Yup.string().label("Phone"),
  password: Yup.string().label("Password"),
});

function RegisterScreenCopy({ navigation }) {
  const [load, setLoad] = useState(false);
  const [isSelected, setSelection] = useState(false);
  let [showPopup, setShowPopup] = useState(false);

  const handlePress = (values) => {
    console.log(values, "values");
    if (isSelected === true) {
      setLoad((previousState) => !previousState);
      console.log(values, "registration form");
      axios({
        method: "post",
        url: Url + "/auth/employe",
        data: {
          name: values.name,
          loginId: values.Phone, // login Id number email
          employeeContactNum: values.Phone, //
          email: values.email,
          password: values.password,
          companyName: values.cName,
          shortCode: values.sCode,
          Role: "Admin",
        },
      })
        .then((res) => {
          if (res.data.status === 200) {
            alert("Admin has been Created");
            setLoad((previousState) => !previousState);
            navigation.navigate("Welcome");
          } else {
            alert(res.data.message);
            setLoad((previousState) => !previousState);
          }

          // if(values.name=='Admin'){
          //     navigation.navigate('AdminHomeScreen')
          // }else if(values.name=='Cashier'){
          //     navigation.navigate('CashierHomeScreen')
          // }else if(values.name=='Rider') {
          //     navigation.navigate('RiderHomeScreen')
          // }
        })
        .catch((err) => {
          console.log(err, "Admin Created Error");
          setLoad((previousState) => !previousState);
          alert("Error in Registration: please try again later.");
          setLoad(false);
        });
    } else {
      Alert.alert("Alert", "Please accept terms and conditions");
    }
  };

  const handleClose = () => {
    setShowPopup(false);
  };
  const handleOpen = () => {
    setShowPopup(true);
    // Linking.openURL("https://github.com/tecstik")
  };

  useEffect(() => {
    if (!isSelected) {
      // handleClose();
    } else {
      // handleOpen();
    }
  }, [isSelected]);

  return (
    <Screen style={styles.container}>
      <Header header={"Register"} navigation={navigation} />
      <TermsConditionModal visible={showPopup} onClose={handleClose} />
      <View style={{ width: width, marginBottom: 0, justifyContent: "center" }}>
        <Image
          style={styles.logo}
          source={require("../../assets/kollectit.png")}
        />
      </View>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View style={styles.container}>
          <View style={styles.form}>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 30,
              }}
            >
              <Image
                style={{ width: width * 0.35 }}
                source={require("../../assets/pngtree.png")}
              />
            </View>

            <AppForm
              initialValues={{
                email: "",
                phone: "",
                password: "",
                name: "",
                cName: "",
                sCode: "",
              }}
              onSubmit={(values, { resetForm }) => {
                handlePress(values);
                // , resetForm({ values: initialValues });
              }}
              validationSchema={validationSchema}
            >
              <AppFormField
                autoCapitalize="words"
                autoCorrect={false}
                icon="card-account-details-outline"
                name="name"
                placeholder="Name"
                textContentType="name"
              />
              <AppFormField
                autoCapitalize="words"
                autoCorrect={false}
                icon="card-account-details-outline"
                name="cName"
                placeholder="Company Name"
                textContentType="name"
              />
              <AppFormField
                autoCapitalize="words"
                autoCorrect={false}
                icon="card-account-details-outline"
                name="sCode"
                placeholder="Company Short Code "
                textContentType="name"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                keyboardType="email-address"
                name="email"
                placeholder="Email"
                textContentType="emailAddress"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="phone"
                keyboardType="Phone-address"
                name="Phone"
                placeholder="Phone or Login Id"
                textContentType="Phone"
              />

              <AppFormPassword
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                name="password"
                placeholder="Password New"
                textContentType="password"
              />
              <View style={styles.checkboxContainer}>
                <View style={styles.section}>
                  <Checkbox
                    style={styles.checkbox}
                    value={isSelected}
                    onValueChange={setSelection}
                    color={isSelected ? "black" : undefined}
                  />
                  <Text>I accept </Text>
                  <TouchableOpacity
                    // onPress={() => setSelection(handleOpen())}
                    onPress={() =>
                      Linking.openURL(
                        "https://kollectit.tecstik.com/KollectIt-TermsOfUse"
                      )
                    }
                  >
                    <Text style={styles.paragraph}>Terms & Condition</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {load ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <SubmitButton title="Register" color="teal" />
              )}
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
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
  },
  form: {
    backgroundColor: "#578B9D",
    width: width * 0.9,
    // height: 400,
    borderRadius: 25,
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  logoContainer: {
    width: "100%",
    height: 250,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  logoName: {
    width: "100%",
    height: 120,
  },
  logo: {
    width: "100%",
    height: 120,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    // alignSelf: "center",
  },
  paragraph: {
    fontSize: 15,
    color: "white",
    textDecorationLine: "underline",
  },
  checkbox: {
    margin: 8,
    color: "white",
    borderColor: "white",
  },
});
export default RegisterScreenCopy;
