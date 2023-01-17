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

function Welcome(props) {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.weclome_text}>Welcome</Text>
            <TouchableOpacity style={styles.signin_button} onPress={
                () => {
                    props.navigation.navigate('Login')
                }
            }>
                <Text style={styles.sign_text}>sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signup_button} onPress={
                () => {
                    props.navigation.navigate('SignUp1')
                }
            }>
                <Text style={styles.sign_text}>sign up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#CFE8DC",
        justifyContent: "center",
        alignItems: "center",
    },
    weclome_text: {
        marginTop: '80%',
        fontSize: vw(11),
        fontWeight: '900',
    },
    signup_button: {
        width: vw(30),
        height: vw(10),
        marginTop: "10%",
        justifyContent: 'center',
        backgroundColor: "#66b3ff",
        shadowColor: "#000",
        shadowOpacity: 0.51,
        shadowRadius: 90,
        elevation: 15,
    },
    signin_button: {
        width: vw(30),
        height: vw(10),
        marginTop: "40%",
        justifyContent: 'center',
        backgroundColor: "#66b3ff",
        shadowColor: "#000",
        shadowOpacity: 0.51,
        shadowRadius: 90,
        elevation: 15,
    },
    sign_text: {
        fontSize: vw(5),
        textAlign: 'center',
        color: '#fff',
    },
    shadow: {
        alignSelf: 'stretch',
    },
})
export default Welcome