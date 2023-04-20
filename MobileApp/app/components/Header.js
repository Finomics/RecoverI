import React from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Text } from 'react-native';

const {width, height} = Dimensions.get('screen');

function Header({header,navigation}) {
    const navigation1 = useNavigation();
     const route = useRoute();
    
  
    // // Get the name of the current screen
    // const screenName = route.name;
    const handleBack=async()=>{
        console.log("in arowpress",navigation1,route.name);
        if (navigation.canGoBack()) {
            navigation.goBack();
          }

    }
    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.backContainer}onPress={handleBack}>
            
                <Image
                    style={styles.tinyIcon}
                    source={require('../assets/left-arrow.png')}
                />
            </TouchableOpacity>
            <View style={styles.title}>
                <View style={styles.imageContainer}>
                    <Image
                        style={{width: '100%', height: '90%',}}
                        source={require('../assets/kollect-logo.png')}
                    />
                </View>
                <Text style={styles.header}>
                    {header}
                </Text>
            </View>
            {(route.name==="Rider Home")?
             <TouchableOpacity style={styles.homeContaiiner}onPress={handleBack}>           
                <Image
                    style={styles.homeIcon}
                    source={require('../assets/logout.png')}
                />
            </TouchableOpacity> :
            <TouchableOpacity style={styles.homeContaiiner}onPress={handleBack}>           
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
        justifyContent: 'center',
        // alignItems: 'flex-end',
    },
    homeContaiiner:{
        width: '20%',
        height: '100%',
        // backgroundColor: 'yellow',
         flex: 1,
         alignItems: 'center',
         justifyContent: 'center',
    },
    imageContainer:{
        width: 100,
        height: '100%',
        overflow: 'hidden',
        // backgroundColor: 'pink',
    },
    tinyIcon:{
        width: '90%',
        height: '100%',
        // alignSelf: 'center',
        // width: 40,
        // height: 40,
    },
    homeIcon:{
        width: '70%',
        height: '80%',
        // alignSelf: 'center',
        // width: 40,
        // height: 40,
    },
    title:{
        width:'60%',
        height: '100%',
        // backgroundColor: 'red',
        // justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    header:{
        fontSize: 20,
        fontWeight: 'bold',
        
        color: 'white',
    },
});

export default Header;