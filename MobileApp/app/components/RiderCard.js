import React, { useState, useEffect, useContext } from 'react';
import { Dimensions, View, StyleSheet, FlatList, TouchableOpacity, Modal, Image, Text } from 'react-native';

import RiderNameCard from '../components/RiderNameCard';

import colors from './colors';
import AppText from './AppText';
import axios from "axios";
import Icon from './Icon';
import StoreContext from './screen/GlobalState';
import { Url } from './screen/Core';
import Screen from './Screen';
import Header from './Header';
import AppTextInput from './AppTextInput';
import AppButton from './AppButton';

const { width, height } = Dimensions.get('screen');

const tempRiderName = [
    { Name: 'Hassan Mansoor', value: 1 },
    { Name: 'Hammad Ahmed', value: 2 },
    { Name: 'Anas Mansoor', value: 3 },
    { Name: 'Bilal Zia', value: 4 },
    { Name: 'Mohib Zia', value: 5 },
]

// 
function RiderCard({ name, phoneNumber, email, amount, rider, id, setUpdate, update, navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [Rider, setallRider] = useState([])
    const Globaledata = useContext(StoreContext);
    const [realTime, setRealTime] = useState(true);
    const [dueAmount, setDueamount] = useState(0.0);
    const [riderObj, setRiderObj] = useState("");

    console.log(Globaledata.Role, "Rider Card Globaledata");
    // console.log(Globaledata.Role._id, "Rider Card Globaledata");

    const handlePress = () => {
        // console.log(rider)
        setModalVisible(true)

    }




    useEffect(() => {
        axios({
            method: "post",
            url: Url + "/auth/craetedby",
            data: {
                createdBy: Globaledata.Role.createdBy,
                Role: "Rider"
                // Role: Globaledata.Role.Role
            }
        }).then((res) => {

            setallRider(res.data)
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [realTime])

    var ClinetID = id._id
    var employeeName = Globaledata.Role.employeeName

    const handleRider = (item) => {
        setRiderObj(item)
        console.log(item.employeeName, "eee");
        console.log(item, "eee");
        alert("Selected " + item.employeeName);
        /*
                axios({
                    method: 'post',
                    url: Url+"/ClientDataUpdate",
                    data: {
                        id: ClinetID,
                        ClientRider: item.employeeName,
                        CashierName: employeeName,
                        ClientRiderObjectId: item._id,
                        AssignedBy:Globaledata.Role._id,
                        amount: dueAmount
        
                    }
                }).then((res) => {
                    console.log(res.data.message, "res");
                    alert(res.data.message)
                    setRealTime(!realTime);
                    setUpdate(!update);
                    navigation.navigate('Assign Rider')
        
                }).catch((err) => {
                    console.log(err, "err");
                })*/
    }


    const handleAssign = () => {
        console.log('in Assigned', dueAmount, riderObj);


        axios({
            method: 'post',
            url: Url + "/ClientDataUpdate",
            data: {
                id: ClinetID,
                ClientRider: riderObj.employeeName,
                CashierName: employeeName,
                ClientRiderObjectId: riderObj._id,
                AssignedBy: Globaledata.Role._id,
                amount: dueAmount

            }
        }).then((res) => {
            console.log(res.data.message, "res");
            alert(res.data.message)
            setRealTime(!realTime);
            setUpdate(!update);
            navigation.navigate('Assign Rider')

        }).catch((err) => {
            console.log(err, "err");
        })

    }

    return (
        <>
            {/* <Screen> */}


            <TouchableOpacity style={styles.card} onPress={() => { handlePress() }}>
                <View style={styles.detailsContainer}>
                    <AppText>{name}</AppText>
                    <AppText>{phoneNumber}</AppText>
                    <AppText>{email}</AppText>
                    <AppText>Rs: {amount}</AppText>
                    {/* <AppText>Rider: {rider===true? 'temp' : id.Rider}</AppText> */}
                    <AppText>Rider: {rider}</AppText>

                </View>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
            >
                 {/* <Header
                    header={'List of Riders'}
                /> */}
                {/* <View style={styles.logoContainer}>
                    
                  
                </View> */}
                
                <View style={styles.buttonStyle}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/logo.png')}

                    />
                    <View style={{ marginTop: "15%", marginRight: "2%" }}>
                        <Icon
                            name='close'
                            size={50}
                            backgroundColor='transparent'
                            iconColor={colors.royalBlue}
                            onPress={() => setModalVisible(!modalVisible)}
                            title='Close'
                        />
                    </View>


                </View>
                <Text style={{ textAlign: "center", marginTop: "-12%", margin: "6%", fontSize: 22, color: "#2E6C81" }}>{(riderObj == "") ? <></> : ` ${riderObj.employeeName}`} </Text>

                <FlatList
                    data={Rider}
                    // keyExtractor={tempRiderName => tempRiderName.value.toString()}
                    renderItem={({ item }) =>
                        <RiderNameCard
                            name={item.employeeName}
                            // id={item._id}
                            onPress={() => { handleRider(item) }}
                        />
                    }
                />

                <View style={{ marginHorizontal: 10, borderTopWidth: 3, }}>
                    <AppTextInput
                        icon={'circle'}
                        placeholder={'Amount'}
                        onChangeText={setDueamount}
                        value={dueAmount}
                    />
                    <AppButton
                        title={'Assign'}
                        color='buttonColor'
                        onPress={handleAssign}
                    />
                </View>

            </Modal>




















            {/* </Screen> */}
        </>



    );
}

const styles = StyleSheet.create({
    card: {
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
    subTitle: {
        color: colors.secondary,
        // fontWeight: 'bold',
        paddingLeft: 3
    },
    title: {
        color: colors.primary,
        marginBottom: 7,
        fontWeight: 'bold',
    },
    buttonStyle: {
        // paddingVertical: 15,
        flex: 1,
        // margin: "5%",
        // padding: "5%",
        flexDirection: "row"
    },
    logo: {
        height: 120,
        width: 300,
        marginTop: "7%"
    },
    logoContainer: {
        alignItems: 'center',
        width: '100%',
        marginVertical: 10,
        // backgroundColor: colors.
    },
})

export default RiderCard;