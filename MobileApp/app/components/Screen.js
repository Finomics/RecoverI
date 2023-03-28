import React, { Children } from 'react';

import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import Constants from 'expo-constants'

function Screen({children,style}) {
    return (
        // <SafeAreaView style={[styles.screen, style]}>
        //     {children}
        // </SafeAreaView>

        <SafeAreaView style={[styles.screen, style]}>
            <StatusBar backgroundColor="#578B9D"/>
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen:{
        backgroundColor: '#D6DCE5',
        flex: 1,
    },
})

export default Screen;