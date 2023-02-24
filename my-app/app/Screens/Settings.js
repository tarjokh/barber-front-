import { StatusBar } from "expo-status-bar";
import { vw, vh } from 'react-native-expo-viewport-units';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
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
    SafeAreaView,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
} from "react-native";

function Settings(props) {

    return (
        <View style={styles.container}>
            <View style={{ width: vw(15) }}>
                <MaterialIcons.Button
                    name="chevron-left"
                    color={"black"}
                    backgroundColor={"#CFE8DC"}
                    size={vw(8)}
                    onPress={
                        () => {
                            props.navigation.goBack();
                        }
                    }
                />
            </View>
            <View style={styles.small_rectangle}>
                <View style={styles.photo_circle}>

                </View>
                <Text style={styles.username}>User</Text>
                <Text style={styles.email}>user@gmail.com</Text>
                <View style={[{ width: vw(15) }, styles.notification]}>
                    <MaterialIcons.Button
                        name="notifications-none"
                        backgroundColor={'white'}
                        color={"black"}
                        size={vw(8)}
                        onPress={() => {

                        }}
                    />
                </View>
            </View>
            <View >
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate("ChangeProfile")
                    }}>
                    <View style={[styles.small_rectangle, { marginTop: vh(5) }]}>
                        <MaterialCommunityIcons
                            name="account-circle-outline"
                            style={styles.acc_settings}
                            backgroundColor={'white'}
                            color={"black"}
                            size={vw(8)} />
                        <Text style={styles.acc_settings_text}>Account setting</Text>
                        <FeatherIcon
                            name="edit"
                            backgroundColor={'white'}
                            color={'black'}
                            style={styles.edit_icon}>
                        </FeatherIcon>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        console.log("ksjfksj")
                    }}>
                    <View style={[styles.small_rectangle, { marginTop: vh(1) }]}>
                        <MaterialIcons
                            name="history"
                            style={styles.acc_settings}
                            backgroundColor={'white'}
                            color={"black"}
                            size={vw(8)} />
                        <Text style={styles.acc_settings_text}>History</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.big_rectangle}>
                    <TouchableOpacity>
                        <View style={styles.language}>
                            <MaterialIcons
                                name="language"
                                size={vw(8)}
                            />
                            <Text style={styles.acc_settings_text}>Language</Text>
                            <MaterialIcons
                                name="chevron-right"
                                color={"#9CA3AF"}
                                size={vw(8)}
                                style={styles.chevron_right}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.feedback}>
                            <MaterialCommunityIcons
                                name="message-text-outline"
                                size={vw(8)}
                            />
                            <Text style={styles.acc_settings_text}>Feedback</Text>
                            <MaterialIcons
                                name="chevron-right"
                                color={"#9CA3AF"}
                                size={vw(8)}
                                style={styles.chevron_right}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.feedback}>
                            <MaterialIcons
                                name="star-border"
                                size={vw(8)}
                            />
                            <Text style={styles.acc_settings_text}>Rate Us</Text>
                            <MaterialIcons
                                name="chevron-right"
                                color={"#9CA3AF"}
                                size={vw(8)}
                                style={styles.chevron_right}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.feedback}>
                            <MaterialCommunityIcons
                                name="arrow-up-circle-outline"
                                size={vw(8)}
                            />
                            <Text style={styles.acc_settings_text}>New Version</Text>
                            <MaterialIcons
                                name="chevron-right"
                                color={"#9CA3AF"}
                                size={vw(8)}
                                style={styles.chevron_right}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
        style={styles.logout_button}
        onPress={
          () => {
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'Welcome' }],
              });
          }
        }
      >
        <Text style={styles.logout_text}>Logout</Text>
      </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#CFE8DC",
        paddingTop: Platform.OS === 'android' ? 30 : 0,
    },
    small_rectangle: {
        width: vw(90),
        height: vw(20),
        marginLeft: vw(5),
        borderRadius: 15,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    big_rectangle: {
        width: vw(90),
        height: vw(54),
        marginLeft: vw(5),
        marginTop: vh(1),
        borderRadius: 15,
        backgroundColor: 'white',
    },
    photo_circle: {
        position: 'absolute',
        width: vw(13),
        height: vw(13),
        borderRadius: 50,
        backgroundColor: '#DCDCDC',
        marginLeft: vw(5),
    },
    username: {
        marginLeft: vw(23),
        fontSize: vw(5),
    },
    email: {
        marginLeft: vw(23),
        fontSize: vw(4),
        color: 'grey'
    },
    notification: {
        position: 'absolute',
        marginLeft: vw(70)
    },
    acc_settings: {
        position: 'absolute',
        marginLeft: vw(5),
    },
    acc_settings_text: {
        position: 'absolute',
        marginLeft: vw(15),
        fontSize: vw(6),
    },
    edit_icon: {
        position: 'absolute',
        marginLeft: vw(78),
        fontSize: vw(6),
    },
    language: {
        height: vw(10),
        marginTop: vw(4),
        marginLeft: vw(5)
    },
    feedback: {
        height: vw(10),
        marginTop: vw(2),
        marginLeft: vw(5)
    },
    chevron_right: {
        position: 'absolute',
        marginLeft: vw(73)
    },
    logout_button: {
    width: vw(25),
    left: vw(37.5),
    height: vw(10),
    marginTop: vh(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#5ACCE4",
    shadowColor: "#000",
    shadowOpacity: 0.51,
    shadowRadius: 90,
    elevation: 15,
    },
    logout_text:{
    color: "white",
    fontSize: vw(5),
    }
})
export default Settings