import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import colors from './colors';

function AppButton({title, onPress, color = '#B4C6D1'}) {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: colors[color]}] } onPress={onPress} >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: 'blue',
        borderRadius: 30,
        justfyContent: 'center',
        alignItems: 'center',
        padding: 15,
        marginTop: 5,
        width: '100%',
    },
    text:{
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
})

export default AppButton;