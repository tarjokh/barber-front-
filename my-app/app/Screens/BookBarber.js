import { StatusBar } from "expo-status-bar";
import { vw, vh } from 'react-native-expo-viewport-units';
import React, { useState, useEffect, Fragment } from "react";
import FeatherIcon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import OcticonsIcon from "react-native-vector-icons/Octicons";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Button,
    ScrollView,
    Image
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { SelectList } from "react-native-dropdown-select-list";
import Checkbox from 'expo-checkbox';
import DateTimePicker from "react-native-modal-datetime-picker";
import { FlatList } from "react-native";
import { Rating } from "react-native-ratings";
function BookBarber(props) {
    const [selectedDate, SetSelectedDate] = useState('')
    const [tempDate, SetTempDate] = useState('')
    const [comment, SetComment] = useState('')
    const [calendar, SetCalendar] = useState(false)
    const [startTime, SetStartTime] = useState()
    const [duration, SetDuration] = useState(1)
    const [notification, setNotification] = useState(0);
    const [checkBox, SetCheckBox] = useState(false)
    const [agreeError, SetAgreeError] = useState("none")
    const [chooseBarber, setChooseBarber] = useState(false)
    const today = new Date().toLocaleString()
    const [ableTime, SetAbleTime] = useState([])
    const [items, setItems] = useState([
        { value: 'Without notification', key: 0 },
        { value: 'For 1 hour', key: 1 },
        { value: 'For 3 hour', key: 3 },
        { value: 'For 6 hour', key: 6 },
        { value: 'For 1 day', key: 24 },
    ])
    const [possibleDuration, setPossibleDuration] = useState([
        { value: '1 hour', key: 1 },
        { value: '2 hour', key: 2 },
        { value: '3 hour', key: 3 },
        { value: '4 hour', key: 4 },
        { value: '5 hour', key: 5 },
        { value: '6 hour', key: 6 },
        { value: '7 hour', key: 7 },
        { value: '8 hour', key: 8 },
    ])

    useEffect(() => {
        setTime()
    }, [])

    const setTime = () => {
        const start = new Date("August 19, 2023 9:00:00")
        SetStartTime(start.toTimeString().substring(0, 5))
        //SetStartTime(start)
        const end = new Date("August 19, 2023 20:00:00")
        ableTime.push(start.toTimeString().substring(0, 5))
        while (start < end) {
            start.setMinutes(start.getMinutes() + 30)
            ableTime.push(start.toTimeString().substring(0, 5))
        }
    }

    const addTime = () => {
        const n = parseInt(String(startTime).substring(0, 2))
        if ((duration + n) > 23) {
            return "0" + (duration + n - 24).toString() + String(startTime).substring(2, 5)
        }
        else {
            return (duration + n).toString() + String(startTime).substring(2, 5)
        }
    }

    const navigate = () => {
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'BookDone' }],
        });
    }

    const MainScreen = () => {
        return (
            <ScrollView nestedScrollEnabled={true} horizontal={false}>
                <View>
                    <View style={styles.book}>
                        <FeatherIcon
                            name="chevron-left"
                            size={vw(10)}
                            style={{ alignSelf: 'center' }}
                            onPress={() => {
                                props.navigation.goBack()
                            }}
                        />
                        <Text style={styles.bookText}>Book</Text>
                        <Text>        </Text>
                    </View>
                    <View style={styles.underline}></View>
                    <View style={[styles.rectangle, { marginTop: vh(3) }]}>
                        <FeatherIcon
                            name="calendar"
                            size={vh(5)}
                            style={{ marginLeft: vw(5), flex: 1 }}
                        />
                        {selectedDate == '' ?
                            <Text style={{ flex: 5, fontSize: vw(6) }}>{today.substring(0, 3)}, {today.substring(4, 10)}</Text> :
                            <Text style={{ flex: 5, fontSize: vw(6) }}>{selectedDate.substring(0, 3)}, {selectedDate.substring(4, 10)}</Text>
                        }
                        <FeatherIcon
                            name="chevron-right"
                            size={vh(5)}
                            style={{ flex: 1 }}
                            onPress={() => {
                                SetCalendar(true)
                            }}
                        />
                    </View>

                    <View style={styles.Timerectangle}>
                        <AntDesignIcon
                            name="clockcircleo"
                            size={vh(5)}
                            style={{ marginLeft: vw(5), flex: 1 }}
                        />
                        <SelectList
                            data={ableTime}
                            placeholder={ableTime[0]}
                            search={false}
                            setSelected={(startTime) => SetStartTime(startTime)}
                            arrowicon={
                                <FeatherIcon
                                    name="chevron-down"
                                    size={vh(5)}
                                />
                            }
                            boxStyles={{ borderWidth: 0, alignItems: 'center', height: vh(10), width: vw(78) }}
                            dropdownStyles={{
                                width: vw(78),
                                borderWidth: 0,
                                backgroundColor: '#fff',
                                marginTop: -vw(2)
                            }}
                            dropdownTextStyles={{ fontSize: vw(4) }}
                            inputStyles={{ fontSize: vw(6) }}
                        />
                    </View>

                    <TouchableOpacity onPress={() => setChooseBarber(true)} style={styles.rectangle}>
                        <OcticonsIcon
                            name="people"
                            size={vh(5)}
                            style={{ marginLeft: vw(5), flex: 1 }}
                        />
                        <Text style={{ flex: 5, fontSize: vw(6) }}>Choose a specialist</Text>
                        <FeatherIcon
                            name="chevron-right"
                            size={vh(5)}
                            style={{ flex: 1 }}
                        />
                    </TouchableOpacity>
                    <Text style={styles.notification}>Notification</Text>
                    <SelectList
                        data={items}
                        placeholder={items[0].value}
                        search={false}
                        setSelected={(notification) => setNotification(notification)}
                        arrowicon={
                            <FeatherIcon
                                name="chevron-down"
                                size={vh(5)}
                            />
                        }
                        boxStyles={[styles.rectangle, { borderWidth: 0 }]}
                        dropdownStyles={styles.dropdownRectangle}
                        dropdownTextStyles={{ fontSize: vw(4) }}
                        inputStyles={{ fontSize: vw(6) }}
                    />

                    <Text style={styles.notification}>Comment</Text>
                    <View style={styles.rectangle}>
                        <TextInput
                            style={styles.TextInput}
                            editable={true}
                            multiline={true}
                            onChangeText={(comment) => { SetComment(comment) }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Checkbox
                            value={checkBox}
                            style={{ marginLeft: vw(5) }}
                            color={"black"}
                            onValueChange={(checkBox) => SetCheckBox(checkBox)}
                            onTouchEnd={(agreeError) => SetAgreeError("none")}
                        />
                        <Text>  I agree with restaurant terms of service.</Text>
                    </View>
                    <Text style={{ display: agreeError, marginLeft: vw(5), color: '#dc3545' }}>You have to agree with restaurant terms of service</Text>
                    <TouchableOpacity style={styles.reserveButton}
                        onPress={() => {
                            checkBox ? navigate() : SetAgreeError("flex");
                        }}
                    >
                        <Text style={styles.reserbeText}>RESERVE</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        )
    }

    const CalendarScreen = () => {
        return (
            <View>
                <View style={styles.book}>
                    <FeatherIcon
                        name="chevron-left"
                        size={vw(10)}
                        style={{ alignSelf: 'center' }}
                        onPress={() => {
                            SetCalendar(false)
                        }}
                    />
                    <Text style={styles.bookText}>Book</Text>
                    <Text>        </Text>
                </View>
                <View style={styles.underline}></View>
                <View style={{ marginTop: vh(10) }}>
                    <CalendarPicker
                        startFromMonday={true}
                        previousTitle={"<"}
                        nextTitle={">"}
                        nextTitleStyle={{ fontSize: vw(7) }}
                        previousTitleStyle={{ fontSize: vw(7) }}
                        todayTextStyle={{ color: "black" }}
                        minDate={new Date()}
                        todayBackgroundColor="#CFE8DC"
                        selectedDayColor="#1294F2"
                        selectedDayTextColor="#FFFFFF"
                        onDateChange={SetTempDate}
                    />
                </View>
                <View style={styles.saveBtn}>
                    <Button
                        title="Save"
                        disabled={tempDate == '' ? true : false}
                        onPress={() => { SetSelectedDate(tempDate.toString()); SetCalendar(false) }}
                    />
                </View>
            </View>
        )
    }

    const ItemView = ({ item}, key) => {
        return (
            <View style={styles.barberRectangle}>
                <View style={{ flexDirection: 'row', marginBottom: vh(2) }}>
                    <Image
                        source={require('../Images/barbershop.jpg')}
                        style={[styles.circle, { marginLeft: 0 }]}
                    />
                    <View style={{ flex: 4, flexDirection: 'column', marginLeft: vw(3) }}>
                        <Text>Ambassador</Text>
                        <Text>Микола Дроник</Text>
                        <View style={{ width: vw(22), justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Rating
                                isDisabled={false}
                                type='star'
                                ratingCount={5}
                                startingValue={5}
                                imageSize={vw(4)}
                                readonly={true}
                            />
                            <Text style={{ color: "#AAAAAA" }}>  {item.key}</Text>
                        </View>
                    </View>
                    <Ionicons
                        name="md-information-circle-outline"
                        size={vh(5)}
                        style={{ color: "#AAAAAA" }}
                    />
                </View>
                <Text style={{ color: '#AAAAAA', marginBottom: vh(1) }}>The nearest time to book</Text>
                <View style={styles.nearestTime}>
                    <Text>{ableTime[0]}</Text>
                </View>
            </View>
        )
    }

    const ChooseBarberScreen = () => {
        return (
            <ScrollView>
                <View>
                    <FeatherIcon
                        name="chevron-left"
                        size={vw(10)}
                        style={{ marginLeft: vw(3), marginTop: 50 }}
                        onPress={() => {
                            setChooseBarber(false)
                        }}
                    />
                    <View style={styles.rectangle}>
                        <View style={styles.circle}>
                            <Ionicons
                                name="people-outline"
                                style={{ color: '#fff' }}
                                size={vh(5)}
                            />
                        </View>
                        <Text style={{ fontSize: vw(6), marginLeft: vw(5) }}>Any free specialist</Text>
                    </View>
                    {possibleDuration.map(
                        (item) => <ItemView key={item.key} item={item}/>
                    )}
                </View>
            </ScrollView>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <View style={styles.underline} />
            {calendar ?
                CalendarScreen()
                : chooseBarber ? ChooseBarberScreen()
                    : MainScreen()}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#CFE8DC",
    },
    book: {
        width: vw(100),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
    },
    bookText: {
        fontSize: vw(10),
    },
    underline: {
        backgroundColor: "#A1A1A1",
        height: 1,
        width: vw(120),
    },
    saveBtn: {
        width: vw(25),
        height: vw(10),
        alignSelf: 'center',
        marginTop: vh(10)
    },
    rectangle: {
        backgroundColor: '#fff',
        width: vw(98),
        alignSelf: 'center',
        marginVertical: vh(1.5),
        height: vh(10),
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    Timerectangle: {
        backgroundColor: '#fff',
        width: vw(98),
        alignSelf: 'center',
        marginVertical: vh(1.5),
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    notification: {
        marginTop: vh(1),
        marginLeft: vw(5),
        fontSize: vw(7),
        fontWeight: '300'
    },
    TextInput: {
        flex: 1,
        marginLeft: vw(3),
    },
    dropdownRectangle: {
        width: vw(98),
        alignSelf: 'center',
        borderWidth: 0,
        backgroundColor: '#fff',
        marginTop: -vw(2)
    },
    reserveButton: {
        width: vw(98),
        height: vh(7),
        alignSelf: "center",
        marginVertical: vh(2),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5ACCE4',
        borderRadius: 20
    },
    reserbeText: {
        color: "#fff",
        fontSize: vw(6)
    },
    circle: {
        width: vh(8),
        height: vh(8),
        borderRadius: vh(8),
        marginLeft: vw(3),
        backgroundColor: '#AAAAAA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    barberRectangle: {
        paddingLeft: vw(10),
        paddingTop: vw(5),
        paddingRight: vw(1),
        paddingBottom: vw(1),
        width: vw(98),
        alignSelf: 'center',
        backgroundColor: "#fff",
        marginBottom: vh(5),
        borderRadius: 20
    },
    nearestTime: {
        width: vw(40),
        height: vh(5),
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#AAAAAA",
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default BookBarber