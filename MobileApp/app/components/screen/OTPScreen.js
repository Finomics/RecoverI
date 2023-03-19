import { React, useEffect, useState, useRef, useContext } from 'react';
import { Dimensions, Text, View, TouchableOpacity, StyleSheet, TextInput, ScrollView, Modal, Alert, ActivityIndicator, Pressable, Image } from 'react-native';
import Screen from '../Screen';
import AppText from '../AppText';
import colors from '../colors';
import AppButton from '../AppButton';
import TopButtons from './TopButtons';
import axios from 'axios';
import StoreContext from './GlobalState';
import { Url } from './Core';

const {width, height} = Dimensions.get('window')


function OTPScreen({ navigation, route }) {
    console.log("IN OTP", route);
    const PaymentObjectId = route.params;



    let data = route;
    data={
        "_id":"640ac512f8ecc2fdd460845e",
        "PaymentClientId":"63fd93f39620c65296b8558c",
        "PaymentName":"Tata Client 02",
        "PaymentEmail":"hammad.tecstik@gmail.com",
        "PaymentNumber":"923452057798",
        "PaymentAmount":"250",
        "imageUrl":"https://storage.googleapis.com/toys-db4fb.appspot.com/1677578120630-undefined.jpg?GoogleAccessId=firebase-adminsdk-gosuz%40toys-db4fb.iam.gserviceaccount.com&Expires=16447017600&Signature=IOhjX6lSAhtaVv8YVfxY6t2MTt0uvcRmhIE1ESlH9xgLumL3ujrrNs2WbBliaPCpXw3TrXjrhGmbK1fhh9rDn0RCE%2B9NSgsMzAJDxtbc%2BfAe6ML%2BaiH5cO0u3FJdq2POmZ6DDaj5BJGQsEALVCjKzReSfSOYP8Al5oJk3BY1CtdTFS5F8pgMf0o%2FpeQGQ1iRiBNBkZRUK6Hgi5Pin4Cia%2Fj%2FKCUH0ZT4vOejWPZDfgM%2Fl0e8kI7wjs8%2FHAJK73hZ5SrbQzsyfITBt%2F1E6z7JpdGDh3HMM%2B4Ff6PRwme%2Fw5YCTGzOaiNIVy%2FMT62aPX13EOoT0LcUKa%2FDLp2LZemXAw%3D%3D",
        "PaymentMode":"Cash",
        "AssignedBy":"63eb21a7543e6577e25f1fc4",
        "VerificationCode":"2877",
        "BelongsTo":"63db55cf07ec951109a359c7",
        "heldby":"63eb2180543e6577e25f1fc1",
        "status":"Verified",
        "createdOn":"2023-03-10T05:50:10.524Z",
        "__v":0
     }
    let PaymentAmount = route.params;
    PaymentAmount=data.PaymentAmount;
    // const PaymentEmail = route.params;
    // const PaymentId = route.params;
    // const isNew = route.params;
    const mode = data.PaymentMode;
    const PayId = data.PaymentId;
    const PayObjectId = data._id;
    const ResendPaymentEmail = data.PaymentEmail;
    const RiderContextData = useContext(StoreContext)
    const ClientObjectId = RiderContextData.ClientId
    console.log(RiderContextData, "ClientObjectID000");

    const RiderID = RiderContextData.Role._id
    const BelongsTo = RiderContextData.Role.createdBy

    // console.log(RiderID, PayObjectId, "RiderNameRiderName");
    // console.log(PaymentObjectId._id, PayObjectId, "PaymentObjectId PayObjectId");
    // console.log(RiderContextData.ClientId, "ClientObjectIdClientObjectIdClientObjectId");
    // console.log(PaymentName, "PaymentName");
    // console.log(PaymentAmount, "PaymentAmount");
    // console.log(isNew, "isNew");
    // console.log(ResendPaymentEmail, "isNew");
    // console.log(BelongsTo, "BelongsTo");

    let modeOfPayment = {};
    if (mode === true) {
        modeOfPayment = 'Cheque'
    } else {
        modeOfPayment = 'Cash'
    }
    const pin1Ref = useRef(null);
    const pin2Ref = useRef(null);
    const pin3Ref = useRef(null);
    const pin4Ref = useRef(null);
    const [load, setLoad] = useState(false);
    const [pin1, setPin1] = useState('');
    const [pin2, setPin2] = useState('');
    const [pin3, setPin3] = useState('');
    const [pin4, setPin4] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    var OTP_Array = [pin1, pin2, pin3, pin4];
    var ReciveOtp = OTP_Array.join("");




    const handlePress = () => {
        setLoad(true);
        Alert.alert(
            'OTP Verification',
            'You have made the ' + modeOfPayment + " transaction of Rs. " + data.PaymentAmount + '.',
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        // console.log("OK Pressed")
                        // console.log(ReciveOtp, "OTP_Array");
                        axios({
                            method: 'post',
                            url: Url + '/ReciveOtpStep-2',
                            data: {
                                PaymentEmail: ResendPaymentEmail,
                                PaymentId: PayId,
                                otp: ReciveOtp,
                                PayObjectId: PayObjectId,
                                status: "Verified"
                            }
                        })
                            .then((response) => {
                                // console.log(JSON.stringify(response))
                                console.log(response.data, "response");
                                alert("payment status Updated");
                                setLoad(false);
                                navigation.navigate("Rider Home");
                                // transaction()
                            })
                            .catch((error) => {
                                // console.log(error, "error");
                                alert("Please send Correct Otp");
                                setLoad(false);
                            })
                        transaction();
                    }
                }
            ]
        );
    };

    function transaction() {

        console.log(PayObjectId, "Receive", PaymentAmount, ClientObjectId, RiderID, "transaction");

        axios({
            method: "post",
            url: Url + "/auth/transaction",
            data: {
                nature: "Collection",
                Instrument: [PayObjectId],
                PaymentAmount: [PaymentAmount.PaymentAmount],
                BelongsTo: BelongsTo,
                From: ClientObjectId,
                to: RiderID
            }
        }).then((res) => {
            console.log(res.data, "transaction Response");
            conformationEmail()
        }).catch((err) => {

            console.log(err, "transaction Error");
        })
    }

    function conformationEmail() {

        axios({
            method: "post",
            url: Url + "/conformationPayment",
            data: {
                ClinincObjectId: ClientObjectId,
            }
        }).then((res) => {
            console.log(res.data, "confirmationPayment Response");

        }).catch((err) => {

            console.log(err, "confirmationPayment Error");
        })
    }

    const ReSendOtp = () => {
        // console.log(ResendPaymentEmail, "ReSendOtp");
        axios({
            method: "post",
            url: Url + "/ReSendOTP",
            data: {
                PaymentEmail: ResendPaymentEmail
            }
        }).then((response) => {
            console.log(response.data, "OTP resent")
            alert("OTP resent");
        }).catch((error) => {
            console.log(error, "errorin otp resend");

        })
    }


    const handleImageModal=()=>{
        console.log('hello' + width)
        setModalVisible(true)

    }


    return (
        <Screen>
            <TopButtons header={'OTP Screen'} navigation={navigation} />
            <TouchableOpacity onPress={handleImageModal}>
                <View style={styles.descriptionContainer}>
                    <AppText style={{ fontWeight: '900' }}>Name: {data.PaymentName}</AppText>
                    <AppText style={{ fontWeight: '900' }}>Amount: {(data.PaymentAmount)}</AppText>
                    <AppText style={{ fontWeight: '900' }}>Mode of Payment: {(modeOfPayment)}</AppText>
                </View>
            </TouchableOpacity>
            <View style={styles.backgroundContainer}>
                <View style={styles.container}>
                    <AppText style={{ fontWeight: 'bold', }}> Please Insert OTP </AppText>
                    <View style={styles.inputContainer}>
                        <View style={styles.textContainer}>
                            <TextInput
                                ref={pin1Ref}
                                style={styles.textBox}
                                placeholder="0"
                                keyboardType='numeric'
                                maxLength={1}
                                onChangeText={(text) => {
                                    console.log(text.toString())
                                    OTP_Array[0] = text
                                    setPin1(text)
                                    if (text !== "") {
                                        pin2Ref.current.focus()
                                    }
                                }}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <TextInput
                                ref={pin2Ref}
                                style={styles.textBox}
                                placeholder="0"
                                keyboardType='numeric'
                                maxLength={1}
                                onChangeText={(text) => {
                                    console.log(text.toString())
                                    OTP_Array[1] = text
                                    setPin2(text)
                                    if (text !== "") {
                                        pin3Ref.current.focus()
                                    }
                                }}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <TextInput
                                ref={pin3Ref}
                                style={styles.textBox}
                                placeholder="0"
                                keyboardType='numeric'
                                maxLength={1}
                                onChangeText={(text) => {
                                    console.log(text.toString())
                                    OTP_Array[2] = text
                                    setPin3(text)
                                    if (text !== "") {
                                        pin4Ref.current.focus()
                                    }
                                }}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <TextInput
                                ref={pin4Ref}
                                style={styles.textBox}
                                placeholder="0"
                                keyboardType='numeric'
                                maxLength={1}
                                onChangeText={(text) => {
                                    console.log(text.toString())
                                    OTP_Array[3] = text
                                    setPin4(text)
                                    if (text !== "") {
                                        pin4Ref.current.focus()
                                    }
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.button}>

                        {
                            load ?
                                <ActivityIndicator
                                    size='large'
                                    color="#0000ff"
                                />
                                :
                                <AppButton
                                    title='Confirm'
                                    color='teal'
                                    onPress={handlePress}
                                />
                        }
                    </View>
                </View>
                <View style={{ width: '80%', marginTop: 20 }}>
                    <AppText>
                        Have not recieved OTP?
                    </AppText>
                    <AppButton
                        title='Resend OTP'
                        color='teal'
                        // color={colors.teal}
                        onPress={ReSendOtp}
                    />
                </View>
                

            </View>
            


            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
            >
                                   
                <View style={{marginVertical: 30, padding:3, alignItems: 'center' }}>
                    <Image
                        style={{width: width*0.9, height: (width*3/2)}}
                        source={{
                            uri: data.imageUrl,
                        }}
                    /> 
                </View>
            
                <Pressable
                    style={{margin: 10, alignSelf:'center'}}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <AppText>Go Back</AppText>
                </Pressable>
            </Modal>            


        </Screen>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '80%',
        height: 220,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.lightShade,
        padding: 10,
    },
    descriptionContainer: {
        marginVertical: 20,
        paddingVertical: 20,
        width: '75%',
        alignSelf:'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: colors.lightShade,
        borderWidth: 3,
        borderRadius: 25,
    },
    backgroundContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 20,
        width: '100%',
        justifyContent: 'space-evenly',
    },
    textContainer: {
        backgroundColor: colors.lightBlueShade,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderRadius: 15,
    },
    textBox: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        fontSize: 40,
        fontWeight: '700',
    },
    button: {
        alignItems: 'center'
    },
})
export default OTPScreen;