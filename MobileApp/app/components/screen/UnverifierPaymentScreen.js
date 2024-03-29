import { React, useEffect, useState, useContext } from 'react';
import { Image, Button, Text, FlatList, View, StyleSheet, TextInput } from 'react-native';
import PaymentCard from '../../components/PaymentCard';
import StoreContext from './GlobalState';
import NewCard from '../NewCard';
import colors from '../colors';
import TopButtons from './TopButtons';
import Screen from '../Screen';
import axios from 'axios';

import { getClients } from '../APIcalls/getRequests'
import { Url } from './Core';
import Header from '../Header';


function UnverifierPaymentScreen({ navigation }) {

  // const list = [
  //   { Name: 'Hassan Mansoor1', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 1 },
  //   { Name: 'Hammad Ahmed', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 2 },
  //   { Name: 'Anas Mansoor', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 3 },
  //   { Name: 'Bilal Zia', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 4 },
  //   { Name: 'Mohib Zia', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 5 },
  // ];
  // console.log("in client Screen",list)
  const [clients, setClients] = useState();
  const [payments, setPayments] = useState();
  const [filtered, setfiltered] = useState();
  const [filterText, setfilterText] = useState();
  const userContext = useContext(StoreContext)

  const userId = userContext.Role._id

  //- for filtered payments
  useEffect(() => {
    let filter = {}
    if (userContext.Role.Role == 'Rider') {
      filter.heldby = userId;
      filter.status = "Unverified";
      getPayments(filter);
    }
    if (userContext.Role.Role == 'Cashier') {
      filter.AssignedBy = userId;
      //   filter.status="Un Verified";
      getPayments(filter);
    }



  }, [])
  const  handleSearch=async()=>{
    console.log("Search",filterText);
    const filtereddata=payments.filter(paymentData=>(nameFilter(paymentData.PaymentName,filterText)));
    setfiltered(filtereddata);

  }
  function nameFilter(paymentName, name){
    console.log("Filters",paymentName.toLowerCase().includes(name.toLowerCase()))
    return paymentName.toLowerCase().includes(name.toLowerCase());

  }
  async function getPayments(filter) {
    axios({
      method: "post",
      url: Url + "/filteredPayments",
      data: {
        filter: filter
      }

    }
    ).then((res) => {
      console.log("Response in All Payments",res)
      var a = res.data

      setPayments(a);
      setfiltered(a);
    }).catch((error) => {
      console.log(error);
    })

  }




  return (
    <Screen>
      <Header
        header={'All Payments'}
        navigation={navigation}
      />

      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/kollectit.png')}
        />
        <View style={styles.textContainer}>
          <TextInput style={{ fontWeight: 'bold', fontSize: 18, width: '100%' }} placeholder='Client Name' onChangeText={(text) =>setfilterText(text.toString())} />
        </View>
        <Button title='Search' onPress={() =>handleSearch()} color={'#578B9D'}/>
      </View>
      {payments != null ?
        <FlatList
          data={filtered}
          keyExtractor={listing => listing.ClientId}
          renderItem={({ item, i }) =>
            <PaymentCard
              key={i}
              title={item.PaymentName}
              subTitle={item.PaymentAmount}
              subSubTitle={item.status}
              code={item.VerificationCode}
              onPress={() => navigation.navigate('OTP Screen', item)}
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
    // height: 50,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 10,
  },
})

export default UnverifierPaymentScreen;