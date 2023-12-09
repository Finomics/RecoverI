import { React, useContext, useEffect, useState } from 'react';
import { Image, Button, Text, FlatList, View, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import Screen from '../Screen';
import StoreContext from './GlobalState';
import axios from 'axios';
import { Url } from './Core';
import Header from '../Header';
import ViewClientMemberModal_Sunny from '../ViewClientMemberModal_Sunny';

function VIewClientMember_Sunny({ navigation }) {


    const GlobaleEmployee = useContext(StoreContext);

    let [clientData, setClientData] = useState([]);
    let [showPopup, setShowPopup] = useState(false);
    let [ModalData, setModalData] = useState('');

    useEffect(() => {
        let belongsTo = '';
        if (GlobaleEmployee.Role.Role == 'Admin') {
          belongsTo = GlobaleEmployee.Role._id;
        } else {
          belongsTo = GlobaleEmployee.Role.createdBy;
        }
    
        axios({
          method: "post",
          url: Url + "/filteredClients",
          data: {
           filter:{ BelongsTo: "63aa854588c3e19a5630caad"}
          }
        })
          .then((responseJson) => {
            console.log("Client Update Screen in getAPI", responseJson.data);
            setClientData(responseJson.data);
            // const filteredData=responseJson.data.filter(filterClients)
            // setClients(filteredData);
            // setfiltered(filteredData);
    
          })
          .catch((error) => {
            console.error("Error in Client Update Screen in getAPI",error);
          });
        function filterClients(client) {
          if (GlobaleEmployee.Role.Role == 'Rider') {
            return client.ClientRiderObjectId == GlobaleEmployee.Role._id;
          } else {
            return true;
          }
    
    
        }
    
    
      }, [])

    
    // clientData= [
    //     {
    //         clientName: "hassan",
    //         clientID: "01",
    //         clientEmail: "ABC@gmail.com",
    //         clientNumber: "03242886139",
    //     },
    //     {
    //         clientName: "hammad",
    //         clientID: "02",
    //         clientEmail: "XYZ@gmail.com",
    //         clientNumber: "03452057798",
    //     }
    // ] 

    const handlePress = (item) => {
        setModalData(item)
        console.log(item)
        setShowPopup(true)
    }
    const handleClose = () => { 
        setShowPopup(false) 
    };
    const modalUpdateData = async (data) => {
        console.log(data, "modal Update Data");
        setShowPopup(false)
        setloading(true)
    }
    const setloading=()=>{
        console.log('Press All')
    }
    const HandlerFilter=(item)=>{
        console.log("Pressed " + item)
    }

    return (
        <Screen>
            <Header
                header={'Client Members'}
                navigation={navigation}
            />
            <View>
                <Image
                    style={styles.logo}
                    source={require('../../assets/kollectit.png')}
                />
            </View>
            {/* <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                <TouchableOpacity onPress={() => setloading(true)}>
                    <View style={styles.filterBox}><Text style={{ fontSize: 20 }}>All</Text></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => HandlerFilter("Cashier")}>
                    <View style={styles.filterBox}><Text style={{ fontSize: 20 }}>Cashier</Text></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => HandlerFilter("Rider")}>
                    <View style={styles.filterBox} ><Text style={{ fontSize: 20 }}>Rider</Text></View>
                </TouchableOpacity>
            </View> */}

            {clientData != null ?
                <FlatList
                    data={clientData}
                    // keyExtractor={listing => listing.ClientId}
                    renderItem={({ item, i }) =>
                        <TouchableOpacity onPress={() => handlePress(item)}>
                            <View style={styles.container} >
                                <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>Name: <Text style={{ fontWeight: "normal" }}>{item.ClientName}</Text></Text>
                                <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>Client ID: <Text style={{ fontWeight: "normal" }}>{item.ClientId}</Text></Text>
                                <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>Client Email: <Text style={{ fontWeight: "normal" }}>{item.ClientEmail}</Text></Text>
                                <Text style={{ fontSize: 23, color: "black", fontWeight: "bold" }}>Client Number: <Text style={{ fontWeight: "normal" }}>{item.ClientPhoneNumber}</Text></Text>
                            </View>
                        </TouchableOpacity>
                    }
                /> : 
                <></>
            }
            <ViewClientMemberModal_Sunny
                visible={showPopup} 
                onClose={handleClose} 
                data={ModalData} 
                modalUpdateData={modalUpdateData}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        backgroundColor: '#B4C6D1',
        marginBottom: 15,
        marginHorizontal: 10,
        overflow: 'hidden',
        paddingVertical: 10,
        paddingLeft: 10,
        borderColor: '#B4C6D1',
        borderWidth: 2,
    },
    logo: {
        height: 120,
        width: 300,
        // backgroundColor: 'red',  
        alignSelf: 'center',
    },
    filterBox: {
        borderWidth: 1,
        margin: 5,
        padding: 5,
        // width: 70,
        paddingHorizontal: 20,
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#EFEFEF",
        marginBottom: 19
    },
});

export default VIewClientMember_Sunny;