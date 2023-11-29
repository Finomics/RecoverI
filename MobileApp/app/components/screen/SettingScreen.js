import React, { useEffect } from 'react';

import { View, StyleSheet, Dimensions, Image, ScrollView, Text } from 'react-native';
import Screen from '../Screen';
import Header from '../Header';
import IconButton from '../IconButton';

const { width, height } = Dimensions.get('screen');

function SettingScreen({ navigation, route }) {



    const user= route.params;
    useEffect(() => {
        //Runs on every render
        console.log(route.params);
        
      },[]);

    const handleClientUpdate = () => {
        console.log('handleClientUpdate');
        navigation.navigate('ViewClientMember')
    }
    
    const handleTeamUpdate = () => {
        console.log('handleTeamUpdate');
        navigation.navigate('TeamMember')
    }

    const handleChangePassword = () => {
        console.log('handleChangePassword');
        navigation.navigate('Change Password');

    }

    return (
        <Screen>
            <Header
                header={"Settings"}
                navigation={navigation}
            />
            <View style={{ width: width, height: height * 0.2, justifyContent: 'center' }}>
                <Image
                    style={{ width: width, height: height * 0.13, }}
                    source={require('../../assets/kollectit.png')}
                />
            </View>
            <ScrollView>
                <IconButton
                    title={"Client Update"}
                    subTitle={'ABC'}
                    image={require('../../assets/clients-list.png')}
                    onPress={handleClientUpdate}
                />
                { user =='Cashier' ?
                    
                    null
                    :
                    
                    <IconButton
                        title={"Team Update"}
                        subTitle={'ABC'}
                        image={require('../../assets/client-list.png')}
                        onPress={handleTeamUpdate}
                    />
                
                }
                <IconButton
                    title={"Change Password"}
                    subTitle={'ABC'}
                    image={require('../../assets/password.png')}
                    onPress={handleChangePassword}               
                />
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container:{},
});

export default SettingScreen;