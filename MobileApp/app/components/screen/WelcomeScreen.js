import React, { useEffect } from 'react';

import { StyleSheet, View, Image, ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageSlider } from "react-native-image-slider-banner";

import AppButton from '../AppButton';
import colors from '../colors';
import Screen from '../Screen';
import { useState } from 'react';

function WelcomeScreen({ navigation }) {



  useEffect(async () => {
    <ActivityIndicator />

    let User_Details = await AsyncStorage.getItem('User');

    console.log("from Async", User_Details);

    if (User_Details != null) {
      const user = JSON.parse(User_Details)
      console.log("UserDetail by default", user);
      // navigation.navigate('Login')
    }

  }, [])

  return (
    <Screen style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={{ flex: 3, borderRadius: 20, overflow: 'hidden' }}>
          <ImageSlider
            localImg={true}
            caroselImageContainerStyle={{ marginVertical: -30 }}
            caroselImageStyle={{ borderRadius: 30, }}
            data={[
              { img: require('../../assets/banner_1.png') },
              { img: require('../../assets/banner_2.png') },
              { img: require('../../assets/banner_3.png') }
            ]}
            autoPlay={true}
            // onItemChanged={(item) => console.log("item", item)}
            closeIconColor="#fff"
          />
        </View>
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.imageContainer}
          />
        </View>
      </View>
      <View style={styles.lowerContainer}>
        <AppButton
          title='Login'
          // onPress={()=> {console.log('Login Button Pressed')}}
          onPress={() => navigation.navigate('Login')}
          color='teal'
        />
        <AppButton
          title='Register'
          // onPress={()=> {console.log('Register Button Pressed')}}
          onPress={() => navigation.navigate('Register')}
          color='secondary'
        />
        <AppButton
          title={`Continue ${User_Details.Name}`}
          // onPress={()=> {console.log('Login Button Pressed')}}
          onPress={() => navigation.navigate('Login')}
          color='teal'
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: colors.backGround,
  },
  upperContainer: {
    flex: 2,
  },
  lowerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 150,
  },
});

export default WelcomeScreen;