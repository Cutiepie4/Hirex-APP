import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Container from '../../components/Container';
import { Octicons } from '@expo/vector-icons';
import { deepPurple } from '../../styles/styles';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

interface CallActionProps {
    switchCamera?: () => void,
    toggleMute?: () => void,
    toggleCamera?: () => void,
    endCall?: () => void,
    isMuted: boolean,
}

const CallActionBox = (props: CallActionProps) => {

    const { switchCamera, toggleCamera, toggleMute, endCall, isMuted } = props;

    return (
        <View
            style={{
                flexDirection: 'row',
                paddingHorizontal: 12,
                paddingVertical: 20,
                alignSelf: 'center',
                alignItems: 'center',
                marginBottom: 20,
                position: 'absolute',
                bottom: 20,
                backgroundColor: 'rgba(200, 200, 200, 0.5)',
                borderRadius: 20,
                justifyContent: 'space-between',
            }}
        >
            {/* <TouchableOpacity onPress={switchCamera} style={[styles.imageBox, { backgroundColor: 'white' }]}>
                <Ionicons name="camera-reverse-outline" size={24} color="black" />
            </TouchableOpacity> */}

            <TouchableOpacity onPress={toggleCamera} style={[styles.imageBox, { backgroundColor: 'white' }]}>
                <Feather name="camera-off" size={20} color="black" />
                {/* <Feather name="camera" size={24} color="black" /> */}
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleMute} style={[styles.imageBox, styles.inactive]}>
                {/* <Feather name="volume-2" size={20} color="black" /> */}
                <Feather name="volume-x" size={20} color={`white`} />
            </TouchableOpacity>

            <TouchableOpacity onPress={endCall} style={[styles.imageBox, { backgroundColor: 'red' }]}>
                <MaterialIcons name="call-end" size={20} color={'white'} />

            </TouchableOpacity>
        </View>
    )
}

export default CallActionBox

const styles = StyleSheet.create({
    imageBox: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    active: {
        backgroundColor: 'white'
    },
    inactive: {
        backgroundColor: 'gray'
    }
})