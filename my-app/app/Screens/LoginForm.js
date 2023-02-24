import { StatusBar } from "expo-status-bar";
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  BackHandler
} from "react-native";



function LoginForm(props) {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //const [btnColor, setBtnColor] = useState(false);

  formValidation = async (request) => {

    // input validation
    if (request == 400) {
      setError("Неправильні дані");
    } else if (request == 200) {
      props.navigation.popToTop()
      props.navigation.navigate('Home')
      setError("");
    }

    else {
      console.log("server error");
      setError("");
    }

  }

  handle_login = async (data) => {
    fetch('https://2d2c-93-77-132-232.eu.ngrok.io/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: email,
        password: password,

      }),
    })
      .then(res => {
        res.json();
        formValidation(res.status);
      })
/*      .then(json => {
        localStorage.setItem('token', json.token);
      });*/;
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Text style={styles.sign_in_button}>
          Sign in
        </Text>
        <Text style={styles.sign_up_button} onPress={
          () => {
            props.navigation.navigate('SignUp1')
          }
        }>Sign Up</Text>
      </View>
      <View style={styles.SignUpUnderline} />
      <View>
        <View style={[styles.inputView, { marginTop: vh(30) }]}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#696969"
            onChangeText={(email) => setEmail(email)}
          />
          <View style={styles.underline} />
        </View>
      </View>


      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#696969"
          secureTextEntry
          onChangeText={(password) => setPassword(password)}
        />
        <View style={styles.underline} />
        {error.length > 0 && <Text style={styles.textDanger}>{error}</Text>}
      </View>


      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={
          () => {
            console.log("Pressed"),
              handle_login()
            console.log(error);
          }
        }
      >
        <Text style={styles.login_text}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CFE8DC",
    alignItems: "center",
    //justifyContent: "center",
  },



  TextInput: {
    flex: 1,
    marginLeft: vw(3),
  },

  sign_up_button: {
    position: 'absolute',
    flex: 1,
    left: vw(8),
    fontSize: vw(8),
    marginTop: vh(8),
    color: '#696969',
  },

  sign_in_button: {
    position: 'absolute',
    flex: 1,
    left: -vw(40),
    fontSize: vw(10),
    marginTop: vh(7),
  },

  inputView: {
    backgroundColor: "#D0EDDF",
    width: "90%",
    height: 45,
    marginBottom: vh(3),
  },

  login_text: {
    color: "white",
    textAlign: 'center',
    fontSize: vw(5),
  },

  forgot_button: {
    marginTop: vh(4),
    marginLeft: vw(50),
  },

  loginBtn: {
    width: vw(25),
    height: vw(10),
    marginTop: vh(-4),
    marginLeft: vw(-65),
    justifyContent: 'center',
    backgroundColor: "#5ACCE4",
    shadowColor: "#000",
    shadowOpacity: 0.51,
    shadowRadius: 90,
    elevation: 15,
  },
  SignUpUnderline: {
    position: 'absolute',
    backgroundColor: "#696969",
    height: 1,
    marginTop: vh(16),
    width: vw(100),
  },
  underline: {
    backgroundColor: "black",
    height: 1,
    width: vw(90),
  },
  notActiveColor: {
    backgroundColor: "#DCDCDC",
  },
  activeColor: {
    backgroundColor: "#00BFFF",
  },
  textDanger: {
    color: "#dc3545"
  },
})
export default LoginForm