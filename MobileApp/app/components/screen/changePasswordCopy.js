import React, { useEffect, useState, useContext } from 'react'

import { Image, ScrollView, StyleSheet, ActivityIndicator, Dimensions, View } from 'react-native';
import * as Yup from 'yup';

import Screen from '../Screen';
import { AppForm, AppFormField, AppFormPassword, SubmitButton } from '../forms';
import AppButton from '../AppButton';
import axios from 'axios';
import StoreContext from './GlobalState';
import TopButtons from './TopButtons';
import { Url } from './Core';
import Header from '../Header';


const {width, height} = Dimensions.get('screen');
const validationSchema = Yup.object().shape({
    email: Yup.string().label("Email"),
    password: Yup.string().label("Password"),
});


function ChangePasswordCopy({ navigation }) {
    
    
    const [load, setLoad] = useState(false);
    const contextData = useContext(StoreContext);
  
    console.log("Role", contextData.Role);
  
    const handlePress = (values) => {
      console.log(values, "input value");
      setLoad((previousState) => !previousState);
      // console.log(contextData.Role._id);
  
      axios({
        method: "post",
        url: Url + "/auth/ChangePassword",
        data: {
          empolyeeObjectId: contextData.Role._id,
          employeePassword: values.password,
          newPassword: values.newPassword,
        },
      })
        .then((res) => {
          setLoad((previousState) => !previousState);
          console.log(res.data, "Change Password Json Data");
        })
        .catch((err) => {
          setLoad((previousState) => !previousState);
          console.log(err, "Change Password Error Json Data");
        });
    };

    return (
        <Screen style={styles.container}>
            <Header
                header={'Login'}
                navigation={navigation}
            />
            <View style={{width: width, marginBottom:60, justifyContent: 'center'}}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/logo.png')}
                />
            </View>
            <ScrollView automaticallyAdjustKeyboardInsets={true}>
                <View style={styles.container}>
                    <View style={styles.form}>
                        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: 30}}>
                            <Image
                                style={{width: width*0.35}}
                                source={require('../../assets/pngtree.png')}
                                />
                        </View>


                        <AppForm
                            initialValues={{ password: "", newPassword: "" }}
                            onSubmit={(values, { resetForm }) => {
                              handlePress(values);
                              // , resetForm({ values: initialValues });
                            }}
                            validationSchema={validationSchema}
                        >
                           <AppFormPassword
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password Old"
            textContentType="password"
          />
          <AppFormPassword
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="newPassword"
            placeholder="Password New"
            textContentType="newPassword"
          />
                             {load ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <SubmitButton title="Update" color="teal" />
          )}
                            
                        </AppForm>
                    </View>
                </View>

            </ScrollView>

            {/* <AppButton
                title='By pass to home Screen'
                color='black'
            onPress={()=> navigation.navigate('HomeScreen')}
            /> */}
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    form:{
        backgroundColor: '#578B9D',
        width: width*0.9,
        // height: 400,
        borderRadius: 25,
        paddingTop: 10,
        paddingBottom:30,
        paddingHorizontal: 10,
    },
    logo: {
        width: '100%',
        height: 120,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
})
export default LoginScreenCopy; 