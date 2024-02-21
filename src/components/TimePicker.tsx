import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { Component, useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";


const TimePicker = (props) => {
    const[timePickerStart, setTimePickerStart] = useState(new Date());
    const [isTimePickerStartVisible, setTimePickerStartVisibility] = useState(false);
    const showTimePickerStart = () => {
        setTimePickerStartVisibility(true);
    };

    const hideTimePickerStart = () => {
        setTimePickerStartVisibility(false);
    };

    const handleConfirm = (time) => {
        setTimePickerStart(time)
        console.warn("A time has been picked: ", time);
        hideTimePickerStart();
    };
    return (
        <View >
            <TouchableOpacity onPress={showTimePickerStart} style={{
                height: 25,
                marginTop: 3
            }} >
                <Text style={{
                    color: '#7459AB',
                    fontSize: 19,
                    fontWeight: '600'
                }}>{timePickerStart.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isTimePickerStartVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideTimePickerStart}
            />
        </View>
    )
}
export default TimePicker
const styles = StyleSheet.create({})