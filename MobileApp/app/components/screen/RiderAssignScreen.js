import React, { useState } from 'react';


import { Image, View, StyleSheet, FlatList, Modal, Button } from 'react-native';
import RiderCard from '../RiderCard';

import Screen from '../Screen';
import colors from '../colors'

let temp={};

function RiderAssignScreen(props) {

    const [modalVisible, setModalVisible] = useState(false);

    let tempData = [
        { Name: 'Hassan Mansoor', PhoneNumber:'0300-xxxxxxx', Email: 'abc@example.com', Amount:'xxxxxxx', Rider:null, value: 1 },
        { Name: 'Hammad Ahmed', PhoneNumber:'0300-xxxxxxx', Email: 'abc@example.com', Amount:'xxxxxxx', Rider:'Careem', value: 2 },
        { Name: 'Anas Mansoor', PhoneNumber:'0300-xxxxxxx', Email: 'abc@example.com', Amount:'xxxxxxx', Rider:null, value: 3 },
        { Name: 'Bilal Zia', PhoneNumber:'0300-xxxxxxx', Email: 'abc@example.com', Amount:'xxxxxxx', Rider:'Uber', value: 4 },
        { Name: 'Mohib Zia', PhoneNumber:'0300-xxxxxxx', Email: 'abc@example.com', Amount:'xxxxxxx', Rider:null, value: 5 },
    ];

    // let tempRiderName = [
    //     { Name: 'Hassan Mansoor', value: 1 },
    //     { Name: 'Hammad Ahmed', value: 2 },
    //     { Name: 'Anas Mansoor', value: 3 },
    //     { Name: 'Bilal Zia', value: 4 },
    //     { Name: 'Mohib Zia', value: 5 },
    // ];





    
      



    return (
        <Screen>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo} 
                    source={require('../../assets/logo.png')} 
                />
            </View>

            <FlatList 
                data={tempData}
                keyExtractor={tempData => tempData.value.toString()}
                renderItem={({item}) =>
                    <RiderCard 
                        name={item.Name}
                        phoneNumber={item.PhoneNumber}
                        email={item.Email}
                        amount={item.Amount}
                        rider={item.Rider}
                        id={item}
                        // onPress={()=> {handlePress(item)}}
                    /> 
                    } 
            />   
            
        </Screen>
    );
}

const styles = StyleSheet.create({
    logo:{
        height: 120,
        width: 300,
    },
    logoContainer:{ 
        alignItems: 'center',
        width: '100%', 
        marginVertical: 10,
        // backgroundColor: colors.
    },
})

export default RiderAssignScreen;