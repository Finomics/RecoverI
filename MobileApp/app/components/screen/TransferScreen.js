import { React, useEffect, useState, useContext } from 'react';
import { Image, Button, Modal, FlatList, View, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import TransferCard from '../TransferCard';
import NewCard from '../NewCard';
import colors from '../colors';
import CashierNameCard from '../CashierNameCard';
import Screen from '../Screen'
import { getClients } from '../APIcalls/getRequests'
import AppButton from '../AppButton';
import StoreContext from './GlobalState';
import axios from 'axios';
import TopButtons from './TopButtons';
import { Url } from './Core';
import Header from '../Header';
import Icon from '../Icon';


function TransferScreen({ navigation }) {
  const list = [
    { Name: 'Hassan Mansoor1', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 1 },
    { Name: 'Hammad Ahmed', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 2 },
    { Name: 'Anas Mansoor', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 3 },
    { Name: 'Bilal Zia', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 4 },
    { Name: 'Mohib Zia', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 5 },
  ];
  // console.log("in client Screen",list)
  const [payments, setPayments] = useState();
  const [clients, setClients] = useState();
  const [transferId, setTransferId] = useState([]);
  const [transferAmounts, setTransferAmounts] = useState([]);
  const [realTime, setRealTime] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [CashierName, setCashierName] = useState([]);
  const [heldbyCashierName, setheldbyCashierName] = useState([]);
  const [load, setLoad] = useState(false);
  const [name, setName] = useState('Select Cashier')

  // console.log(RiderContextData.Role.employeeName, "RiderNameRiderName");
  const [CashierObjectID, setCashierObjectID] = useState([]);
  const RiderContextData = useContext(StoreContext)
  const BelongsTo = RiderContextData.Role.createdBy
  const RiderID = RiderContextData.Role._id

  // console.log(RiderContextData.Role._id, "RiderNameRiderName");


  // useEffect(() => {
  //   axios({
  //     method: "post",
  //        url: Url + "/heldBy",
  //     data: {
  //       heldby: RiderContextData.Role._id
  //     }
  //   }).then((res) => {
  //     setClients(res.data);
  //     // console.log(res.data);
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // }, [realTime])


  useEffect(() => {
    axios({
      method: "post",
      url: Url + "/auth/craetedby",
      data: {
        createdBy: RiderContextData.Role.createdBy,
        Role: "Cashier"
        // Role: Globaledata.Role.Role
      }
    }).then((res) => {

      setCashierName(res.data);
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }, [realTime])


  useEffect(() => {
    axios({
      method: "post",
      url: Url + "/filteredPayments",
      data: {
        filter: {
          heldby: RiderContextData.Role._id
        }
      }

    }).then((res) => {
      var a = res.data
      setPayments(a);
      console.log("Payments of", RiderContextData.Role, res.data);
    }).catch((error) => {
      console.log(error);
    })
  }, [realTime])


  const handlePress = () => {

    setModalVisible(true)
  }


  const handleValues = (ids, amounts) => {
    setTransferId(ids);
    setTransferAmounts(amounts);
    console.log(ids, "datatatata");
  }


  const handlebyCashier = (data) => {

    setheldbyCashierName(data.employeeName)
    setName(data.employeeName)
    setModalVisible(!modalVisible)
    setheldbyCashierName(data)

    //   console.log(data._id, "Cashier Data");
    setCashierObjectID(data._id)
  }
  // console.log(heldbyCashierName, "heldbyCashierNameheldbyCashierNameheldbyCashierName");

  function PaymentTransferCashier() {
    setLoad(true);
    let amounts = [0];
    // console.log(transferId, "transferId");
    for (let i = 0; i < transferId.length; i++) {

      var paymentObjectId = transferId[i]
      console.log(paymentObjectId, "paymentObjectId");

      axios({
        method: "post",
        url: Url + `/auth/paymentTransfer/${paymentObjectId}`,
        data: {
          heldby: heldbyCashierName._id,
          status: "Verified"
        }
      }).then((res) => {
        amounts.push(res.data.PaymentAmount);
        console.log(res, "res");
        alert("Payment Transferred");
        setLoad(false);

        setRealTime(!realTime);
        setTransferId("")


      }).catch((err) => {
        console.log(err, "error");
        alert("Error in Payment transfer");
      })
    }
    transaction(transferId, transferAmounts);
  }

  function transaction(id, amount) {
    console.log(transferId, "transfer", CashierObjectID, "transaction");

    axios({
      method: "post",
      url: Url + "/auth/transaction",
      data: {
        nature: "Internal Transfer",
        Instrument: id,
        PaymentAmount: amount,
        BelongsTo: BelongsTo,
        to: CashierObjectID,
        From: RiderID,
      }

    }).then((res) => {
      console.log(res.data, "transaction Response");
    }).catch((err) => {

      console.log(err, "transaction Error");
    })
  }


  return (
    <Screen>
      <Header
        header={'Transfer'}
        navigation={navigation}
      />
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/logo.png')}
        />
        <View style={styles.textContainer}>
          <TextInput style={{ fontWeight: 'bold', fontSize: 18, width: '100%' }} placeholder='Client Name' />
        </View>
        <Button title='Search' color={'#578B9D'} />
      </View>
      {payments != null ?
        <FlatList
          // key={i}
          data={payments}
          keyExtractor={listing => listing.ClientId}
          renderItem={({ item, i }) =>
            <TransferCard
              key={i}
              title={item.PaymentName}
              subTitle={item.PaymentAmount}
              subSubTitle={item.status}
              // value={item.PaymentId}
              value={item}
              arrayList={handleValues}
            />
          }
        /> : <></>}
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginBottom: 10 }}>
        <View style={{ width: '45%' }}>
          <AppButton title={name} color='teal' style={{ width: 50 }} onPress={
            () => handlePress()
          } />
        </View>
        <View style={{ width: '45%' }}>
          {
            load ?
              <ActivityIndicator
                size='large'
                color="#0000ff"
              />
              :
              <AppButton title='Submit' color='teal' onPress={
                // () => console.log(transferId, "djdjdjdj")
                PaymentTransferCashier
              } />
          }
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >
       
        {/* <Button title='List of Cashier' onPress={() => setModalVisible(!modalVisible)} color={colors.teal} /> */}
        <View style={{ margin: "5%"}}>
          <Icon
            name='backburger'
            size={50}
            backgroundColor='transparent'
            iconColor={colors.royalBlue}
            onPress={() => setModalVisible(!modalVisible)}
            title='Back'
          />
        </View>
        <FlatList
          

          data={CashierName}
          keyExtractor={item => item.value}
          // keyExtractor={tempRiderName => tempRiderName.value.toString()}
          renderItem={({ item }) =>
            <CashierNameCard
              name={item.employeeName}
              onPress={() => handlebyCashier(item)}

            />
          }
        />
      </Modal>
    </Screen>
  );
}
const styles = StyleSheet.create({
  logo: {
    height: 120,
    width: 300,
  },
  logoContainer: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
    // backgroundColor: colors.
  },
  textContainer: {
    width: '80%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
})
export default TransferScreen;