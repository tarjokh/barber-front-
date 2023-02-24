import { StatusBar } from "expo-status-bar";
import { vw, vh } from 'react-native-expo-viewport-units';
import React, { useState, useEffect } from "react";
import FeatherIcon from "react-native-vector-icons/Feather";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TextInput,
    RefreshControl,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    PixelRatio
} from "react-native";
import Footer from "../Modules/FooterMenu"
import Settings from "../Modules/SettingsIcon"
import Icon from "react-native-vector-icons/Entypo";
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";

function ListOfItems(props) {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [Display, SetDisplay] = useState("flex");
    const [searchDisplay, SetsearchDisplay] = useState("none");
    const [alternativeView, SetAlternativeView] = useState(false);
    const [viewName, SetViewName] = useState("view-carousel")

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/' + props.route.params.endpoint)
            .then((response) => response.json())
            .then((responseJson) => {
                setFilteredDataSource(responseJson);
                setMasterDataSource(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource and update FilteredDataSource
            const newData = masterDataSource.filter(function (item) {
                // Applying filter for the inserted text in search bar
                const itemData = item.title
                    ? item.title.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
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
                        source={{ uri: "https://files.ratelist.top/uploads/images/bs/41605/photos/67254e65fea4eeef8274ca6179361666-original.webp" }}
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
                        name='heart-outlined'
                        size={vw(8)}
                        style={styles.heartIcon}
                        onPress={() => {
                            console.log(item.title)
                        }}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    const ItemAlternativeView = ({ item }) => {
        return (
            // Flat List Item
            <View style={{ width: vw(100), }}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate("ItemPage", { item: item })
                    }}>
                    <ImageBackground
                        source={{ uri: "https://files.ratelist.top/uploads/images/bs/41605/photos/67254e65fea4eeef8274ca6179361666-original.webp" }}
                        style={styles.alternativeItemStyle}
                        borderRadius={25}
                    >
                        <Text style={styles.item_alternative_name}>
                            {item.title.split(' ').slice(0, 2).join(' ')}
                        </Text>
                        <EntypoIcon
                            name='heart-outlined'
                            size={vw(8)}
                            style={styles.alternativeHeartIcon}
                            onPress={() => {
                                console.log(item.title)
                            }}
                        />
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Icon
                name="chevron-left"
                style={[styles.search_close, { display: searchDisplay }]}
                onPress={() => {
                    SetDisplay("flex")
                    SetsearchDisplay("none")
                }}
            />
            <View style={{ display: Display }}><Settings /></View>
            <FeatherIcon
                color={"grey"}
                size={vw(8)}
                name="search"
                style={styles.search}
                onPress={() => {
                    SetsearchDisplay("flex")
                    SetDisplay("none")
                }} />
            <Text style={styles.cafes_text}>{props.route.params.name}</Text>
            <View style={styles.underline} />
            <View style={[styles.textInputStyle, { display: searchDisplay }]} >
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={search}
                    underlineColorAndroid="transparent"
                    placeholder="Search Here"
                />
            </View>
            { alternativeView ? <FlatList
                data={filteredDataSource}
                keyExtractor={(item, index) => index.toString()}
                renderItem={ItemAlternativeView}
                horizontal={true}
                //style={{ marginBottom: vh(15) }}
                snapToAlignment="start"
                snapToInterval={Dimensions.get("window").width}
            />
            :
            <FlatList
                data={filteredDataSource}
                keyExtractor={(item, index) => index.toString()}
                renderItem={ItemView}
                style={{ marginBottom: vh(7) }} 
                /> }
            <TouchableOpacity style={styles.changeViewButton} 
            onPress={()=> {
                if(alternativeView == false) {SetAlternativeView(true), SetViewName("view-headline")}
                else {SetAlternativeView(false) , SetViewName("view-carousel")}
                console.log(alternativeView)
            }}
            >
                <MaterialIcons
                name={viewName}
                size={Dimensions.get("window").height*0.045}
                color= {"white"}
                />
            </TouchableOpacity> 
            <Footer />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: vw(100),
        height: "100%",
        //flexDirection: "column",
        //flex: 1,
        //height: "100%",
        backgroundColor: "#CFE8DC",
    },
    search: {
        marginTop: Dimensions.get("window").height* 0.06,
        marginRight: vw(3),
        alignSelf: 'flex-end'
    },
    cafes_text: {
        position: 'absolute',
        marginTop: Dimensions.get("window").height* 0.08,
        color: "black",
        alignSelf: "center",
        fontSize: vw(5),
        fontWeight: "500"
    },
    underline: {
        backgroundColor: "#A1A1A1",
        height: 1.5,
        marginTop: Dimensions.get("window").height* 0.01,
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
    alternativeItemStyle: {
        height: Dimensions.get("window").height* 0.70,
        width: vw(80),
        alignSelf: 'center',
        marginTop: Dimensions.get("window").height* 0.02,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 27,
        overflow: "hidden"
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
    item_alternative_name: {
        marginLeft: vw(5),
        marginTop: Dimensions.get("window").height* 0.61,
        fontSize: vw(10),
        color: "white",
        fontWeight: "300"
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
    alternativeHeartIcon: {
        marginLeft: vw(68),
        marginTop: Dimensions.get("window").height* -0.67,
        color: "#FF0000",
    },
    textInputStyle: {
        height: Dimensions.get("window").height* 0.05,
        width: vw(80),
        marginTop: vh(1),
        justifyContent: 'center',
        alignSelf: "center",
        borderRadius: 30,
        backgroundColor: 'white'
    },
    textInput: {
        marginLeft: vw(3)
    },
    search_close: {
        position: 'absolute',
        marginTop: Dimensions.get("window").height* 0.06,
        marginLeft: vw(3),
        fontSize: vw(8)
    },
    changeViewButton: {
        position: "absolute",
        width: Dimensions.get("window").height* 0.06,
        height: Dimensions.get("window").height* 0.06,
        borderRadius: 50,
        backgroundColor: "#5ACCE4",
        marginLeft: vw(80),
        marginTop: Dimensions.get("window").height* 0.88,
        justifyContent: "center",
        alignItems: "center"
    }
})
export default ListOfItems