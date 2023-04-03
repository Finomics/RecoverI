import React, { useEffect, useState }  from 'react';

import { View, StyleSheet, Button } from 'react-native';

import defaultStyles from './styles';
import colors from './colors';
import PhoneInput from 'react-native-phone-number-input';

function AppPhoneInput({placeholder,  ...otherProps}) {
  
  return (
    <View style={styles.container}>
        <PhoneInput
            containerStyle={styles.countryBox}
            textContainerStyle={styles.numberBox}
            textInputStyle={styles.textStyling}
            codeTextStyle={[styles.textStyling, {marginLeft: '-3%', fontWeight: 'bold'}]}
            defaultCode="PK"
            layout="first"
            placeholder={placeholder}
            {...otherProps}        
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    // backgroundColor: defaultStyles.colors.light,
    backgroundColor: '#E6E6E6',
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    justifyContent: 'center',
  },
  countryBox: {
    width: '100%',
    backgroundColor: 'transparent',
    fontSize: 30
  },
  numberBox:{
    backgroundColor: 'transparent',
    paddingVertical: 0,
  },
  textStyling:{
    fontSize: 18,
    fontFamily: Platform.OS ==='android' ? 'Roboto' : 'Avenir',
    color:colors.dark,
  },
});

export default AppPhoneInput;