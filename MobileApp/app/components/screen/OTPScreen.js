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
import Header from '../Header';

const { width, height } = Dimensions.get('window')


function OTPScreen({ navigation, route }) {
    console.log("IN OTP", route.params);
    const PaymentObjectId = route.params;

    const data = route.params;
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
    // const PaymentEmail = route.params;
    // const PaymentId = route.params;
    // const isNew = route.params;


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

    let modeOfPayment = '';
    if (mode === 'Cheque') {
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

        //    console.log(PayObjectId, "Receive", PaymentAmount, ClientObjectId, RiderID, "transaction");

        axios({
            method: "post",
            url: Url + "/auth/transaction",
            data: {
                nature: "Collection",
                Instrument: [PayObjectId],
                PaymentAmount: [data.PaymentAmount],
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


    const handleImageModal = () => {
        console.log('hello' + width)
        setModalVisible(true)

    }

    let Amount = parseInt(data.PaymentAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

    return (
        <Screen>
            <Header
                header={'OTP'}
                navigation={navigation}
            />
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/kollectit.png')}
                />
            </View>
            <TouchableOpacity onPress={handleImageModal}>
                <View style={styles.descriptionContainer}>
                    <AppText style={{ fontWeight: '900' }}>Name: {data.PaymentName}</AppText>
                    <AppText style={{ fontWeight: '900' }}>Amount: {Amount}</AppText>
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

                <View style={{ marginVertical: 30, padding: 3, alignItems: 'center' }}>
                    <Image
                        style={{ width: width * 0.9, height: (width * 3 / 2) }}
                        source={{
                            uri: data.imageUrl,
                        }}
                    />
                </View>

                <Pressable
                    style={{ margin: 10, alignSelf: 'center' }}
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
        alignSelf: 'center',
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
    logo: {
        height: 120,
        width: '90%',
    },
    logoContainer: {
        alignItems: 'center',
        width: '100%',
        marginVertical: 10,
        // backgroundColor: colors.
    },
})
export default OTPScreen;