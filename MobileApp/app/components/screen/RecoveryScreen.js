import React, { useContext, useState,useEffect } from "react";

import {
  Image,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import Screen from "../Screen";
import Icon from "../Icon";
import AppTextInput from "../AppTextInput";
import ImageInput from "../ImageInput";
import CameraInput from "../CameraInput";
import colors from "../colors";
import AppButton from "../AppButton";
import AppText from "../AppText";
import { postRequest } from "../APIcalls/postRequests";
import axios from "axios";
import StoreContext from "./GlobalState";
import TopButtons from "./TopButtons";
import { Url } from "./Core";
import Header from "../Header";

function RecoveryScreen({ navigation, route }) {
  const [isNew, setIsNew] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [Img, setImage] = useState("");
  const [load, setLoad] = useState(false);


  const listing = route.params;

  useEffect(()=> {
   console.log("in Recovery UseEffect",textInput);
}, []);

  const PaymentId = listing.ClientId.toString();
  const PaymentName = listing.ClientName;
  const PaymentNumber = listing.ClientPhoneNumber;
  const PaymentEmail = listing.ClientEmail;
  const ClientObjectId = listing._id;
  const assignedBy = listing.AssignedBy;
  const belongsTo = listing.BelongsTo;
  const RecoveryContext = useContext(StoreContext);

  // console.log(ClientObjectId, "ClientObjectId");
  // const Paymentamount = textInput
  // const imageUrl = Img
  // console.log(PaymentNumber, PaymentName, "PaymentID");
  const ClientObjId = RecoveryContext.setClientId(ClientObjectId);
  // console.log(RecoveryContext.ClientId);

  const handlePress = () => {};
  const handleCamera = (uro) => {
    console.log("in HandleCamera", uri);
    setImageUri(uri);
  };

  const handleContinue = async () => {
    if(textInput==""){
      alert("Please enter correct collection Amount");
    }else{

    
    setLoad(true);
    let mode = isNew ? "Cheque" : "Cash";
    let payload = {
      PaymentId: ClientObjectId,
      PaymentName: PaymentName,
      PaymentNumber: PaymentNumber,
      PaymentEmail: PaymentEmail,
      PaymentMode: mode,
      PaymentAmount: textInput,
      imageUrl: Img,
      heldby: RecoveryContext.Role._id,
      belongsTo:belongsTo,
      AssignedBy:assignedBy,
      status: "Unverified",
      Rider_id: RecoveryContext.Role._id,
    };

    console.log("Payload", payload);

    axios({
      method: "post",
      url: Url + "/PaymentData",
      data: payload,
      withCredentials: true,
    })
      .then((response) => {
        setTextInput("");
        // console.log("response from API", a.data);
        setLoad(false);
        var a = response.data;
        console.log("sending to OTP screen",a);
        navigation.navigate("OTP Screen", a);
        alert("confirmation OTP is sent");
      })
      .catch((error) => {
        console.log( "error in Payment Data",error.response.data);
       
        alert(error.response.data);
        setLoad(false);
      });
      setTextInput("");
  }
};

  if (imageUri === null) {
    console.log("not image");
  } else {
    var formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      type: "image/jpg",
      name: "photo.jpg",
    });
    axios({
      method: "post",
      url: Url + "/upload",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        // console.log(JSON.stringify(res.data.ImageUrl), "res");
        setImage(res.data.ImageUrl);
        setLoad(false);
      })
      .catch((err) => {
        console.log("error in image upload",err);
      });
  }

  // console.log(Img,"ImgImgImgImg");

  return (
    <Screen style={styles.backGround}>
      <Header
        header={'Recovery'}
        navigation={navigation}
      />
      <View style={styles.logoContainer}>
        <Image
          style={{ width: 330, height: 140 }}
          source={require("../../assets/kollectit.png")}
        />
      </View>
         <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View style={styles.inputContainer}>
          <AppText style={styles.name}>{listing.ClientName}</AppText>
          <AppTextInput
            placeholder="Amount"
            icon="currency-rupee"
            keyboardType="numeric"
            onChangeText={(textInput) => setTextInput(textInput)}
          />
        </View>
        <View style={styles.chequeBarContainer}>
          <View style={styles.chequeBarLeft}>
            <AppText style={styles.text}>Cheque</AppText>
          </View>
          <View style={styles.chequeBarRight}>
            <Switch
              value={isNew}
              onValueChange={(newValue) => setIsNew(newValue)}
            />
          </View>
        </View>
        <View style={styles.image}>
          <CameraInput
            imageUri={imageUri}
            setLoad={setLoad}
            onChangeImage={(uri) => setImageUri(uri)}
          />

          <View style={{width: '80%'}}>
              {load ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <AppButton
                  title="Continue"
                  color="buttonColor2"
                  onPress={() => handleContinue()}
                />
              )}
          </View>
        </View>
        {/* <View style={styles.iconBar}>
          <Icon
            name="home"
            backgroundColor={colors.backGround}
            iconColor={colors.royalBlue}
            onPress={handlePress}
          />
          <Icon
            name="account"
            backgroundColor={colors.backGround}
            iconColor={colors.royalBlue}
          />
          <Icon
            name="magnify"
            backgroundColor={colors.backGround}
            iconColor={colors.royalBlue}
          />
        </View> */}
      </ScrollView>
    </Screen>
  );

}

const styles = StyleSheet.create({
  backGround: {
    backgroundColor: "#D6DCE5",
    flex: 1,
  },
  chequeBarContainer: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 15,
  },
  chequeBarRight: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  chequeBarLeft: {
    width: "50%",
    justifyContent: "center",
  },
  iconBar: {
    marginVertical: 15,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  image: {
    alignItems: "center",
    marginVertical: 10,
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 20,
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
  name: {
    fontWeight: "900",
    fontSize: 20,
    fontStyle: "italic",
    color: colors.buttonColor2,
  },
  text: {
    fontWeight: "900",
    fontStyle: "italic",
    textAlign: "right",
  },
});

export default RecoveryScreen;
