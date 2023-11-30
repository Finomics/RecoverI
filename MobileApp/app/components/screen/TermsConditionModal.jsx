import axios from "axios";
import React, { useState, useContext } from "react";
import {
  Modal,
  Text,
  Dimensions,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  SafeAreaView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

// import StoreContext from '../../GlobalState/GlobalState';
// import axios from 'axios';
// import { Url } from '../../Core';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Colors = {
  Grey: "#DCDCDC",
  White: "#FFFFFF",
  Blue: "#0000FF",
  Black: "#000000",
};

export default function TermsConditionModal({ visible, onClose }) {
  return (
    <View style={{ marginTop: 10 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View
            style={{
              backgroundColor: "#B4C6D1",
              marginLeft: 10,
              marginRight: 10,
              marginTop: 50,
              flex: 1,
              marginBottom: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <View
              style={{
                marginTop: 10,
                // paddingBottom: 10,
                paddingRight: 20,
                paddingLeft: 10,
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{ fontSize: 35, color: "#578B9D" }}
                onPress={onClose}
              >
                X
              </Text>
            </View>

               <ScrollView automaticallyAdjustKeyboardInsets={true}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  // marginTop: -10,
                }}
              >
                <Text style={{ fontSize: 20 }}>Terms and Condition</Text>
                <Text style={{ padding: 10, margin: 10 }}>
                Kollectit is a mobile application developed by TecStik, offering users the ability to manage
                 payments from customers and reimburse suppliers. The app's information is intended solely for personal, non-commercial use, and users are granted a non-exclusive, non-transferable license to access its content. TecStik asserts ownership of all intellectual property rights, including trademarks. Users are strictly prohibited from posting illegal, harassing, or defamatory content, and TecStik reserves the right to remove or edit such material. Additionally, the app emphasizes compliance with laws and regulations, and users are urged to report any copyright infringements promptly. TecStik disclaims responsibility for text message delays attributed to cellular network providers.
                
                </Text>
                {/* <Text style={{ padding: 10, margin: 10 }}>
                  Collection of receivables become highlly secure with
                  Kollectit. The and ensures vour workers collect pavments from
                  vour customers or reimburse vour suppliers with the exact
                  amount the workers are entrusted with.
                </Text>
                <Text style={{ padding: 10, margin: 10 }}>
                  Download the app today and find out how Kollectit creates a
                  seamless process of payment. From both sides of the deal.
                  KollectIt is free to use with a transaction limit of 5.
                </Text> */}
              </View>
            </ScrollView>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[
                  styles.buttonStyle,
                  {
                    marginTop: 30,
                    backgroundColor: "#578B9D",
                    flex: 1,
                    marginRight: 5,
                    marginLeft: 10,
                  },
                ]}
                onPress={onClose}
              >
                <Text
                  style={{ textAlign: "center", color: "white", fontSize: 20 }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
    padding: 10,
  },
  inputView: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    width: windowWidth / 1.3,
    marginBottom: 17,
    height: 60,
    borderColor: "#578B9D",
    borderWidth: 5,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    fontSize: 22,
  },

  buttonsContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },
  buttonStyle: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: Colors.Black,
    borderWidth: 1,
  },
  label: {
    color: "grey",
    // fontSize: 10,
  },
});
