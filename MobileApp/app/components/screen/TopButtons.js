import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../colors';
import AppText from '../AppText';

function TopButtons({header}) {

    const handleLeftButton=()=>{
        console.log('Home Button is pressed')
    }
    const handleRightButton=()=>{
        console.log('Logout Button is pressed')
    }

    return (
        <View style={styles.container}>
            <View style={styles.leftCorner}>
                <TouchableOpacity onPress={handleLeftButton}>
                    <MaterialCommunityIcons name='home-outline' color={colors.teal} size={30} />
                </TouchableOpacity>
            </View>
            <AppText>{header}</AppText>
            <View style={styles.rightCorner}>
                <TouchableOpacity onPress={handleRightButton}>
                    <MaterialCommunityIcons name='logout' color={colors.teal} size={30} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '8%',
        // marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftCorner:{
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightCorner:{
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default TopButtons;