import React from 'react';
import { StyleSheet } from 'react-native';

import { DataTable } from 'react-native-paper';
import AppText from './AppText';

function PaymentList({name, amount, tittle}) {
    return (
        <DataTable.Row style={{width: '100%'}}>
            <DataTable.Cell>{name}</DataTable.Cell>
            <DataTable.Cell >{amount}</DataTable.Cell>
        </DataTable.Row>
        
    );
}

export default PaymentList;