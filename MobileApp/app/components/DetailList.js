import React from 'react';
import { StyleSheet } from 'react-native';

import { DataTable } from 'react-native-paper';
import AppText from './AppText';

function DetailList({nature, from, to, amount}) {
    return (
        <DataTable.Row style={{width: '100%'}}>
            <DataTable.Cell>{nature}</DataTable.Cell>
            <DataTable.Cell>{from}</DataTable.Cell>
            <DataTable.Cell>{to}</DataTable.Cell>
            <DataTable.Cell >{amount}</DataTable.Cell>
        </DataTable.Row>
        
    );
}

export default DetailList;