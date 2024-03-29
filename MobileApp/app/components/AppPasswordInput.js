import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Platform, TouchableWithoutFeedback} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from './colors';

function AppPasswordInput({ icon, ...otherProps }) {

    const [visibility, setVisibility] = useState(false)

    const handlePress=()=>{
        setVisibility(previousState => !previousState)
    }

    return (
        <View style={styles.container}>
            {icon && <MaterialCommunityIcons name={icon} size={20} style={styles.icon} />}
            <TextInput style={styles.textInput} { ...otherProps }
                secureTextEntry={!visibility} 
            />
            <TouchableWithoutFeedback onPress={()=> handlePress()}>
                <MaterialCommunityIcons name={visibility ? 'eye-outline' : 'eye-off-outline'} size={20} style={styles.icon} />
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#E6E6E6',
        borderRadius: 20,
        flexDirection: 'row',
        width: '100%',
        height: 60,
        padding: 15,
        marginVertical: 10,
        alignItems: 'center',
    },
    icon:{
        color: colors.black,
    },
    textInput:{
        fontSize: 18,
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
        alignItems: 'center',
        marginLeft: 20,
        flex: 1,
    },
})

export default AppPasswordInput;