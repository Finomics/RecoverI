import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import axios from 'axios';

import { DataTable } from 'react-native-paper';
import AppText from './AppText';

function DetailList({ nature, from, to, amounts }) {

    const [fromName, setFromName] = useState("");
    const [toName, setToName] = useState("");
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        setAmount(amounts[0]);
        if(nature=='Collection'){
            forCollection();

        }else if(nature=='Internal Transfer'){
            forInternalTransfer();

        }
        // axios({

        //     method: "post",
        //     url: "https://paym-api.herokuapp.com/auth/empolyeeClientData",
        //     data: {
        //         EmployeeObjectId: from
        //     }

        // }).then((res) => {

        //     console.log(res.data, "fromEmployeeeeeeeeeee");
           

        // }).catch((error) => {
        //     console.error(error);

        // });
        // // for to,
        // axios({

        //     method: "post",
        //     url: "https://paym-api.herokuapp.com/auth/empolyeeClientData",
        //     data: {
        //         EmployeeObjectId: to
        //     }

        // }).then((res) => {

        //     console.log(res.data, "ToEmployee");
        //     setToName(res.data.Employee[0].employeeName)

        // }).catch((error) => {
        //     console.error(error);

        // });

    }, [])
     function forCollection(){
        axios({

            method: "post",
            url: "https://paym-api.herokuapp.com/auth/empolyeeClientData",
            data: {
                ClientObjectId:from,
                EmployeeObjectId: to
            }

        }).then((res) => {

            console.log(res.data, "in collection API");
            setFromName(res.data.Client[0].ClientName);
            setToName(res.data.Employee[0].employeeName)

        }).catch((error) => {
            console.error(error);

        });
     }
     function forInternalTransfer(){
        //for from
        axios({

            method: "post",
            url: "https://paym-api.herokuapp.com/auth/empolyeeClientData",
            data: {
                
                EmployeeObjectId: from
            }

        }).then((res) => {

            console.log(res.data, "in Internal Transfer from API");
            setFromName(res.data.Employee[0].employeeName);
           

        }).catch((error) => {
            console.error("Error in Internal transfer from ",error);

        });
        //for to
        axios({

            method: "post",
            url: "https://paym-api.herokuapp.com/auth/empolyeeClientData",
            data: {
                
                EmployeeObjectId: to
            }

        }).then((res) => {

            console.log(res.data, "in Internal Transfer to API");
            setToName(res.data.Employee[0].employeeName)

        }).catch((error) => {
            console.error("Error in Internal transfer to ",error);

        });
     }
    return (
        <DataTable.Row style={{ width: '100%' }}>
            <DataTable.Cell>{nature}</DataTable.Cell>
            <DataTable.Cell>{fromName}</DataTable.Cell>
            <DataTable.Cell>{toName}</DataTable.Cell>
            <DataTable.Cell >{amount}</DataTable.Cell>
        </DataTable.Row>

    );
}

export default DetailList;