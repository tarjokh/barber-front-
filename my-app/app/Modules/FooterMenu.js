import { StatusBar } from "expo-status-bar";
import { vw, vh } from 'react-native-expo-viewport-units';
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  StyleSheet,
  View,
  Dimensions
} from "react-native";

function Footer(props) {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, justifyContent: 'flex-end' }}> 
      <View style={styles.bottom_menu}>
        <EntypoIcon
          name="home"
          size={vw(8)}
          style={styles.homeIcon}
          onPress={() => {
            navigation.navigate("Home")
          }}
        />
        <EntypoIcon
          name='heart-outlined'
          size={vw(8)}
          style={styles.heartIcon}
          onPress={() => {
            navigation.navigate("Favorites")
          }}
        />
        <FeatherIcon
          name='shopping-bag'
          size={vw(8)}
          style={styles.historyIcon}
          onPress={() => {
            navigation.navigate("Reservation")
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  bottom_menu: {
    position: "absolute",
    width: vw(100),
    height: Dimensions.get("window").height * 0.07,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  homeIcon: {
    position: 'absolute',
    marginLeft: vw(7),
    color: "#5ACCE4"
  },
  heartIcon: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#ADADAF'
  },
  historyIcon: {
    alignSelf: 'flex-end',
    marginRight: vw(7),
    color: '#ADADAF'
  }
})
export default Footer