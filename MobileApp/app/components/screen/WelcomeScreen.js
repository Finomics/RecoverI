import React, { useEffect } from 'react';

import { StyleSheet, View, Image, ActivityIndicator, Text } from 'react-native';

import { ImageSlider } from "react-native-image-slider-banner";

import AppButton from '../AppButton';
import colors from '../colors';
import Screen from '../Screen';

function WelcomeScreen({navigation}) {

    useEffect(()=>{
      <ActivityIndicator/>
    },[])
    return (
        <Screen style={styles.container}>
            <View style={styles.logoContainer}>
              <View style={{flex: 2}}>
                <ImageSlider
                  // localImg={true}
                  data={[
                      {img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU'},
                      {img: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg'},
                      {img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg'}
                  ]}
                  autoPlay={true}
                  onItemChanged={(item) => console.log("item", item)}
                  closeIconColor="#fff"
                />
              </View>
              <View style={{flex: 1}}>
                  {/* <Text>hello</Text> */}
                  <Image
                      source={require('../../assets/logo.png')}
                      style={styles.imageContainer}
                  />

              </View>
            </View>
            <View style={styles.buttonContainer}>
                <AppButton 
                    title='Login' 
                    // onPress={()=> {console.log('Login Button Pressed')}}
                    onPress={()=> navigation.navigate('Login')}
                    color= 'teal'
                />
                <AppButton 
                    title='Register'
                    // onPress={()=> {console.log('Register Button Pressed')}}
                    onPress={()=> navigation.navigate('Register')}
                    color= 'secondary'
                />
            </View> 
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.backGround,
    },
    logoContainer:{
      flex: 4,
      width: '100%',
      // backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer:{
      flex: 1,
      // backgroundColor: 'blue',
      width: '100%',
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageContainer:{
      width: 300,
      height: 100,
    },
  });

export default WelcomeScreen;