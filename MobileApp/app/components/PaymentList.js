import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import axios from 'axios';

import { DataTable } from 'react-native-paper';
import AppText from './AppText';
import StoreContext from './screen/GlobalState';

function PaymentList({ name, amount, tittle }) {

    const [total, setTotal] = useState(0)
    const globalEmployee = useContext(StoreContext)
    console.log(globalEmployee.Role._id);

    useEffect(() => {
        axios({

            method: "post",
            url: "https://paym-api.herokuapp.com/collectionBy",
            data: {
                heldby: globalEmployee.Role._id,
            }

        }).then((res) => {
            //   console.log(res.data, "datatotal");
            setTotal(res.data.totalAmount)
        }).catch((error) => {
            console.error(error);

        });
    }, [name])
    return (
        <DataTable.Row style={{ width: '100%' }}>
            <DataTable.Cell>{name}</DataTable.Cell>
            <DataTable.Cell >{total}</DataTable.Cell>
        </DataTable.Row>

    );
}

export default PaymentList;