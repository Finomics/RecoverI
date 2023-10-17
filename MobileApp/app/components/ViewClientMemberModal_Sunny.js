import React, { useState,useEffect } from 'react';

import { View, StyleSheet, Text, Modal, Dimensions, Alert, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import axios from 'axios';
import { Url } from '../components/screen/Core';
import colors from './colors';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Colors = {
    Grey: "#DCDCDC",
    White: "#FFFFFF",
    Blue: "#0000FF",
    Black: "#000000",
  };

function ViewClientMemberModal_Sunny({ visible, onClose, data, modalUpdateData, }) {

    const [clientName, setClientName] =useState(data.ClientName);
    const [clientId, setClientId] =useState(data.ClientId)
    const [clientEmail, setClientEmail] =useState(data.clientEmail)
    const [clientNumber, setClientNumber] =useState(data.ClientPhoneNumber);
   
    useEffect(() => {
      setClientName(data.ClientName);
      setClientId(data.ClientId);
      setClientEmail(data.clientEmail);
      setClientNumber(data.ClientPhoneNumber);

    }, [data])

    const HandlerUpdate=async()=>{
      let filter={
        _id:data._id
      }
      let update={
        ClientName: clientName,
        ClientId: clientId,
        PhoneNumber:clientNumber
      }
     

        console.log('Press Update',filter, update);
      let resp= await updateClient(filter,update);

        onClose()
    }

    async function  updateClient(filter,update){
      axios({
        method: "put",
        url: Url + "/UpdateFilteredClients",
        data: {
         filter:filter,
         update:update
        }
      })
        .then((responseJson) => {
          console.log("Client Update Screen in Modal", responseJson.data);
          
  
        })
        .catch((error) => {
          console.error("Error in Client Update Screen in Modal",error);
        });

    }
    return (
    <View style={styles.container}>
        <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                visible(visible);
            }}>
                <View style={styles.centeredView}>
                    <View style={{alignItems: 'flex-end',}}>
                        <Icon
                            name={'close'}
                            backgroundColor='transparent'
                            iconColor='#578B9D'
                            size={50}
                            onPress={onClose}
                        />
                    </View>
                    <ScrollView>
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ marginLeft: "-70%" }}>Name</Text>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder={data.ClientName}
                                    placeholderTextColor="#003f5c"
                                    onChangeText={(clientName) => setClientName(clientName)}
                                />
                            </View>

                            <Text style={{ marginLeft: "-70%" }}>Client ID</Text>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder={data.ClientId}
                                    placeholderTextColor="#003f5c"
                                    onChangeText={(clientID) => setClientId(clientID)}
                                />
                            </View>

                            <Text style={{ marginLeft: "-70%" }}>Client Email</Text>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder={data.ClientEmail}
                                    placeholderTextColor="#003f5c"
                                    onChangeText={(clientEmail) => setClientEmail(clientEmail)}
                                />
                            </View>

                            <Text style={{ marginLeft: "-70%" }}>Client Number</Text>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder={data.ClientPhoneNumber}
                                    placeholderTextColor="#003f5c"
                                    onChangeText={(clientNumber) => setClientNumber(clientNumber)}
                                />
                            </View>
                
                        </View>
                    </ScrollView>
                    <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[
                  styles.buttonStyle,
                  {
                    marginTop: 30,
                    backgroundColor: "#578B9D",
                    flex: 1,
                    marginRight: 5,
                    marginLeft: 10,
                  },
                ]}
                onPress={HandlerUpdate}
              >
                <Text
                  style={{ textAlign: "center", color: "white", fontSize: 20 }}
                >
                  Update
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.buttonStyle,
                  {
                    marginTop: 30,
                    backgroundColor: "#578B9D",
                    flex: 1,
                    marginRight: 5,
                    marginLeft: 10,
                  },
                ]}
                onPress={onClose}
              >
                <Text
                  style={{ textAlign: "center", color: "white", fontSize: 20 }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
                </View>
        </Modal>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'transparent',
    },
    centeredView: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'flex-end',
        marginTop: 22,
        marginHorizontal: 5,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#B4C6D1',
        shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        // backfaceVisibility: 'visible',
    },
    inputView: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        width: windowWidth / 1.3,
        marginBottom: 17,
        height: 60,
        borderColor: "#578B9D",
        borderWidth: 5,
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        fontSize: 22,
    },
    buttonsContainer: {
        flexDirection: "row",
        // position: "absolute",
        bottom: 0,
        alignItems: "center",
        // backgroundColor: ,
    },
    buttonStyle: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        borderColor: Colors.Black,
        borderWidth: 1,
    },
});

export default ViewClientMemberModal_Sunny;