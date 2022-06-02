import React, { useState } from 'react';

import { Image, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';

import Screen from '../Screen';
import Icon from '../Icon';
import AppTextInput from '../AppTextInput';
import ImageInput from '../ImageInput';
import CameraInput from '../CameraInput';
import colors from '../colors';
import AppButton from '../AppButton';
import AppText from '../AppText';


function RecoveryScreen({ navigation }) {

  const [isNew, setIsNew] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const handlePress = () => console.log('Icon Press');

  return (
    <Screen style={styles.backGround}>
      <View style={styles.logoContainer}>
      <Image
          style={{width: 330, height: 140}} 
          source={require('../../assets/logo.png')} 
        />
      </View>
      <View style={styles.inputContainer}>
      <AppTextInput
          placeholder='Client Name'
          icon='account-arrow-right-outline'
        />
        <AppTextInput
          placeholder='Amount'
          icon='currency-rupee'
          keyboardType='numeric'
        />
      </View>
      <View style={ styles.chequeBarContainer}>
        <View style={styles.chequeBarLeft}>
          <AppText style={styles.text}>Cheque</AppText>
        </View>
        <View style={styles.chequeBarRight}>
          <Switch value={isNew} onValueChange={newValue => setIsNew(newValue)} />
        </View>
      </View>
      <View style={styles.image}>
        <CameraInput 
          imageUri={imageUri}
          onChangeImage={uri => setImageUri(uri)} 
        />

        <AppButton title='Continue' color= 'royalBlue' onPress={()=> navigation.navigate('OTPScreen')}/>
      </View>
      <View style={styles.iconBar}>
        <TouchableOpacity onPress={handlePress}>
          <Icon name='home' backgroundColor={colors.backGround} iconColor= {colors.royalBlue} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress}>
          <Icon name='account' backgroundColor={colors.backGround} iconColor={colors.royalBlue} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress}>
          <Icon name='magnify' backgroundColor={colors.backGround} iconColor= {colors.royalBlue} />
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
    backGround: {
      backgroundColor: '#D6DCE5',
      flex: 1,
    },
    chequeBarContainer:{
      width: '100%', 
      flexDirection: 'row',
      marginBottom: 15,
    },
    chequeBarRight:{
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    chequeBarLeft:{
      width: '50%',
      justifyContent: 'center',
    },
    iconBar:{
      marginVertical: 15,
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    image:{
      alignItems: 'center',
      marginVertical: 10,
    },
    inputContainer:{
      width: '100%', 
      paddingHorizontal: 20,
    },
    logo:{
      height: 120,
      width: 300,
    },
    logoContainer:{ 
      alignItems: 'center',
      width: '100%', 
      marginVertical: 10,
    },
    text:{
      fontWeight: '900',
      fontStyle: 'italic',
      textAlign: 'right',
    },
  });


export default RecoveryScreen;