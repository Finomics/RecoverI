import React from 'react';

import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';

import Header from '../Header';
import IconButton from '../IconButton';
import Screen from '../Screen';

const {width, height} = Dimensions.get('screen');

function CashierHomeScreenCopy(props) {
    return (
        <Screen>
            <Header/>
            <View>
                <Image
                    style={{width: width, height: height*0.2,}}
                    source={require('../../assets/kollectit.png')}
                />

            </View>
            <ScrollView>
                <IconButton
                    title={'Title'}
                    subTitle={'Sub-Title'}
                    image={require('../../assets/delivery-man.png')}
                />
                <IconButton
                    title={'Title'}
                    subTitle={'Sub-Title'}
                    image={require('../../assets/delivery-man.png')}
                />
                <IconButton
                    title={'Title'}
                    subTitle={'Sub-Title'}
                    image={require('../../assets/delivery-man.png')}
                />
                <IconButton
                    title={'Title'}
                    subTitle={'Sub-Title'}
                    image={require('../../assets/delivery-man.png')}
                />
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container:{},
});

export default CashierHomeScreenCopy;