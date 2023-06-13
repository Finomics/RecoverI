import { React, useContext, useEffect, useState } from 'react';
import { Image, Button, Text, FlatList, View, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import Card from '../../Card';
import NewCard from '../../NewCard';
import colors from '../../colors';
import Screen from '../../Screen'
import { getClients } from '../../APIcalls/getRequests'
import StoreContext from '../GlobalState';
import axios from 'axios';
import TopButtons from '../TopButtons';
import { Url } from '../Core/index';
import Header from '../../Header';
import TeamMemeberModal from './TeamMemeberModal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function TeamMember({ navigation }) {


    // console.log("in client Screen",list)
    let [empolyeeData, setempolyeeData] = useState('');
    let [showPopup, setShowPopup] = useState(false);
    let [ModalData, setModalData] = useState('');
    let [loading, setloading] = useState(false);
    let GlobaleEmployee = useContext(StoreContext)

    console.log(GlobaleEmployee.Role.Role, "createdBy")

    const handleClose = () => { setShowPopup(false) };


    const HandlerFilter = (role) => {
        // console.log(role);
        axios({
            method: "post",
            url: Url + "/filteredEmployee",
            data: {
                filter: {
                    "createdBy": GlobaleEmployee.Role._id,
                    Role: role
                }
            }
        }).then((res) => {
            console.log(res.data, "filter empolyee data");
            setempolyeeData(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }



    useEffect(() => {
        if (GlobaleEmployee.Role.Role == 'Admin') {
            axios({
                method: "post",
                url: Url + "/filteredEmployee",
                data: {
                    filter: {
                        "createdBy": GlobaleEmployee.Role._id
                    }
                }
            }).then((res) => {
                // console.log(res.data, "Response Employee");
                setempolyeeData(res.data);
                setloading(false);

            }).catch((err) => {
                console.log(err);
            })
        }
    }, [loading])

    const handlePress = (item) => {
        setModalData(item)
        setShowPopup(true)
    }

    const modalUpdateData = async (data) => {
        console.log(data, "modal Update Data");
        setShowPopup(false)
        setloading(true)
    }

    return (
        <Screen>
            <Header
                header={'Team Members'}
                navigation={navigation}
            />
            <TeamMemeberModal visible={showPopup} onClose={handleClose} data={ModalData} modalUpdateData={modalUpdateData} />
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/logo.png')}
                />
            </View>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                <TouchableOpacity onPress={() => setloading(true)}>
                    <View style={styles.filterBox}><Text style={{ fontSize: 20 }}>All</Text></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => HandlerFilter("Cashier")}>
                    <View style={styles.filterBox}><Text style={{ fontSize: 20 }}>Cashier</Text></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => HandlerFilter("Rider")}>
                    <View style={styles.filterBox} ><Text style={{ fontSize: 20 }}>Rider</Text></View>
                </TouchableOpacity>
            </View>

            {empolyeeData != null ?
                <FlatList
                    data={empolyeeData}
                    // keyExtractor={listing => listing.ClientId}
                    renderItem={({ item, i }) =>
                        <TouchableOpacity onPress={() => handlePress(item)}>
                            <View style={styles.container} >
                                <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>Name: {" "} <Text style={{ fontWeight: "normal" }}>{item.employeeName}</Text></Text>
                                <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>Contact Number: {" "} <Text style={{ fontWeight: "normal" }}>{item.employeeContactNum}</Text></Text>
                                <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>Login Id: {" "} <Text style={{ fontWeight: "normal" }}>{item.employeeEmail}</Text></Text>
                                <Text style={{ fontSize: 23, color: "black", fontWeight: "bold" }}>Role: {" "} <Text style={{ fontWeight: "normal" }}>{item.Role}</Text>
                                </Text>
                            </View>
                        </TouchableOpacity>
                        // <Card
                        //     key={i}
                        //     title={item.employeeName}
                        //     subTitle={item.Role}
                        //     subSubTitle={item.shortCode}

                        //     onPress={() => handlePress(item)}
                        // />
                    }
                /> : <></>}
        </Screen>
    );
}

const styles = StyleSheet.create({
    logo: {
        height: 120,
        width: 300,
    },
    logoContainer: {
        alignItems: 'center',
        width: '100%',
        marginVertical: 10,
        // backgroundColor: colors.
    },
    textContainer: {
        width: '80%',
        // height: 50,
        backgroundColor: 'white',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginBottom: 10,
    },
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
    filterBox: {
        borderWidth: 1,
        margin: 5,
        padding: 5,
        width: 80,
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#EFEFEF",
        marginBottom: 19
    },
})

export default TeamMember;