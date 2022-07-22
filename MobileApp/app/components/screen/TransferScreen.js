import { React, useEffect, useState, useContext } from 'react';
import { Image, Button, Text, FlatList, View, StyleSheet, TextInput } from 'react-native';
import TransferCard from '../TransferCard';
import NewCard from '../NewCard';
import colors from '../colors';
import Screen from '../Screen'
import { getClients } from '../APIcalls/getRequests'
import AppButton from '../AppButton';
import StoreContext from './GlobalState';
import axios from 'axios';


function TransferScreen({ navigation }) {

  // const list = [
  //   { Name: 'Hassan Mansoor1', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 1 },
  //   { Name: 'Hammad Ahmed', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 2 },
  //   { Name: 'Anas Mansoor', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 3 },
  //   { Name: 'Bilal Zia', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 4 },
  //   { Name: 'Mohib Zia', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 5 },
  // ];
  // console.log("in client Screen",list)

  const [clients, setClients] = useState();
  const [transferId, setTransferId] = useState([]);
  const [realTime, setRealTime] = useState(false)
  const RiderContextData = useContext(StoreContext)


  // console.log(RiderContextData.Role.employeeName, "RiderNameRiderName");




  useEffect(() => {
    axios({
      method: "post",
      url: "https://paym-api.herokuapp.com/heldBy",
      data: {
        heldby: RiderContextData.Role.employeeName
      }
    }).then((res) => {
      setClients(res.data);
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }, [realTime])



  const handleValues = (data) => {
    setTransferId(data)
  }


  function PaymentTrasferCashier() {

    // console.log(transferId, "transferId");

    for (let i = 0; i < transferId.length; i++) {

      var paymentObjectId = transferId[i]

      console.log(paymentObjectId, "paymentObjectId");

      axios({
        method: "post",
        url: `https://paym-api.herokuapp.com/auth/paymenTrasfer/${paymentObjectId}`,
        data: {
          heldby: "Hammad Bhi Cashier"
        }
      }).then((res) => {
        console.log(res.data, "res");
        setRealTime(!realTime)
        setTransferId("")
        // alert("Payment Trasfare has been successfully!")

      }).catch((err) => {
        console.log(err, "error");
      })
    }
  }

  return (
    <Screen>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/logo.png')}
        />
        <View style={styles.textContainer}>
          <TextInput style={{ fontWeight: 'bold', width: '100%' }} placeholder='Client Name' />
        </View>
        <Button title='Search' />
      </View>
      {clients != null ?
        <FlatList
          // key={i}
          data={clients}
          keyExtractor={listing => listing.ClientId}
          renderItem={({ item, i }) =>
            <TransferCard
              key={i}
              title={item.PaymentName}
              subTitle={item.PaymentAmount}
              subSubTitle={item.status}
              // value={item.PaymentId}
              value={item._id}
              arrayList={handleValues}
            />
          }
        /> : <></>}
      {/* <NewCard
                  items={categories[0]}
                  onPress={()=> navigation.navigate('RecoveryScreen', categories[0])
                  }
                />
                <NewCard
                  items={categories[1]}
                  onPress={()=> navigation.navigate('RecoveryScreen', categories[1])
                  }
                />
                <NewCard
                  items={categories[2]}
                  onPress={()=> navigation.navigate('RecoveryScreen', categories[2])
                  }
                />
                <NewCard
                  items={categories[3]}
                  onPress={()=> navigation.navigate('RecoveryScreen', categories[3])
                  }
                />
                <NewCard
                  items={categories[4]}
                  onPress={()=> navigation.navigate('RecoveryScreen', categories[4])
                  }
                /> */}
      <AppButton title='hello' color='teal' onPress={
        // () => console.log(transferId, "djdjdjdj")
        PaymentTrasferCashier
      } />
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
    backgroundColor: colors.light,
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
})

export default TransferScreen;