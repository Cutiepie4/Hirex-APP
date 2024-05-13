import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { Component, useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";


const TimePicker = (props: any) => {
    // console.log(props.timeStart)
    const [timePicker, setTimePicker] = useState(props.timeStart !== undefined ? props.timeStart : props.timeEnd);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirm = (time: any) => {
        const timePicked = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
        setTimePicker(timePicked);
        if(props.selectOption){
            props.handleOptionSelect(props.selectOption)
        }
        props.timeStart !== undefined ? props.setTime({ ...props.reservationPick, start: timePicked }) : props.setTime({ ...props.reservationPick, end: timePicked })
        console.log("A time has been picked: ", time);
        hideTimePicker();
    };

    return (
        <View >
            <TouchableOpacity onPress={props.editable ? showTimePicker : undefined} style={{
                height: 25,
                marginTop: 3
            }} >
                <Text style={{
                    color: '#7459AB',
                    fontSize: 19,
                    fontWeight: '600'
                }}>{timePicker}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                modalPropsIOS={{
                    presentationStyle: 'overFullScreen',
                    transparent: true,
                    animationType: "slide",
                }}
                onConfirm={handleConfirm}
                onCancel={hideTimePicker}
            />
        </View>
    )
}
export default TimePicker
const styles = StyleSheet.create({})