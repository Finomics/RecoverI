import React, { useState } from 'react';
import { Button, View, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';

import colors from './colors';
import AppText from './AppText';

function RiderNameCard({name, id, onPress }) {

    const handlePress=()=>{
        console.log('hello')
    }
    
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.detailsContainer}>
                <AppText>{name}</AppText>
            </View>
        </TouchableOpacity>


        


    );
}

const styles = StyleSheet.create({
    card:{
        borderRadius: 15,
        backgroundColor: '#E6E6E6',
        marginBottom: 15,
        marginHorizontal: 10,
        overflow: 'hidden',
        paddingVertical: 15,
        paddingLeft: 10,
        borderColor: '#E6E6E6',
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

export default RiderNameCard;