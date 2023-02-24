import { StatusBar } from "expo-status-bar";
import { vw, vh } from 'react-native-expo-viewport-units';

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  BackHandler
} from "react-native";

function Signup2(props, route) {


  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  handle_signup = () => {
    fetch('https://07a8-178-137-165-225.eu.ngrok.io/api/api/user/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: "ee@gmail.com",
        phone_number: "1234567890",
        first_name: "firstname",
        second_name: "lastname",
        password: "12345678"
      }),
    });
  }; 

  

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Text style={styles.sign_up_button} >Sign Up</Text>
      </View>
      <View style={styles.SignUpUnderline} />
      <View style={[styles.inputView, { marginTop: vh(30) }]}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#696969"
          onChangeText={(email) => setEmail(email)}
        />
        <View style={styles.underline} />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Phone number"
          placeholderTextColor="#696969"
          onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
        />
        <View style={styles.underline} />
      </View>
      <TouchableOpacity
        style={styles.NextBtn}
        onPress={
          () => {
            handle_signup();
            props.navigation.navigate('SignUp3')
          }
        }
      >
        <Text style={styles.next_text}>Next</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CFE8DC",
    alignItems: "center",
  },

  underline: {
    backgroundColor: "black",
    height: 1,
    width: vw(90),
  },

  next_text: {
    color: "white",
    textAlign: 'center',
    fontSize: vw(5),
  },

  SignUpUnderline: {
    position: 'absolute',
    backgroundColor: "#696969",
    height: 1,
    marginTop: vh(16),
    width: vw(100),
  },

  sign_up_button: {
    position: 'absolute',
    flex: 1,
    left: vw(8),
    fontSize: vw(10),
    marginTop: vh(7),
  },

  sign_in_button: {
    position: 'absolute',
    flex: 1,
    left: -vw(40),
    fontSize: vw(8),
    marginTop: vh(8),
    color: '#696969',
  },


  inputView: {
    backgroundColor: "#D0EDDF",
    width: "90%",
    height: 45,
    marginBottom: vh(3),
  },
  TextInput: {
    flex: 1,
    marginLeft: vw(3),
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  NextBtn: {
    width: vw(25),
    height: vw(10),
    marginTop: vh(40),
    justifyContent: 'center',
    backgroundColor: "#5ACCE4",
    shadowColor: "#000",
    shadowOpacity: 0.51,
    shadowRadius: 90,
    elevation: 15,
  },
  signup_text: {
    color: "white",
    textAlign: 'center',
    fontSize: vw(5),
  },
})
export default Signup2