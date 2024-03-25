import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ItemsDetail from './ItemsDetail';
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import { ExtendedAgendaEntry } from '../screens/ScheduleScreen';

export default function ModalItems(props: any) {
    const [submit, setSubmit] = useState<boolean>(false);
    useEffect(() => {
        console.log(props.reservationPick)
        // setNewItem({ ...props.reservationPick })
    }, [props.reservationPick])
    const handleAddOrUpdateItem = () => {
        props.setItems(prevItems => {
            const newItems = { ...prevItems };
            const dayItems = newItems[props.dayPick] ? [...newItems[props.dayPick]] : [];
            if (props.isNew) {
                dayItems.push(props.reservationPick);
            } else {
                const itemIndex = dayItems.findIndex(item => item.name === props.reservationPick.name);
                if (itemIndex > -1) {
                    dayItems[itemIndex] = props.reservationPick;
                } else {
                }
            }
            // console.log(dayItems)
            newItems[props.dayPick] = dayItems;
            return newItems;
        });
        props.setIsShow(false);
    };
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.isShow}
        >
            <View style={styles.modalContainer} >
                <View style={styles.modalContent}>
                    <ItemsDetail
                        reservationPick={props.reservationPick}
                        setReservationPick={props.setReservationPick}
                        isNew={props.isNew}
                        dayPick={props.dayPick}
                        title={props.title}
                        items={props.items}
                        setItems={props.setItems}
                        setRefreshing={props.setRefreshing}
                        setIsShow={props.setIsShow}
                        setSubmit={setSubmit}
                    />
                    <TouchableOpacity onPress={() => props.setIsShow(false)} style={styles.closeButton} >
                        <EvilIcons name="close-o" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAddOrUpdateItem()} style={styles.saveButton} disabled={submit}>
                        <Text
                            style={{
                                color: submit ? '#999999' : '#2c7cf5',
                                fontSize: 19,
                                fontWeight: '600'
                            }}
                        >Save</Text>
                    </TouchableOpacity>
                    <Text style={{
                        position: 'absolute',
                        top: 10,
                        left: '30%',
                        fontSize: 16,
                        fontFamily: 'mon-m',
                    }}>
                        {props.dayPick}
                    </Text>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        borderRadius: 10,
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    saveButton: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
})