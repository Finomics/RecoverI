import React, { useState } from 'react';
import { Button, View, StyleSheet, FlatList, TouchableOpacity, Modal, Text } from 'react-native';

import RiderNameCard from '../components/RiderNameCard';

import colors from './colors';
import AppText from './AppText';



const tempRiderName = [
    { Name: 'Hassan Mansoor', value: 1 },
    { Name: 'Hammad Ahmed', value: 2 },
    { Name: 'Anas Mansoor', value: 3 },
    { Name: 'Bilal Zia', value: 4 },
    { Name: 'Mohib Zia', value: 5 },
]

function RiderCard({name, phoneNumber, email, amount, rider, id }) {

    const [modalVisible, setModalVisible] = useState(false);

    const handlePress = ()=> {
        // console.log(rider)
        setModalVisible(true)
        
      }
    
    const handleRider = (item)=> {
        if (rider!==true){
            console.log(id.Rider=item.Name)
            console.log('New',item)
        }else{
            console.log(id.Rider)
        }
      }
    
    return (
        <>
        <TouchableOpacity style={styles.card} onPress={()=> {handlePress()}}>
            <View style={styles.detailsContainer}>
                <AppText>{name}</AppText>
                <AppText>{phoneNumber}</AppText>
                <AppText>{email}</AppText>
                <AppText>Rs: {amount}</AppText>
                {/* <AppText>Rider: {rider===true? 'temp' : id.Rider}</AppText> */}
                <AppText>Rider: {id.Rider}</AppText>

            </View>
        </TouchableOpacity>



        <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
            >
            <Button title='List of Riders' onPress={() => setModalVisible(!modalVisible)} color={colors.royalBlue}/>


            <FlatList 
                data={tempRiderName}
                keyExtractor={tempRiderName => tempRiderName.value.toString()}
                renderItem={({item}) =>
                    <RiderNameCard 
                        name={item.Name}
                        id={item.value}
                        onPress={()=> {handleRider(item)}}
                    /> 
                    } 
            />

            </Modal> 





















        </>
        


    );
}

const styles = StyleSheet.create({
    card:{
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
    subTitle:{
        color: colors.secondary,
        // fontWeight: 'bold',
        paddingLeft: 3
    },
    title:{
        color: colors.primary,
        marginBottom: 7,
        fontWeight: 'bold',
    },
})

export default RiderCard;