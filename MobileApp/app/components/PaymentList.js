import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import axios from 'axios';

import { DataTable } from 'react-native-paper';
import AppText from './AppText';
import StoreContext from './screen/GlobalState';
import { Url } from './screen/Core';




function PaymentList({ item, amount, tittle }) {

    const [total, setTotal] = useState(0)
    const globalEmployee = useContext(StoreContext)
    console.log(globalEmployee.Role._id);

    useEffect(() => {
        axios({

            method: "post",
            url: Url +  "/collectionBy",
            data: {
                heldby: item._id,
            }

        }).then((res) => {
            //   console.log(res.data, "datatotal");
            setTotal(res.data.totalAmount)
        }).catch((error) => {
            console.error(error);

        });
    }, [item])
    return (
        <DataTable.Row style={{ width: '100%' }}>
            <DataTable.Cell>{item.employeeName}</DataTable.Cell>
            <DataTable.Cell >{total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</DataTable.Cell>
        </DataTable.Row>

    );
}

export default PaymentList;