import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../../components/Container';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Octicons } from '@expo/vector-icons';
import { deepPurple } from '../../styles/styles';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';

interface CallActionProps {
    switchCamera?: () => void,
    toggleMute?: () => void,
    toggleCamera?: () => void,
    endCall?: () => void,
}

const CallActionBox = (props: CallActionProps) => {

    const { switchCamera, toggleCamera, toggleMute, endCall } = props;

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
                backgroundColor: 'rgba(242, 242, 242, 0.5)',
                borderRadius: 20,
                justifyContent: 'space-between'
            }}
        >
            <TouchableOpacity onPress={switchCamera} style={[styles.imageBox, { backgroundColor: 'white' }]}>
                <Ionicons name="camera-reverse-outline" size={24} color="black" />

            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCamera} style={[styles.imageBox, { backgroundColor: 'white' }]}>
                <Octicons name="unmute" size={20} color={deepPurple} />

            </TouchableOpacity>
            <TouchableOpacity onPress={toggleMute} style={[styles.imageBox, { backgroundColor: 'white' }]}>
                <Octicons name="unmute" size={20} color={deepPurple} />
            </TouchableOpacity>
            <TouchableOpacity onPress={endCall} style={[styles.imageBox, { backgroundColor: 'white' }]}>
                <Octicons name="unmute" size={20} color={deepPurple} />

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
    }
})