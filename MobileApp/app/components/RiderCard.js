import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, FlatList, TouchableOpacity, Modal, Text } from 'react-native';

import RiderNameCard from '../components/RiderNameCard';

import colors from './colors';
import AppText from './AppText';
import axios from "axios";


const tempRiderName = [
    { Name: 'Hassan Mansoor', value: 1 },
    { Name: 'Hammad Ahmed', value: 2 },
    { Name: 'Anas Mansoor', value: 3 },
    { Name: 'Bilal Zia', value: 4 },
    { Name: 'Mohib Zia', value: 5 },
]

function RiderCard({ name, phoneNumber, email, amount, rider, id }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [Rider, setallRider] = useState([])

    const handlePress = () => {
        // console.log(rider)
        setModalVisible(true)

    }

    useEffect(() => {
        axios({
            method: "get",
            url: "https://paym-api.herokuapp.com/auth/RiderEmploye",
        }).then((res) => {
            setallRider(res.data)
            // console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    var ClinetID = id._id

    const handleRider = (item) => {
        // console.log(,"idididididid");



        // console.log(item.employeeName, "eee");
        axios({
            method: 'post',
            url: "https://paym-api.herokuapp.com/ClientDataUpdate",
            data: {
                id: ClinetID,
                ClientRider: item.employeeName
            }
        }).then((res) => {
            console.log(res.data.message, "res");
            alert(res.data.message)
            // navigation.navigate('RiderAssignScreen')
            // setRealTime(!realTime);
        }).catch((err) => {
            console.log(err, "err");
        })
    }

    return (
        <>
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
                <Button title='List of Riders' onPress={() => setModalVisible(!modalVisible)} color={colors.royalBlue} />


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

            </Modal>





















        </>



    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: colors.lightBlueShade,
        marginBottom: 15,
        marginHorizontal: 10,
        overflow: 'hidden',
        paddingVertical: 10,
        paddingLeft: 10,
        borderColor: colors.dark,
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
})

export default RiderCard;