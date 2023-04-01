import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import colors from './colors';

function AppButton({title, onPress, color = '#367588', width='100%'}) {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: color, width: width}] } onPress={onPress} >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: colors.dark,
        borderRadius: 20,
        justfyContent: 'center',
        alignItems: 'center',
        padding: 15,
        marginTop: 5,
        // width: '100%',
        alignSelf: 'center',
    },
    text:{
        color: '#000000',
        fontSize: 30,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
})

export default AppButton;