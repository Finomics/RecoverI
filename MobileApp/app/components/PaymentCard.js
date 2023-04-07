import {React,useContext} from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import colors from './colors';
import AppText from './AppText';
import NewCard from './NewCard';
import StoreContext from '../components/screen/GlobalState';


function PaymentCard({title, subTitle, subSubTitle, onPress,code }) {
    const userContext = useContext(StoreContext);
    console.log("User in Payment Card",userContext);
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.detailsContainer}>
                <AppText style={styles.title} numberOfLines={1}>Name: {title}</AppText>
                <AppText style={styles.subTitle} numberOfLines={1}>Amount: {subTitle}</AppText>
                <AppText style={styles.subTitle} numberOfLines={1}>Status: {subSubTitle}</AppText>
                {(userContext.Role.Role=='Cashier'&&subSubTitle=="Unverified")?
                <AppText style={styles.subTitle} numberOfLines={1}>Verification Code: {code}</AppText>
          :
          <></>}
                </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card:{
        borderRadius: 15,
        backgroundColor: '#B4C6D1',
        marginBottom: 15,
        marginHorizontal: 10,
        overflow: 'hidden',
        paddingVertical: 10,
        paddingLeft: 10,
        borderColor: '#B4C6D1',
        borderWidth: 2,
    },
    subTitle:{
        color: 'black',
        // fontWeight: 'bold',
        paddingLeft: 3
    },
    title:{
        color: 'black',
        marginBottom: 7,
        fontWeight: 'bold',
    },
})

export default PaymentCard;