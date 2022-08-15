import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet, ScrollView, Text, FlatList } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { DataTable } from 'react-native-paper';
import DetailList from '../DetailList';
import axios from 'axios';

import AppText from '../AppText';
import Screen from '../Screen';
import colors from '../colors';
import TopButtons from './TopButtons';

const attendanceData = [
    {
        emplyeeName: "Cashier1",
        amount: 600000,
    },
    {
        emplyeeName: "Cashier2",
        amount: 700000,
    },
    {
        emplyeeName: "Cashier3",
        amount: 800000,
    },
  ]


function DetailScreen({ navigation }) {
    const[transactions,setTransactions]= useState([]);
    useEffect(() => {
        axios({
       
            method: "get",
            url: "https://paym-api.herokuapp.com/auth/transaction",
            

        }).then((res) => {
            setTransactions(res.data);
            console.log(res.data, "Transactions");

        }).catch((error) => {
            console.error(error);
       
        });
    }, [])
  return (
    <Screen>
        <TopButtons header={'Transactions Screen'} navigation={navigation}/>
        <View>
            <AppText style={styles.title}> 
                    Transactions
            </AppText>
        </View>
            <View style={styles.container}>
                <DataTable style={{width: '100%'}}>
                    <DataTable.Header >
                        <DataTable.Title>
                            <AppText style={styles.header}>Nature</AppText>
                        </DataTable.Title>
                        <DataTable.Title>
                            <AppText style={styles.header}>From</AppText>
                        </DataTable.Title>
                        <DataTable.Title>
                            <AppText style={styles.header}>To</AppText>
                        </DataTable.Title>
                        <DataTable.Title>
                            <AppText style={styles.header}>Amount</AppText>
                        </DataTable.Title>
                    </DataTable.Header>
                </DataTable>
                <FlatList
                    data={transactions}
                    renderItem={({item})=>
                        <DetailList
                            nature={item.Nature}
                            from={item.From}
                            to={item.to}
                            amount={item.amount}
                        /> 
                    }
                />
            </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
    logoContainer:{
        width: '100%',
    },
    header:{
        fontWeight: 'bold',
        color: colors.teal
    },
    title:{
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.teal
    },

})

export default DetailScreen;