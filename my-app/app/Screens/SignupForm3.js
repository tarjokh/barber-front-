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
} from "react-native";

import { useNavigation, CommonActions } from '@react-navigation/native';

function SignUp3(props) {
    const [password, setPassword] = useState("");
    const [confirmPassword, settConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    handle_signup = () => {
        fetch('https://c2db-46-211-119-19.eu.ngrok.io/alino/users/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: password,
            }),
        });
    };

    formValidation = async () => {
        let errorFlag = false;

        // input validation
        if (password.length == 0) {
            errorFlag = true;
            setPasswordError("Password is required feild");
        } else if (password.length < 8 || password.length > 20) {
            errorFlag = true;
            setPasswordError("Password should be min 8 char and max 20 char");
        } 

        if (confirmPassword.length == 0) {
            errorFlag = true;
            setConfirmPasswordError("Confirm Password is required feild");
        }
        else if (password !== confirmPassword) {
            errorFlag = true;
            setConfirmPasswordError("Password and confirm password should be same.");
        }

        if (errorFlag) {
            console.log("errorFlag");
        }
        else {
            //handle_signup();
            console.log("Good");
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
        }
    }


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
                    placeholder="Password"
                    placeholderTextColor="#696969"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
                <View style={styles.underline} />
                {passwordError.length > 0 && <Text style={styles.textDanger}>{passwordError}</Text>}
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Confirm Password"
                    placeholderTextColor="#696969"
                    secureTextEntry={true}
                    onChangeText={(confirmPassword) => settConfirmPassword(confirmPassword)}
                />
                <View style={styles.underline} />
                {confirmPasswordError.length > 0 && <Text style={styles.textDanger}>{confirmPasswordError}</Text>}
            </View>
            <TouchableOpacity
                style={styles.NextBtn}
                onPress={
                    () => {
                        formValidation();
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                          });
                    }
                }
            >
                <Text style={styles.next_text}>Sign Up</Text>
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
    textDanger: {
        color: "#dc3545"
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
    text: {
        color: "white",
        textAlign: 'center',
        fontSize: vw(15),
    },
})
export default SignUp3