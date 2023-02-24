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

function Signup1(props) {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [emptyFirstError, SetEmptyFirstError] = useState("");
  const [emptyLastError, SetEmptyLarstError] = useState("");
  const [bigFirstError, SetBigFirstError] = useState("First name must be less than 20 char");
  const [bigLastError, SetBigLastError] = useState("Last name must be less than 20 char");
  const [data, setData] = useState([]);

  /*handle_signup = () => {
    fetch('https://cc0c-178-137-165-225.eu.ngrok.io/core/users/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: firstName,
        first_name: firstName,
        last_name: lastName,
        email: "qwew@gmail",
        password: '123456789',
      }),
    });
  };*/

  formValidation = async () => {
    let errorFlag = false;

    if (firstName.length == 0) {
      errorFlag = true;
      SetEmptyFirstError("This is required field");
    }
    if (lastName.length == 0) {
      errorFlag = true;
      SetEmptyLarstError("This is required field");
    }
    if (firstName.length > 20) {
      errorFlag = true;
      SetEmptyFirstError("");
    }
    if (lastName.length > 20) {
      errorFlag = true;
      SetEmptyLarstError("");
    }
    if (errorFlag) {
      console.log("errorFlag");
    }
    else {
      //handle_signup();
      SetEmptyFirstError("");
      SetEmptyLarstError("");
      props.navigation.navigate('SignUp2', { firstname: firstName, lastname: lastName })
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Text style={styles.sign_in_button}
          onPress={
            () => {
              props.navigation.navigate('Login')
            }
          }>
          Sign in
        </Text>
        <Text style={styles.sign_up_button} >Sign Up</Text>
      </View>
      <View style={styles.SignUpUnderline} />
      <View style={[styles.inputView, { marginTop: vh(30) }]}>
        <TextInput
          style={styles.TextInput}
          placeholder="First Name"
          placeholderTextColor="#696969"
          onChangeText={(firstName) => setfirstName(firstName)}
        />
        <View style={styles.underline} />
        {emptyFirstError.length > 0 && <Text style={styles.textDanger}>{emptyFirstError}</Text>}
        {firstName.length > 20 && <Text style={styles.textDanger}>{bigFirstError}</Text>}
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Last Name"
          placeholderTextColor="#696969"
          onChangeText={(lastName) => setlastName(lastName)}
        />
        <View style={styles.underline} />
        {emptyLastError.length > 0 && <Text style={styles.textDanger}>{emptyLastError}</Text>}
        {lastName.length > 20 && <Text style={styles.textDanger}>{bigLastError}</Text>}
      </View>
      <TouchableOpacity
        style={styles.NextBtn}
        onPress={
          () => {
            //handle_signup();
            formValidation();
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
  textDanger: {
    color: "#dc3545"
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
export default Signup1