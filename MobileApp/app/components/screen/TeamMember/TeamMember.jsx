import { React, useContext, useEffect, useState } from 'react';
import { Image, Button, Text, FlatList, View, StyleSheet, TextInput } from 'react-native';
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


function TeamMember({ navigation }) {


    // console.log("in client Screen",list)
    const [clients, setClients] = useState('');
    const [filtered, setfiltered] = useState([]);
    const [filterText, setfilterText] = useState();
    let [showPopup, setShowPopup] = useState(false);
    let [ModalData, setModalData] = useState('');
    const GlobaleEmployee = useContext(StoreContext)

    console.log(GlobaleEmployee.Role._id, "createdBy")
    const handleClick = () => { setShowPopup(true) };
    const handleClose = () => { setShowPopup(false) };

    useEffect(() => {
        // let belongsTo = '';
        // if (GlobaleEmployee.Role.Role == 'Admin') {
        //     belongsTo = GlobaleEmployee.Role._id;
        // } else {
        //     belongsTo = GlobaleEmployee.Role.createdBy;
        // }
        // axios({
        //   method: "post",
        //   url: Url + "/auth/BelongsTo",
        //   data: {
        //     createdBy: belongsTo
        //   }
        // })
        //   .then((responseJson) => {
        //     console.log("TeamMember in getAPI", responseJson.data);
        //     const filteredData=responseJson.data.filter(filterClients)
        //     setClients(filteredData);
        //     setfiltered(filteredData);

        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });
        // function filterClients(client) {
        //   if (GlobaleEmployee.Role.Role == 'Rider') {
        //     return client.ClientRiderObjectId == GlobaleEmployee.Role._id;
        //   } else {
        //     return true;
        //   }


        // }

        axios({
            method: "post",
            url: Url + "/filteredEmployee",
            data: {
                filter: {
                    "createdBy": "6481b3091efcb5d62f14c744"
                }
            }
        }).then((res) => {
            console.log(res.data, "Response Employee");

            setClients(res.data);

        }).catch((err) => {
            console.log(err);
        })

    }, [])

    // for search
    // const handleSearch = async () => {
    //     console.log("Search", filterText);
    //     let filtereddata = clients.filter(clientData => (nameFilter(clientData.ClientName, filterText)));
    //     console.log("filtered before", filtered.length, filtereddata.length)
    //     setfiltered(filtereddata);
    //     console.log("filtered after", filtered.length, filtereddata.length);

    // }
    // function nameFilter(clientName, name) {
    //     console.log("Filters", clientName.toLowerCase().includes(name.toLowerCase()))
    //     return clientName.toLowerCase().includes(name.toLowerCase());

    // }
    const handlePress = (item) => {
        console.log("Client is pressed", item);
        setModalData(item)
        setShowPopup(true)
    }

    return (
        <Screen>
            <Header
                header={'Team Member'}
                navigation={navigation}
            />
            <TeamMemeberModal visible={showPopup} onClose={handleClose} data={ModalData} />
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/logo.png')}
                />
                {/* <View style={styles.textContainer}>
          <TextInput style={{ fontWeight: 'bold', fontSize: 18, width: '100%' }} placeholder='Client Name' onChangeText={(text) =>setfilterText(text.toString())} />
        </View> */}
                {/* <Button title='Search' onPress={() =>handleSearch()} color={'#578B9D'}  /> */}
            </View>
            {clients != null ?
                <FlatList
                    data={clients}
                    // keyExtractor={listing => listing.ClientId}
                    renderItem={({ item, i }) =>
                        <Card
                            key={i}
                            title={item.employeeName}
                            subTitle={item.Role}
                            subSubTitle={item.shortCode}

                            onPress={() => handlePress(item)}
                        />
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
})

export default TeamMember;