import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { vw, vh } from 'react-native-expo-viewport-units';
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useState, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

function NoInternetConnection(props) {
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Icon
          name='wifi-off'
          size={vw(30)}
          color={'grey'}
        />
        <Text style={styles.bold_text}>No internet connection</Text>
        <Text style={{ textAlign: 'center' }}>Your internet connection is currently
          not available please check or try again.</Text>
      </View>
      <TouchableOpacity
        style={styles.try_again}
        onPress={() => {
          console.log(netInfo)
          if(netInfo.isConnected){
            navigation.goBack()
          }
        }}
      >
        <Text style={{ color: "#fff" }}>Try again</Text>
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
  bold_text: {
    paddingVertical: vw(1),
    fontSize: vw(7),
    fontWeight: "700"
  },
  try_again: {
    width: vw(25),
    height: vw(10),
    marginTop: vh(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#5ACCE4",
    shadowColor: "#000",
    shadowOpacity: 0.51,
    shadowRadius: 90,
    elevation: 15,
  }
})
export default NoInternetConnection
