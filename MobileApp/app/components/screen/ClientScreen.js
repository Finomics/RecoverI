import React from 'react';
import { Image, Button, Text, ScrollView, View, StyleSheet, TextInput } from 'react-native';
import Card from '../Card';
import colors from '../colors';
import Screen from '../Screen'



function ClientScreen(props) {
    return (
        <Screen>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo} 
                    source={require('../../assets/logo.png')} 
                />
                <View style={styles.textContainer}>
                    <TextInput style={{fontWeight:'bold'}} placeholder='Client Name'/>
                </View>
                <Button title='Search'/>
            </View>
            <ScrollView>
                <Card
                  title='Hassan Mansoor'
                  subTitle='0324-2886139' 
                  subSubTitle='xxxxxx'
                />
                <Card
                  title='Hammad Ahmed'
                  subTitle='0345-2057798' 
                  subSubTitle='xxxxxx'
                />
                <Card
                  title='Anas Mansoor'
                  subTitle='0300-2345930' 
                  subSubTitle='xxxxxx'
                />
                <Card
                  title='Bilal Zia'
                  subTitle='0343-2842087' 
                  subSubTitle='xxxxxx'
                />
                <Card
                  title='Mohib Zia'
                  subTitle='0301-2283237' 
                  subSubTitle='xxxxxx'
                />
                <Card
                  title='Mohib Zia'
                  subTitle='0301-2283237' 
                  subSubTitle='xxxxxx'
                />
                <Card
                  title='Mohib Zia'
                  subTitle='0301-2283237' 
                  subSubTitle='xxxxxx'
                />
                <Card
                  title='Mohib Zia'
                  subTitle='0301-2283237' 
                  subSubTitle='xxxxxx'
                />
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    logo:{
        height: 120,
        width: 300,
      },
      logoContainer:{ 
        alignItems: 'center',
        width: '100%', 
        marginVertical: 10,
        // backgroundColor: colors.
      },
      textContainer:{
        width: '80%',
        height: 50,
        backgroundColor: colors.light,
        borderRadius: 15,
        padding: 10,
        marginBottom: 10,
      },
})

export default ClientScreen;