import React, { useState } from 'react';

import { Image, StyleSheet, Switch, TouchableOpacity, View, ScrollView } from 'react-native';

import Screen from '../Screen';
import Icon from '../Icon';
import AppTextInput from '../AppTextInput';
import ImageInput from '../ImageInput';
import CameraInput from '../CameraInput';
import colors from '../colors';
import AppButton from '../AppButton';
import AppText from '../AppText';
import { postRequest } from '../APIcalls/postRequests'
import axios from 'axios';




function RecoveryScreen({ navigation, route }) {

  const [isNew, setIsNew] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [Img, setImage] = useState("");


  const listing = route.params;

  const PaymentId = listing.ClientId.toString()
  const PaymentName = listing.ClientName
  const PaymentNumber = listing.ClientPhoneNumber
  const PaymentEmail = listing.ClientEmail
  // const Paymentamount = textInput
  // const imageUrl = Img
  // console.log(PaymentNumber, PaymentName, "PaymentID");



  const handlePress = () => {
  }

  const handleContinue = async () => {
    let mode=(isNew)?"Cheque":"Cash";
let payload ={

  PaymentId: PaymentId,
  PaymentName: PaymentName,
  PaymentNumber: PaymentNumber,
  PaymentEmail: PaymentEmail,
  PaymentMode: mode,
  PaymentAmount: textInput,
  imageUrl: Img,


  status: "false"

}
console.log("Payload",payload);
    axios({
      method: 'post',
      url: 'https://paym-api.herokuapp.com/PaymentData',
       data:payload , withCredentials: true
    })
      .then((response) => {
        var a = response.data
        // console.log(JSON.stringify(response.data), "response");
        alert("Send Otp for Check Email")
        navigation.navigate('OTPScreen', a)

      })
      .catch((error) => {
        console.log(error, "error");
      })


  }


  if (imageUri === null) {
    console.log("not image");
  } else {

    var formData = new FormData
    formData.append("image", {
      uri: imageUri,
      type: "image/jpg",
      name: "photo.jpg"
    })
    axios({
      method: 'post',
      url: "https://paym-api.herokuapp.com/upload",
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(res => {
        // console.log(JSON.stringify(res.data.ImageUrl), "res");
        setImage(res.data.ImageUrl)
      })
      .catch(err => { console.log(err, "error"); })
  }




  // console.log(Img,"ImgImgImgImg");

  return (
    <Screen style={styles.backGround}>
      <View style={styles.logoContainer}>
        <Image
          style={{ width: 330, height: 140 }}
          source={require('../../assets/logo.png')}
        />
      </View>
      <ScrollView>
        <View style={styles.inputContainer}>
          <AppText style={styles.name}>{listing.ClientName}</AppText>
          <AppTextInput
            placeholder='Amount'
            icon='currency-rupee'
            keyboardType='numeric'
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
              onValueChange={newValue => setIsNew(newValue)}
            />
          </View>
        </View>
        <View style={styles.image}>
          <CameraInput
            imageUri={imageUri}
            onChangeImage={uri => setImageUri(uri)
            }
          />

          <AppButton title='Continue' color='royalBlue' onPress={() => handleContinue()} />
        </View>
        <View style={styles.iconBar}>
          <Icon name='home' backgroundColor={colors.backGround} iconColor={colors.royalBlue} onPress={handlePress} />
          <Icon name='account' backgroundColor={colors.backGround} iconColor={colors.royalBlue} />
          <Icon name='magnify' backgroundColor={colors.backGround} iconColor={colors.royalBlue} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  backGround: {
    backgroundColor: '#D6DCE5',
    flex: 1,
  },
  chequeBarContainer: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 15,
  },
  chequeBarRight: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chequeBarLeft: {
    width: '50%',
    justifyContent: 'center',
  },
  iconBar: {
    marginVertical: 15,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  image: {
    alignItems: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
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
  name: {
    fontWeight: '900',
    fontSize: 20,
    fontStyle: 'italic',
    color: colors.primary,
  },
  text: {
    fontWeight: '900',
    fontStyle: 'italic',
    textAlign: 'right',
  },
});


export default RecoveryScreen;