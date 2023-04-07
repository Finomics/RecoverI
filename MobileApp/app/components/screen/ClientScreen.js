import { React, useContext, useEffect, useState } from 'react';
import { Image, Button, Text, FlatList, View, StyleSheet, TextInput } from 'react-native';
import Card from '../Card';
import NewCard from '../NewCard';
import colors from '../colors';
import Screen from '../Screen'
import { getClients } from '../APIcalls/getRequests'
import StoreContext from './GlobalState';
import axios from 'axios';
import TopButtons from './TopButtons';
import { Url } from './Core';
import Header from '../Header';


function ClientScreen({ navigation }) {

  const list = [
    { Name: 'Hassan Mansoor1', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 1 },
    { Name: 'Hammad Ahmed', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 2 },
    { Name: 'Anas Mansoor', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 3 },
    { Name: 'Bilal Zia', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 4 },
    { Name: 'Mohib Zia', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 5 },
  ];
  // console.log("in client Screen",list)
  const [clients, setClients] = useState();
  const [filtered, setfiltered] = useState([]);
  const [filterText, setfilterText] = useState();
  const GlobaleEmployee = useContext(StoreContext)

  console.log(GlobaleEmployee.Role.employeeName, "Riderrrrrrr");
  console.log(GlobaleEmployee.Role.createdBy, "Riderrrrrrr");

  useEffect(() => {
    let belongsTo = '';
    if (GlobaleEmployee.Role.Role == 'Admin') {
      belongsTo = GlobaleEmployee.Role._id;
    } else {
      belongsTo = GlobaleEmployee.Role.createdBy;
    }

    axios({
      method: "post",
      url: Url + "/auth/BelongsTo",
      data: {
        createdBy: belongsTo
      }
    })
      .then((responseJson) => {
        console.log("ClientScreen in getAPI", responseJson.data);
        const filteredData=responseJson.data.filter(filterClients)
        setClients(filteredData);
        setfiltered(filteredData);

      })
      .catch((error) => {
        console.error(error);
      });
    function filterClients(client) {
      if (GlobaleEmployee.Role.Role == 'Rider') {
        return client.ClientRiderObjectId == GlobaleEmployee.Role._id;
      } else {
        return true;
      }


    }


  }, [])
// for search
  const  handleSearch=async()=>{
    console.log("Search",filterText);
    let filtereddata=clients.filter(clientData=>(nameFilter(clientData.ClientName,filterText)));
    console.log("filtered before",filtered.length,filtereddata.length)
    setfiltered(filtereddata);
    console.log("filtered after",filtered.length,filtereddata.length);

  }
  function nameFilter(clientName, name){
    console.log("Filters",clientName.toLowerCase().includes(name.toLowerCase()))
    return clientName.toLowerCase().includes(name.toLowerCase());

  }
  const handlePress = (item) => {
    if (GlobaleEmployee.Role.Role == 'Rider') {
      navigation.navigate('Recovery Screen', item);

    }
    console.log("Client is pressed", item);
  }
  // useEffect(() => {

  //   axios({
  //     method: "post",
  //       url: Url +  "/auth/ShowRiderData",
  //     data: {
  //       // employeeName: GlobaleEmployee.Role.employeeName
  //       ClientRiderObjectId: GlobaleEmployee.Role._id
  //     }
  //   })
  //     .then((responseJson) => {
  //       console.log("ClientScreen in getAPI", responseJson.data);
  //       setClients(responseJson.data);

  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //   // fetch(`${Url}/ClientData`)
  //   //   .then((response) => response.json())
  //   //   .then((responseJson) => {
  //   //     console.log("ClientScreen in getAPI", responseJson.Data);
  //   //     setClients(responseJson.Data);

  //   //   })
  //   //   .catch((error) => {
  //   //     console.error(error);
  //   //   });


  // }, []);

  return (
    <Screen>
      <Header
        header={'Client Listing'}
      />
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/logo.png')}
        />
        <View style={styles.textContainer}>
          <TextInput style={{ fontWeight: 'bold', fontSize: 18, width: '100%' }} placeholder='Client Name' onChangeText={(text) =>setfilterText(text.toString())} />
        </View>
        <Button title='Search' onPress={() =>handleSearch()} color={'#578B9D'}  />
      </View>
      {clients != null ?
        <FlatList
          data={filtered}
          keyExtractor={listing => listing.ClientId}
          renderItem={({ item, i }) =>
            <Card
              key={i}
              title={item.ClientName}
              subTitle={item.ClientPhoneNumber}
              subSubTitle={item.Amount}

              onPress={() => handlePress(item)}
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

export default ClientScreen;