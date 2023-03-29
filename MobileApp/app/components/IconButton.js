import React from 'react';

import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Image } from 'react-native';

const {width, height} = Dimensions.get('screen');

function IconButton({title, subTitle, image, onPress}) {
    
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.buttonContainer}>
                <View style={styles.titleButton}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                </View>
                <View style={styles.subTitleButton}>
                    <Text style={styles.subTitle}>
                        {subTitle}
                    </Text>
                </View>
            </View>
            
            <View style={styles.imageContainer}>
                <Image
                    style={styles.tinyIcon}
                    source={image}
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        marginVertical: 10,
        alignSelf: 'center',
        width: width*0.9,
        height: height*0.15,
        flexDirection: 'row'
    },
    buttonContainer:{
        alignSelf: 'flex-end',
        position: 'absolute',
        backgroundColor: '#2E6C81',
        width: '100%',
        height: height*0.11,
        borderRadius: 25,
    },
    imageContainer:{
        backgroundColor: 'transparent',
        width: '40%',
        height: height*0.16,
        // width: 20,
        // height: 20,
    },
    tinyIcon:{
        width: '90%',
        height: '90%',
        alignSelf: 'flex-end',
    },
    titleButton:{
        width: '55%',
        height: '45%',
        alignSelf: 'flex-end',
        flexDirection: 'row',
    },
    subTitleButton:{
        width: '55%',
        height: '55%',
        alignSelf: 'flex-end',
        flexDirection: 'row',
    },
    title:{
        backgroundColor: 'white',
        width: '90%',
        padding: 5,
        color: '#2E6C81',
        borderRadius: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'flex-end',
    },
    subTitle:{
        width: '80%',
        padding: 5,
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
    },

});

export default IconButton;