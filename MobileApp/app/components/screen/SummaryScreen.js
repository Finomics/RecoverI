import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet, ScrollView, Text, FlatList } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { DataTable } from 'react-native-paper';
import PaymentList from '../PaymentList';

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


function SummaryScreen(props) {
    return (
        <Screen>
            <TopButtons header={'Summary Screen'}/>
            <View>
                <AppText style={styles.title}> 
                        Payment Record
                </AppText>
            </View>
                <View style={styles.container}>
                    <DataTable style={{width: '100%'}}>
                        <DataTable.Header >
                            <DataTable.Title>
                                <AppText style={styles.header}>Name</AppText>
                            </DataTable.Title>
                            <DataTable.Title>
                                <AppText style={styles.header}>Amount</AppText>
                            </DataTable.Title>
                        </DataTable.Header>
                    </DataTable>
                    <FlatList
                        data={attendanceData}
                        renderItem={({item})=>
                            <PaymentList
                                name={item.emplyeeName}
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

export default SummaryScreen;