import FeatherIcon from 'react-native-vector-icons/Feather';
import { vw, vh } from 'react-native-expo-viewport-units';
import {
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    Text,
    View,
} from "react-native";
import SettingsIcon from '../Modules/SettingsIcon';

function Hairstyle(props) {
    return (
        <View style={styles.container}>
            <SettingsIcon />
            <Text style={styles.hairstyle_text}>Hairstyle</Text>
            <View style={styles.underline} />
            <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
                <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate("ListOfItems", { endpoint: "posts", name: "Barbersop" })
                }}
                >
                    <ImageBackground
                        style={styles.imageStyle}
                        source={require("../Images/barbershop.jpg")}
                        imageStyle={{ borderRadius: 15 }}
                    >
                        <Text style={styles.imageText}>Barbershop</Text>
                        <Text style={styles.imageText}>{">"}</Text>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate("ListOfItems", { endpoint: "posts", name: "Women hairstyle" })
                }}
                >
                    <ImageBackground
                        style={styles.imageStyle}
                        source={require("../Images/women_hairstyle.jpeg")}
                        imageStyle={{ borderRadius: 15 }}
                    >
                        <Text style={styles.imageText}>Women hairstyle</Text>
                        <Text style={styles.imageText}>{">"}</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#CFE8DC",
    },
    hairstyle_text: {
        marginTop: vh(8),
        color: "black",
        alignSelf: "center",
        fontSize: vw(5),
        fontWeight: "500"
    },
    underline: {
        backgroundColor: "#A1A1A1",
        height: 1.5,
        marginTop: vh(0.5),
        width: vw(70),
        alignSelf: "center",
    },
    imageStyle: {
        width: vw(90),
        height: vh(37),
        alignSelf: 'center',
        paddingVertical: vw(3),
        paddingHorizontal: vw(5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    imageText: {
        color: "#fff",
        fontSize: vw(6),
        fontWeight: '300'
    }
})
export default Hairstyle
