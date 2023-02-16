import { StatusBar } from "expo-status-bar";
import { vw, vh } from 'react-native-expo-viewport-units';
import React, { useState, useEffect } from "react";
import FeatherIcon from "react-native-vector-icons/Feather";
import EntypoIcon from "react-native-vector-icons/Entypo";
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TextInput,
    RefreshControl,
    TouchableOpacity,
    SectionList
} from "react-native";
import Footer from "../Modules/FooterMenu"
import Settings from "../Modules/SettingsIcon"
import Icon from "react-native-vector-icons/Entypo";
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";

function Favorites(props) {
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [number, SetNumber] = useState(0);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((responseJson) => {
                setFilteredDataSource(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const HeartOutlined = ( heart ) => {
        if (heart == 0) {
            return ("heart-outlined")
        }
        else return ("heart")
    }

    const ChangeHeart = ({item})=> {
        if(item.id == 0){
            item.id = 1
        }
        else{
            item.id = 0
        }
    }

    const updateState = () => {
        const newState = filteredDataSource.map(obj => {
            // 👇️ if id equals 2, update country property
            return { ...obj, heart: 1 };
        });

        setFilteredDataSource(newState);
    };
    const ItemView = ({ item }) => {
        return (
            // Flat List Item
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate("ItemPage", { item: item })
                }}>
                <View style={styles.itemStyle}>
                    <Image
                        source={require("../Images/cafe.png")}
                        style={styles.image}
                    />
                    <Text style={styles.item_name}>
                        {item.title.split(' ').slice(0, 2).join(' ')}
                    </Text>
                    <Text style={styles.item_description}>
                        {item.body.substring(0, 15)}
                        {"..."}
                    </Text>
                    <EntypoIcon
                        name={HeartOutlined(item.id)}
                        size={vw(9)}
                        extraData={item} 
                        style={styles.heartIcon}
                        onPress={() => {
                            SetNumber(Math.random())
                            ChangeHeart({item});
                        }}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Icon
                name="chevron-left"
                style={styles.search_close}
                onPress={() => {
                    props.navigation.goBack();
                }}
            />
            <Text style={styles.cafes_text} onPress={() => { updateState(); }} >Favorites</Text>
            <View style={styles.underline} />
            <FlatList
                data={filteredDataSource}
                extraData={number}
                keyExtractor={(item, index) => index.toString()}
                renderItem={ItemView}
                style={{ marginBottom: vh(7) }} 
            />
            <Footer />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#CFE8DC",
    },
    cafes_text: {
        position: 'absolute',
        marginTop: vh(9),
        color: "black",
        alignSelf: "center",
        fontSize: vw(5),
        fontWeight: "500"
    },
    underline: {
        backgroundColor: "#A1A1A1",
        height: 1.5,
        marginTop: vh(1),
        width: vw(70),
        alignSelf: "center",
    },
    itemStyle: {
        backgroundColor: "white",
        height: vw(30),
        width: vw(90),
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 10,
        borderRadius: 30,
    },
    image: {
        position: "absolute",
        marginTop: vw(2.5),
        marginLeft: vw(2.5),
        width: vw(25),
        height: vw(25),
        borderRadius: 50
    },
    item_name: {
        marginLeft: vw(30),
        marginTop: vw(6),
        fontSize: vw(6),
    },
    item_description: {
        marginLeft: vw(30),
        marginTop: vw(2),
    },
    heartIcon: {
        marginLeft: vw(78),
        marginTop: vw(-19),
        color: "#FF0000",
    },
    textInput: {
        marginLeft: vw(3)
    },
    search_close: {
        marginTop: vh(7),
        marginLeft: vw(3),
        fontSize: vw(8)
    }
})
export default Favorites