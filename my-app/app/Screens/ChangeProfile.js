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

function ChangeProfile(props) {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, SetEmail] = useState('')
    const emptyError = 'This is required field'
    const bigError = 'This field must be less than 20 char'
    const [phoneError, SetPhoneError] = useState('')
    const [emailError, SetEmailError] = useState('')

    formValidation = async () => {
        let errorFlag = false
        if (firstName.length == 0) {
            errorFlag = true;
            console.log(1)
        }
        if (lastName.length == 0) {
            errorFlag = true;
            console.log(2)
        }
        if (email.length == 0) {
            errorFlag = true;
            console.log(11)
        }
        if (phoneNumber.length == 0) {
            errorFlag = true;
            console.log(12)
        }
        if (firstName.length > 20) {
            errorFlag = true;
            console.log(3)
        }
        if (lastName.length > 20) {
            errorFlag = true;
            console.log(4)
        }
        if (!CheckEmail() || !CheckPhoneNumber()) {
            errorFlag = true
            console.log(5)
        }
        if(!errorFlag){
            alert("Профіль змінено")
            props.navigation.goBack()
        }
    }

    const CheckPhoneNumber = () => {
        let numbers = '0123456789';
        for (var i = 0; i < phoneNumber.length; i++) {
            if (numbers.indexOf(phoneNumber[i]) == -1) {
                SetPhoneError("Phone number must contain only numbers")
                return false
            }
        }
        SetPhoneError("")
        return true
    }

    const CheckEmail = () => {
        for (var i = 0; i < email.length; i++) {
            if (email.indexOf("@") == -1) {
                SetEmailError("It doesn't look like email")
                return false
            }
        }
        SetEmailError("")
        return true
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View>
                <Image source={require("../Images/cafe.png")}
                    style={styles.profileImage} />
            </View>
            <View style={[styles.inputView, { marginTop: vh(5) }]}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="First Name"
                    placeholderTextColor="#696969"
                    onChangeText={(firstName) => setfirstName(firstName)}
                />
                <View style={styles.underline} />
                {firstName.length == 0 && <Text style={styles.textDanger}>{emptyError}</Text>}
                {firstName.length > 20 && <Text style={styles.textDanger}>{bigError}</Text>}
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Last Name"
                    placeholderTextColor="#696969"
                    onChangeText={(lastName) => setlastName(lastName)}
                />
                <View style={styles.underline} />
                {lastName.length == 0 && <Text style={styles.textDanger}>{emptyError}</Text>}
                {lastName.length > 20 && <Text style={styles.textDanger}>{bigError}</Text>}
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="email"
                    placeholderTextColor="#696969"
                    onChangeText={(email) => SetEmail(email)}
                />
                <View style={styles.underline} />
                {email.length == 0 && <Text style={styles.textDanger}>{emptyError}</Text>}
                {email.length > 0 && <Text style={styles.textDanger}>{emailError}</Text>}
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Phone number"
                    keyboardType='numeric'
                    placeholderTextColor="#696969"
                    onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                />
                <View style={styles.underline} />
                {phoneNumber.length == 0 && <Text style={styles.textDanger}>{emptyError}</Text>}
                {phoneError.length > 0 && <Text style={styles.textDanger}>{phoneError}</Text>}
            </View>
            <TouchableOpacity
                style={styles.NextBtn}
                onPress={
                    () => {
                        formValidation()
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

    textDanger: {
        color: "#dc3545"
    },
    next_text: {
        color: "white",
        textAlign: 'center',
        fontSize: vw(5),
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
    NextBtn: {
        width: vw(25),
        height: vw(10),
        marginTop: vh(10),
        justifyContent: 'center',
        backgroundColor: "#5ACCE4",
        shadowColor: "#000",
        shadowOpacity: 0.51,
        shadowRadius: 90,
        elevation: 15,
    },
    profileImage: {
        marginTop: vh(10),
        width: vw(30),
        height: vw(30),
        borderRadius: 500
    },
    underline: {
        backgroundColor: "black",
        height: 1,
        width: vw(90),
    },
})
export default ChangeProfile