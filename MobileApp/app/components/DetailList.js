import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import axios from 'axios';

import { DataTable } from 'react-native-paper';
import AppText from './AppText';

function DetailList({nature, from, to, amount}) {

    const[ fromName,setFromName]=useState("");
    const[ toName,setToName]=useState("");

    useEffect(() => {
        axios({
       
            method: "post",
            url: "https://paym-api.herokuapp.com/auth/empolyeeClientData",
            data:{
                EmployeeObjectId: from
              }

        }).then((res) => {
            
            console.log(res.data, "fromEmployee");
            setFromName(res.data.Employee[0].employeeName)

        }).catch((error) => {
            console.error(error);
       
        });
        // for to,
        axios({
       
            method: "post",
            url: "https://paym-api.herokuapp.com/auth/empolyeeClientData",
            data:{
                EmployeeObjectId: to
              }

        }).then((res) => {
            
            console.log(res.data, "ToEmployee");
            setToName(res.data.Employee[0].employeeName)

        }).catch((error) => {
            console.error(error);
       
        });

    }, [])
    return (
        <DataTable.Row style={{width: '100%'}}>
            <DataTable.Cell>{nature}</DataTable.Cell>
            <DataTable.Cell>{fromName}</DataTable.Cell>
            <DataTable.Cell>{toName}</DataTable.Cell>
            <DataTable.Cell >{amount}</DataTable.Cell>
        </DataTable.Row>
        
    );
}

export default DetailList;