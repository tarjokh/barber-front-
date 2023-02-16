import { StatusBar } from "expo-status-bar";
import { vw, vh } from 'react-native-expo-viewport-units';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

function BookDone(props) {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.greenCircle}>
                <MaterialIcons
                name="done"
                size={vh(7)}
                color={"#fff"}
                />
            </View>
            <Text style={styles.confirmationText}>Your reservation is confirmed!</Text>
            <TouchableOpacity style={styles.button}
            onPress={()=>{
                props.navigation.navigate("Reservation")
            }}
            >
                <Text style={{color: "#fff", fontSize: vw(4)}}>My reservations</Text>
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
    greenCircle: {
        width: vh(10),
        height: vh(10),
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: vh(25),
        backgroundColor: "#6AC259"
    },
    confirmationText: {
        alignSelf: 'center',
        fontSize: vw(5),
        color: "#6AC259",
        marginTop: vh(2),
        fontWeight: '500'
    },
    button: {
        width: vw(45),
        height: vw(10),
        marginTop: vh(20),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#5ACCE4",
        shadowColor: "#000",
        shadowOpacity: 0.51,
        shadowRadius: 90,
        elevation: 15,
      },
})
export default BookDone