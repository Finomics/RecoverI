import React from 'react';

import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Text } from 'react-native';

const {width, height} = Dimensions.get('screen');

function Header(props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backContainer}>
                <Image
                    style={styles.tinyIcon}
                    source={require('../assets/left-arrow.png')}
                />
            </TouchableOpacity>
            <View style={styles.title}>
                <View style={styles.imageContainer}>
                    <Image
                        style={{width: '100%', height: '100%'}}
                        source={require('../assets/kollect-logo.png')}
                    />
                </View>
                <Text style={styles.header}>
                    Cashier
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        // marginTop: 20,
        backgroundColor: '#578B9D',
        width: width,
        height: height*0.08,
        flexDirection: 'row',
    },
    backContainer:{
        // backgroundColor: 'yellow',
        width: '20%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    imageContainer:{
        width: 100,
        height: '100%',
        overflow: 'hidden',
        // backgroundColor: 'pink',
    },
    tinyIcon:{
        width: '60%',
        height: '70%',
        // width: 40,
        // height: 40,
    },
    title:{
        width:'60%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    header:{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },
});

export default Header;