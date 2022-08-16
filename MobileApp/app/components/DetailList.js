import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import axios from 'axios';

import { DataTable } from 'react-native-paper';
import AppText from './AppText';

function DetailList({nature, from, to, amount}) {

    const[ fromname,setFromName]=useState("");

    useEffect(() => {
        axios({
       
            method: "post",
            url: "https://paym-api.herokuapp.com/auth/EmployeeClientData",
            data:{
                EmployeeObjectId: from
              }

        }).then((res) => {
            
            console.log(res.data, "fromEmployee");

        }).catch((error) => {
            console.error(error);
       
        });
    }, [])
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