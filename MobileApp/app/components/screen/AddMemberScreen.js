import React, { useContext, useState } from "react";

import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as Yup from "yup";
import Constants from "expo-constants";
import DropDownPicker from "react-native-dropdown-picker";

import { AppForm, AppFormField, AppFormPassword, SubmitButton } from "../forms";
import Screen from "../Screen";
import colors from "../colors";
import axios from "axios";
import TopButtons from "./TopButtons";
import StoreContext from "./GlobalState";
import { Url } from "./Core";
import Header from "../Header";

const validationSchema = Yup.object().shape({
  userName: Yup.string().required().label("User Name"),
  email: Yup.string().label("Email"),
  ConatactNumber: Yup.string().label("ConatactNumber"),
  password: Yup.string().required().min(4).label("Password"),
});

function AddMemberScreen({ navigation }) {
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Rider", value: "Rider" },
    { label: "Cashier", value: "Cashier" },
  ]);
  const createdByAdminId = useContext(StoreContext);

  console.log(createdByAdminId.Role.companyName, "createdBy");

  const handlePress = ({ values, value }) => {
    setLoad(true);
    console.log(values, value, "a");

    axios({
      method: "post",
      url: Url + "/auth/employe",
      data: {
        email: values.email,
        password: values.password,
        Role: value,
        createdBy: createdByAdminId.Role._id,
        companyName: createdByAdminId.Role.companyName,
        shortCode: createdByAdminId.Role.shortCode,
        employeeContactNum: values.ConatactNumber,
        name: values.userName,
      },
    })
      .then((res) => {
        // console.log(res.data, "response");
        if (res.data.status === 200) {
          setLoad(false);
          alert(`your ${value} is successully created`);
        } else {
          alert(res.data.message);
          setLoad((previousState) => !previousState);
        }
      })
      .catch((err) => {
        console.log(err, "error");
        alert("error in creating user");
        setLoad(false);
        AudioScheduledSourceNode(false);
      });
  };

  return (
    <Screen style={styles.backGround}>
      <Header header={"Add Member"} navigation={navigation} />
      <View style={styles.logoContainer}>
        <Image
          style={{ width: 330, height: 100 }}
          source={require("../../assets/kollectit.png")}
        />
      </View>
      <ScrollView>
        <View style={styles.inputContianer}>
          <AppForm
            initialValues={{ email: "", password: "", userName: "" }}
            // onSubmit={values => console.log(values, value,":sasas")}
            onSubmit={(values) => {
              handlePress({ values, value });
            }}
            validationSchema={validationSchema}
          >
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="account-circle-outline"
              keyboardType="email-address"
              name="userName"
              placeholder="User Name"
              textContentType="emailAddress"
            />

            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email-outline"
              keyboardType="email-address"
              name="email"
              placeholder="Login Id"
              textContentType="emailAddress"
            />

            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="phone-outline"
              keyboardType="Number"
              name="ConatactNumber"
              placeholder="Contact Number"
              textContentType="ConatactNumber"
            />
            <AppFormPassword
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password"
              placeholder="New Password"
              textContentType="password"
            />

            <DropDownPicker
              open={open}
              value={value}
              translation={{
                PLACEHOLDER: "Select a role",
              }}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={{
                backgroundColor: colors.lightGrey,
                borderRadius: 25,
                marginVertical: 25,
              }}
            />
            {load ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <SubmitButton title="Confirm" color="teal" />
            )}
          </AppForm>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  backGround: {
    backgroundColor: "#D6DCE5",
    flex: 1,
  },
  logo: {
    height: 120,
    width: 300,
  },
  logoContainer: {
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
  inputContianer: {
    paddingHorizontal: 15,
  },
});

export default AddMemberScreen;
