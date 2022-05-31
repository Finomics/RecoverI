import React, { useState, useRef } from 'react';
import { SafeAreaView, Text, View ,TouchableOpacity, StyleSheet, TextInput, ScrollView} from 'react-native';

import AppTextInput from '../AppTextInput'
import AppText from '../AppText';
import colors from '../colors';
import AppButton from '../AppButton';


function OTPScreen(props) {

    const pin1Ref = useRef(null);
    const pin2Ref = useRef(null);
    const pin3Ref = useRef(null);
    const pin4Ref = useRef(null);

    const [pin1, setPin1] = useState('');
    const [pin2, setPin2] = useState('');
    const [pin3, setPin3] = useState('');
    const [pin4, setPin4] = useState('');

    var OTP_Array = ['','','',''];

    const handlePress = () => {
        console.log(OTP_Array)
        alert(OTP_Array)
    };

    return (    
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
                                OTP_Array[0]=text
                                setPin1(pin1)
                                if(text!== "" ){
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
                                OTP_Array[1]=text
                                setPin2(pin2)
                                if(text!== "" ){
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
                                OTP_Array[2]=text
                                setPin3(pin3)
                                if(text!== "" ){
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
                                OTP_Array[3]=text
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
    );
}

const styles = StyleSheet.create({
    container:{
        width: '80%',
        height: 220,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.lightShade,
        padding: 10,
    }, 
    inputContainer:{
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 20,
        width: '100%',
        justifyContent: 'space-evenly',
    },
    textContainer:{
        backgroundColor: colors.lightBlueShade,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderRadius: 15,        
    },
    textBox:{
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        fontSize: 40,
        fontWeight: '700',
    },
    button:{
        alignItems:'center'
    },
})



export default OTPScreen;