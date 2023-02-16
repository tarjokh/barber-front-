import { StatusBar } from "expo-status-bar";
import { vw, vh } from 'react-native-expo-viewport-units';
import React, { useState, useEffect } from "react";
import FeatherIcon from "react-native-vector-icons/Feather";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { Rating, AirbnbRating } from 'react-native-ratings';
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

function History(props) {
    const [filteredDataSource, setFilteredDataSource] = useState([]);

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
                    <View style={{ marginLeft: vw(35) }}>
                        <View style={{ flexDirection: 'row', marginTop: vh(1) }}>
                            <EntypoIcon
                                name="location"
                                size={vw(5)}
                            />
                            <Text style={styles.city}>
                                {item.title.split(' ').slice(0, 1).join(' ')}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: vh(1) }}>
                            <Rating
                                ratingColor={"black"}
                                isDisabled={false}
                                type='custom'
                                ratingCount={5}
                                startingValue={item.id}
                                imageSize={vw(3)}
                                tintColor={'#DDDDDD'}
                                readonly={true}
                            />
                        </View>
                        <View style={styles.details}>
                            <Text style={{ fontWeight: '700' }}>Date:</Text>
                            <Text style={{ marginRight: vw(2) }}>Tue, Jun 30</Text>
                        </View>
                        <View style={styles.details}>
                            <Text style={{ fontWeight: '700' }}>Time:</Text>
                            <Text style={{ marginRight: vw(2) }}>3:30 pm</Text>
                        </View>
                        <View style={styles.details}>
                            <Text style={{ fontWeight: '700' }}>Party size:</Text>
                            <Text style={{ marginRight: vw(2) }}>1</Text>
                        </View>
                        <View style={styles.details}>
                            <EntypoIcon
                                name="check"
                                size={vw(10)}
                            />
                            <TouchableOpacity>
                                <View style={styles.rateButton}>
                                    <Text style={{ fontWeight: '700' }}>Rate</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <EntypoIcon
                name="chevron-left"
                style={styles.chevronLeft}
                onPress={() => {
                    props.navigation.goBack();
                }}
            />
            <Text style={styles.cafes_text}>History</Text>
            <View style={styles.underline} />
            <FlatList
                data={filteredDataSource}
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
        height: 1,
        marginTop: vh(1.5),
        width: vw(150)
    },
    itemStyle: {
        backgroundColor: "#DDDDDD",
        height: vh(25),
        width: vw(90),
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "black"
    },
    image: {
        position: "absolute",
        width: "35%",
        height: "100%",
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        opacity: 0.6
    },
    chevronLeft: {
        marginTop: vh(7),
        marginLeft: vw(3),
        fontSize: vw(8)
    },
    city: {
        fontSize: vw(4),
        marginLeft: vw(1),
        fontWeight: '700'
    },
    details: {
        flexDirection: "row",
        marginTop: vh(0.5),
        justifyContent: 'space-between',
    },
    rateButton: {
        width: vw(37),
        height: vh(6),
        backgroundColor: '#5ACCE4',
        marginRight: vw(2),
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default History