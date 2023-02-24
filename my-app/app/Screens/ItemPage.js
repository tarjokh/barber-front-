import { StatusBar } from "expo-status-bar";
import { Rating, AirbnbRating } from 'react-native-ratings';
import { vw, vh } from 'react-native-expo-viewport-units';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState, useEffect } from "react";
import ViewMoreText from 'react-native-view-more-text';
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView
} from "react-native";
import Footer from "../Modules/FooterMenu"

function ItemPage(props) {

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((responseJson) => {
                setFilteredDataSource(responseJson);
                setMasterDataSource(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const renderViewMore = (onPress) => {
        return (
            <Text style={{ alignSelf: 'center', color: '#529589' }} onPress={onPress}>View more</Text>
        )
    }

    const renderViewLess = (onPress) => {
        return (
            <Text style={{ alignSelf: 'center', color: '#529589' }} onPress={onPress}>View less</Text>
        )
    }
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    const ItemView = ({ item }) => {
        return (
            // Flat List Item
            <View style={styles.commentStyle}>
                <Image
                    source={require("../Images/cafe.png")}
                    style={styles.comment_image}
                />
                <View style={{ width: '80%', marginLeft: '20%' }}>
                    <Text style={styles.comment_nickname}>
                        {item.title.split(' ').slice(0, 2).join(' ')}
                    </Text>
                    <Text>
                        {item.body}
                    </Text>
                    <Rating
                    isDisabled={false}
                    type='star'
                    ratingCount={5}
                    startingValue={item.id}
                    imageSize={vw(3)}
                    readonly={true}
                    style={styles.rating}
                    />
                </View>
            </View>
        );
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <StatusBar style="auto" />
                <Image
                   source={{uri: props.route.params.item.image}}
                    style={styles.image}
                />
                <ViewMoreText
                    textStyle={styles.description}
                    numberOfLines={4}
                    renderViewMore={renderViewMore}
                    renderViewLess={renderViewLess}
                >
                    <Text> {props.route.params.item.description} </Text>
                </ViewMoreText>
                <TouchableOpacity style={styles.order_button}
                    onPress={() => {
                        console.log(props.route.params.item.rates[0].stars)
                        props.navigation.navigate("Book")
                    }}
                >
                    <Text style={styles.order_text}>Order</Text>
                </TouchableOpacity>
                <Text style={styles.rates_text}>Rates</Text>
                <View style={styles.rates_underline} />
                <ScrollView horizontal={true} style={{ width: "100%", marginLeft: '5%' }}>
                    <FlatList
                        scrollEnabled={false}
                        data={filteredDataSource}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={ItemView}
                    />
                </ScrollView>
                <Footer />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#CFE8DC",
    },
    image: {
        width: vw(100),
        height: vh(40)
    },
    description: {
        width: vw(95),
        alignSelf: 'center',
        marginTop: vh(4),
        fontSize: vw(4),
        textAlign: "center",
    },
    order_button: {
        width: vw(25),
        height: vw(10),
        marginTop: vh(4),
        alignSelf: 'center',
        backgroundColor: "#5ACCE4",
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOpacity: 0.51,
        shadowRadius: 90,
        elevation: 15,
    },
    order_text: {
        color: 'white',
        fontSize: vw(4)
    },
    rates_text: {
        fontSize: vw(8),
        marginLeft: vw(5)
    },
    rates_underline: {
        height: 2,
        width: vw(30),
        backgroundColor: "#A1A1A1"
    },
    commentStyle: {
        backgroundColor: "white",
        width: vw(90),
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 10,
        borderRadius: 30,
    },
    comment_image: {
        position: 'absolute',
        height: vw(12),
        width: vw(12),
        borderRadius: 50,
        marginLeft: vw(2),
        marginTop: vw(2)
    },
    comment_nickname: {
        fontSize: vw(5),
        marginTop: vw(4)
    },
    rating: {
        position: 'absolute',
        marginTop: vw(6),
        marginLeft: vw(50)
    }
})
export default ItemPage