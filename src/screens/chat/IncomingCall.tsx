import { StyleSheet, Text, View, Image, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import Container from '@/components/Container'
import CAT from '../../assets/ccat.jpg';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { hideIncommingCall } from '@/redux/slice/chatSlice';
import { RootReducer } from '@/redux/store/reducer';

const IncomingCall = () => {
    const dispatch = useDispatch();
    const { incommingCallShow } = useSelector((state: RootReducer) => state.chatReducer);

    return (
        <Modal visible={incommingCallShow}>
            <Image
                source={CAT}
                resizeMode='cover'
                style={{
                    flex: 1,
                }}
            />

            <View style={{
                position: 'absolute',
                bottom: 80,
                left: 80,
                right: 80,
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <TouchableOpacity style={[styles.circle, { backgroundColor: 'green' }]}>
                    <Feather name="phone" size={28} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.circle]}>
                    <MaterialCommunityIcons name="phone-hangup" size={28} color="white" onPress={() => {
                        dispatch(hideIncommingCall());
                    }} />
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default IncomingCall

const styles = StyleSheet.create({
    circle: {
        backgroundColor: 'red',
        paddingVertical: 14,
        paddingHorizontal: 14,
        borderRadius: 20
    }
})