import { StatusBar } from "expo-status-bar";
import { vw, vh } from 'react-native-expo-viewport-units';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React, { useState, useEffect } from "react";
import FeatherIcon from "react-native-vector-icons/Feather";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

function SelectLanguage(props) {

    const Languages = ["English", "Ukrainian", "Polish", "German", "Spanish", "Italian", "French", "Romanian", "Portugal"]
    const [selectedLanguage, setSelectedLanguage] = useState("English")

    const ItemView = ({ item }) => {
        return (
            <View style={styles.ItemView}>
                <Text style={{fontSize: vw(5)}}>{item}</Text>
                { item ===selectedLanguage ? '' :
                <Text style={styles.setText}
                onPress={() => {
                    setSelectedLanguage(item)
                }}
                >set</Text>
    }
            </View>
        );
    };


    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.header}>
                <FeatherIcon
                    name="chevron-left"
                    size={vw(10)}
                    style={{ alignSelf: 'center' }}
                    onPress={() => {
                        props.navigation.goBack()
                    }}
                />
                <Text style={styles.headerText}>Language</Text>
                <Text>        </Text>
            </View>
            <View style={styles.underline}></View>
            <Text style={styles.smallText}  >Choose the language which is suitable to you</Text>
            <View style={styles.allLanguages}>
                <FlatList
                    data={Languages}
                    renderItem={ItemView}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#CFE8DC",
    },
    header: {
        width: vw(100),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
    },
    headerText: {
        fontSize: vw(8),
    },
    underline: {
        backgroundColor: "#A1A1A1",
        height: 1,
        width: vw(120),
    },
    smallText: {
        color: "#989898",
        fontSize: vw(4),
        alignSelf: 'center',
        marginTop: vh(5)
    },
    ItemView: {
        height: vh(7),
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    allLanguages: {
        marginTop: vh(3),
        width: vw(90),
        alignSelf: 'center',
        backgroundColor: "#fff",
        paddingVertical: vh(5),
        paddingHorizontal: vw(5),
        borderRadius: 20
    },
    setText: {
        fontSize: vw(4),
        color: '#5ACCE4',
    }

})
export default SelectLanguage