import { StatusBar } from "expo-status-bar";
import { vw, vh } from 'react-native-expo-viewport-units';
import React, { useState, useEffect } from "react";
import FeatherIcon from "react-native-vector-icons/Feather";
import EntypoIcon from "react-native-vector-icons/Entypo";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import OcticonsIcon from "react-native-vector-icons/Octicons";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Button,
    ScrollView
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { SelectList } from "react-native-dropdown-select-list";
import Checkbox from 'expo-checkbox';
import DateTimePicker from "react-native-modal-datetime-picker";
function Book(props) {
    const [selectedDate, SetSelectedDate] = useState('')
    const [tempDate, SetTempDate] = useState('')
    const [comment, SetComment] = useState('')
    const [calendar, SetCalendar] = useState(false)
    const [people, SetPeople] = useState(1)
    const [chooseTime, SetChooseTime] = useState("none")
    const [startTime, SetStartTime] = useState()
    const [duration, SetDuration] = useState(1)
    const [notification, setNotification] = useState(0);
    const [checkBox, SetCheckBox] = useState(false)
    const [agreeError, SetAgreeError] = useState("none")
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

    const validNumber = (text) => {
       SetPeople(text.replace(/[^1-9]/g, ''))
    }

    const setTime = () => {
        const start = new Date("August 19, 2023 13:00:00")
        SetStartTime(start.toTimeString().substring(0,5))
        //SetStartTime(start)
        const end = new Date("August 19, 2023 23:00:00")
        ableTime.push(start.toTimeString().substring(0,5))
        while(start < end){
            start.setMinutes(start.getMinutes() + 15)
            ableTime.push(start.toTimeString().substring(0,5))
        }
    }

    const addTime = () => {
        const n = parseInt(String(startTime).substring(0,2))
        if((duration + n) > 23) {
            return "0" + (duration + n - 24).toString() + String(startTime).substring(2,5)
        }
        else {
            return (duration + n).toString() + String(startTime).substring(2,5)
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

                    <View style={styles.rectangle}>
                        <AntDesignIcon
                            name="clockcircleo"
                            size={vh(5)}
                            style={{ marginLeft: vw(5), flex: 1 }}
                        />
                        <Text style={{ flex: 5, fontSize: vw(6) }}>{startTime} - {addTime()}</Text>
                        <FeatherIcon
                            name="chevron-down"
                            size={vh(5)}
                            style={{ flex: 1 }}
                            onPress={() => {
                                chooseTime === 'none' ? SetChooseTime("flex") : SetChooseTime("none")  
                            }}
                        />
                    </View>
                    <View style={{ display: chooseTime }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.chooseTimeView}>
                                <Text style={styles.timeText}>Choose Time</Text>
                            </View>
                            <View style={styles.chooseDurationView}>
                                <Text style={styles.timeText}>Duration</Text>
                            </View>
                        </View>
                        <View style={styles.time}>
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
                                boxStyles={[styles.smallRectangle, { borderWidth: 0 }]}
                                dropdownStyles={[styles.dropdownRectangle, { width: vw(44) }]}
                                dropdownTextStyles={{ fontSize: vw(4) }}
                            />
                            <SelectList
                                data={possibleDuration}
                                placeholder={possibleDuration[0].value}
                                search={false}
                                setSelected={(duration) => SetDuration(duration)}
                                arrowicon={
                                    <FeatherIcon
                                        name="chevron-down"
                                        size={vh(5)}
                                    />
                                }
                                boxStyles={[styles.smallRectangle, { borderWidth: 0 }]}
                                dropdownStyles={[styles.dropdownRectangle, { width: vw(44) }]}
                                dropdownTextStyles={{ fontSize: vw(4) }}
                            />
                        </View>
                    </View>

                    <View style={styles.rectangle}>
                        <OcticonsIcon
                            name="people"
                            size={vh(5)}
                            style={{ marginLeft: vw(5), flex: 1 }}
                        />
                        <FeatherIcon
                            name="user-minus"
                            size={vh(5)}
                            style={{ flex: 1 }}
                            onPress={() => {
                                if (people > 1) {
                                    SetPeople(parseInt(people) - 1);
                                }
                            }}
                        />
                        <TextInput
                            style={{ flex: 1, fontSize: vh(4) }}
                            placeholderTextColor={'black'}
                            keyboardType={"decimal-pad"}
                            onChangeText={(text) => validNumber((text))}
                            value={people.toString()}
                        />
                        <FeatherIcon
                            name="user-plus"
                            size={vh(5)}
                            style={{ flex: 1 }}
                            onPress={() => {
                                console.log(people)
                                SetPeople(parseInt(people) + 1)
                                console.log(people)
                            }}
                        />
                    </View>
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

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            
            <View style={styles.underline} />
            {calendar ?
                CalendarScreen() : MainScreen()}
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
    time: {
        flexDirection: 'row',
        width: vw(98),
        alignSelf: "center",
        justifyContent: "space-between"
    },
    smallRectangle: {
        width: vw(44),
        height: vh(7),
        borderRadius: 20,
        backgroundColor: "#fff"
    },
    chooseTimeView: {
        width: vw(44),
        marginLeft: vw(1),
        alignItems: 'center'
    },
    chooseDurationView: {
        width: vw(44),
        marginLeft: vw(10),
        alignItems: 'center'
    },
    timeText: {
        fontWeight: '500',
        fontSize: vw(5)
    }
})
export default Book