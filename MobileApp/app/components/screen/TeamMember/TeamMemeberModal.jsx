import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Modal, Text, Dimensions, View, ScrollView, TouchableOpacity, StyleSheet, FlatList, TextInput, SafeAreaView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'
import { Url } from '../Core';
// import StoreContext from '../../GlobalState/GlobalState';
// import axios from 'axios';
// import { Url } from '../../Core';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Colors = {
  Grey: '#DCDCDC',
  White: '#FFFFFF',
  Blue: '#0000FF',
  Black: '#000000',
};

export default function TeamMemeberModal({ visible, onClose, data, modalUpdateData }) {

  console.log(data, "Modal");
  const [Name, setUpdateName] = useState(data.employeeName);
  const [ContactNum, setContactNum] = useState(data.employeeContactNum);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Cashier', value: 'Cashier' },
    { label: 'Rider', value: 'Rider' },
    { label: 'Undefine', value: 'Undefine' },
  ]);

  function HandlerUpdate() {
    // console.log(value, Name, ContactNum)
    axios({
      method: "post",
      url: Url + "/UpdateEmpolyee",
      data: {
        filter: {
          _id: data._id
        },
        Update: {
          employeeName: Name,
          employeeContactNum: ContactNum,
          Role: value
        }

      }
    }).then((res) => {
      console.log(res.data, "Response Empolyee Update");
      modalUpdateData(res.data)
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <View style={{ marginTop: 10 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >


        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>

          <View
            style={{
              backgroundColor: '#B4C6D1',
              marginLeft: 10,
              marginRight: 10,
              marginTop: 50,
              flex: 1,
              marginBottom: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,

            }}>

            <View
              style={{
                marginTop: 10,
                paddingBottom: 10,
                paddingRight: 20,
                paddingLeft: 10,
                alignItems: "flex-end",
              }}>
              <Text style={{ fontSize: 35, color: "black" }} onPress={onClose}> X </Text>
            </View>
            <View />

            <ScrollView >
              <View style={{
                justifyContent: "center",
                alignItems: "center",
              }}>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder={data.employeeName}
                    placeholderTextColor="#003f5c"
                    onChangeText={(Name) => setUpdateName(Name)}
                  />
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder={data.employeeContactNum}
                    placeholderTextColor="#003f5c"
                    onChangeText={(ContactNum) => setContactNum(ContactNum)}
                  />
                </View>
                <View
                  style={{
                    height: windowHeight / 3.5,
                    width: windowWidth / 1.3,
                    alignItems: "center",
                  }}
                >
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={styles.inputView}
                    listMode="SCROLLVIEW"
                  />
                </View>

              </View>
            </ScrollView>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[
                  styles.buttonStyle,
                  {
                    marginTop: 30,
                    backgroundColor: "#1D7874",
                    flex: 1,
                    marginRight: 5,
                    marginLeft: 10,
                  },
                ]}
                onPress={HandlerUpdate}>
                <Text style={{ textAlign: 'center', color: "white", fontSize: 20 }}>Update</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.buttonStyle,
                  {
                    marginTop: 30,
                    backgroundColor: "#1D7874",
                    flex: 1,
                    marginRight: 5,
                    marginLeft: 10,
                  },
                ]}
                onPress={onClose}>
                <Text style={{ textAlign: 'center', color: "white", fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </Modal >

    </View >
  );
}


const styles = StyleSheet.create({

  container: {
    backgroundColor: "#679289",
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth / 1.2,
    borderRadius: 30,
    margin: 10,
    padding: 10
  },
  inputView: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    width: windowWidth / 1.3,
    marginBottom: 17,
    alignItems: "center",
    height: 60,
    borderColor: "#1D7874",
    borderWidth: 5,

  },

  TextInput: {
    height: 50,
    flex: 1,
    fontSize: 22
  },

  buttonsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  buttonStyle: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: Colors.Black,
    borderWidth: 1,
  },
});
