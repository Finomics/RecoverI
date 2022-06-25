import React, { useState, useRef } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import Screen from '../Screen';
import AppText from '../AppText';
import colors from '../colors';
import AppButton from '../AppButton';
import axios from 'axios';


function OTPScreen({ navigation, route }) {

    const PaymentName = route.params;
    const PaymentAmount = route.params;
    const PaymentId = route.params;
    const isNew = route.params;
    const PayId = PaymentId.PaymentId
    console.log(PaymentName, "PaymentName");
    console.log(PaymentAmount, "PaymentAmount");
    console.log(PayId, "PaymentAmount");
    console.log(isNew, "isNew");

    let modeOfPayment = {};

    if (isNew === true) {
        modeOfPayment = 'Cheque'
    } else {
        modeOfPayment = 'Cash'
    }

    const pin1Ref = useRef(null);
    const pin2Ref = useRef(null);
    const pin3Ref = useRef(null);
    const pin4Ref = useRef(null);

    const [pin1, setPin1] = useState('');
    const [pin2, setPin2] = useState('');
    const [pin3, setPin3] = useState('');
    const [pin4, setPin4] = useState('');

    var OTP_Array = [pin1, pin2, pin3, pin4];
    var ReciveOtp = OTP_Array.join("");

    const handlePress = () => {
        // console.log(isNew)
        Alert.alert(
            'OTP Verification',
            'You have made the ' + modeOfPayment + " transaction of Rs. " + PaymentAmount.PaymentAmount + '.',
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
                            url: 'https://paym-api.herokuapp.com/ReciveOtpStep-2',
                            data: {
                                PaymentId: PayId.toString(),
                                otp: ReciveOtp,
                                status: "True"
                            }
                        })
                            .then((response) => {
                                // console.log(JSON.stringify(response))
                                alert("Stutus Update")
                            })
                            .catch((error) => {
                                // console.log(error, "error");
                                alert("Please Correct Otp")
                            })
                    }

                }

            ]
        );
    };

    return (
        <Screen>
            <View style={styles.descriptionContainer}>
                <AppText style={{ fontWeight: '900' }}>Name: {PaymentName.PaymentName}</AppText>
                <AppText style={{ fontWeight: '900' }}>Amount: {(PaymentAmount.PaymentAmount)}</AppText>
                <AppText style={{ fontWeight: '900' }}>Mode of Payment: {(modeOfPayment)}</AppText>
            </View>
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
                        <AppButton
                            title='Confirm'
                            color='black'
                            onPress={handlePress}
                        />
                    </View>
                </View>
            </View>
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
        marginVertical: 30,
        alignItems: 'center',
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