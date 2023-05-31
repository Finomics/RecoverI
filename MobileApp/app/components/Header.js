import { React, useEffect, useState, useContext } from 'react';
import StoreContext from "./screen/GlobalState";

import { useNavigation, useRoute } from '@react-navigation/native';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Text } from 'react-native';

const { width, height } = Dimensions.get('screen');

function Header({ header, navigation }) {
    const navigation1 = useNavigation();
    const route = useRoute();
    const contextData = useContext(StoreContext)


    // // Get the name of the current screen
    // const screenName = route.name;
    const handleBack = async () => {
        console.log("in arowpress", navigation1, route.name);
        if (navigation.canGoBack()) {
            navigation.goBack();
        }

    }
    const handleHome = () => {
        console.log('Home Button is pressed');
        if (contextData.Role.Role == 'Admin') {
            navigation.navigate("Admin Home")

        } else if (contextData.Role.Role === 'Cashier') {

            navigation.navigate('Cashier Home')

        } else if (contextData.Role.Role === "Rider") {

            navigation.navigate('Rider Home')

        } else {
            navigation.navigate('Welcome');
        }
    }
    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.backContainer} onPress={handleBack}>

                <Image
                    style={styles.tinyIcon}
                    source={require('../assets/left-arrow.png')}
                />
            </TouchableOpacity>
            <View style={styles.title}>
                <View
                    style={styles.imageContainer}
                >
                    <Image
                        style={{ width: '100%', height: '90%', }}
                        source={require('../assets/kollect-logo.png')}
                    />
                </View>
                <Text style={styles.header}>
                    {header}
                </Text>
            </View>
            {(route.name === "Rider Home" || route.name === "Cashier Home" || route.name === "Admin Home") ?
                <TouchableOpacity style={styles.homeContaiiner} onPress={handleBack}>
                    <Image
                        style={styles.homeIcon}
                        source={require('../assets/logout.png')}
                    />
                </TouchableOpacity> :
                <TouchableOpacity style={styles.homeContaiiner} onPress={handleHome}>
                    <Image
                        style={styles.homeIcon}
                        source={require('../assets/homeicon.png')}
                    />
                </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: '0%',
        backgroundColor: '#578B9D',
        width: width,
        height: height * 0.08,
        flexDirection: 'row',
        // position: "relative",
        // zIndex: 1,
        // opacity:2
    },
    backContainer: {
        // backgroundColor: 'yellow',
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        // alignItems: 'flex-end',
    },
    homeContaiiner: {
        width: '20%',
        height: '100%',
        // backgroundColor: 'yellow',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: width / 9.7,
        height: height / 10,
        overflow: 'hidden',
        marginLeft: "-5%"
        // backgroundColor: 'pink',
    },
    tinyIcon: {
        width: width / 8,
        height: height / 22,
        // alignSelf: 'center',
        // width: 40,
        // height: 40,
        marginLeft: 10,
        top: 5
    },
    homeIcon: {
        width: width / 10,
        height: height / 22,
        // alignSelf: 'center',
        // width: 40,
        // height: 40,

    },
    title: {
        width: '60%',
        height: '100%',
        // backgroundColor: 'red',
        // justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 20,
        color: 'white',
        textAlign: "center",
        height: height / 20,
        alignItems: "center",
        marginTop: height / 90

    },
});

export default Header;