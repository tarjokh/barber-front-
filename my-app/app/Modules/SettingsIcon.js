import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { vw, vh } from 'react-native-expo-viewport-units';
import React, { useState, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
} from "react-native";

function SettingsIcon(props) {
const navigation = useNavigation(); 

  return (
    <View style={{ width: vw(15) }}>
    <Icon
      name="bars"
      color={"grey"}
      backgroundColor={"#CFE8DC"}
      size={vw(8)}
      style={styles.bars_icon}
      onPress={
        () => {
          navigation.navigate('Settings')
        }
      }
    />
    </View>
  );
}
const styles = StyleSheet.create({
    bars_icon: {
        position: 'absolute',
        marginTop: Dimensions.get("window").height * 0.065,
        marginLeft: vw(3),
      },
})
export default SettingsIcon
