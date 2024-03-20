import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ItemsDetail from './ItemsDetail';
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import { ExtendedAgendaEntry } from '../screens/ScheduleScreen';

export default function ModalItems(props: any) {
    const [newItem, setNewItem] = useState<ExtendedAgendaEntry>(props.reservationPick);
    useEffect(() => {
        console.log(props.reservationPick)
        setNewItem({ ...props.reservationPick })
    }, [props.reservationPick])
    const handleAddOrUpdateItem = () => {
        props.setItems(prevItems => {
            const newItems = { ...prevItems };
            const dayItems = newItems[props.dayPick] || [];
            if (props.isNew) {
                dayItems.push(newItem);
            } else {
                const index = dayItems.findIndex(item => item.name === newItem.name);
                if (index !== -1) {
                    dayItems[index] = newItem;
                } else {
                    dayItems.push(newItem);
                }
            }
            newItems[props.dayPick] = dayItems;
            return newItems;
        });
        // console.log(props.items)
        props.setRefreshing(true); 
        props.setIsShow(false)
        // props.setIsShow(false)
    };
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.isShow}
        >
            <View style={styles.modalContainer}>
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
                    />
                    <TouchableOpacity onPress={() => props.setIsShow(false)} style={styles.closeButton}>
                        <EvilIcons name="close-o" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAddOrUpdateItem()} style={styles.saveButton}>
                        <Text
                            style={{
                                color: '#2c7cf5',
                                fontSize: 19,
                                fontWeight: '600'
                            }}
                        >Save</Text>
                    </TouchableOpacity>
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