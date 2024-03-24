import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../components/Container';

interface CallActionProps {
    switchCamera?: () => void,
    toggleMute?: () => void,
    toggleCamera?: () => void,
    endCall?: () => void,
}

const CallActionBox = (props: CallActionProps) => {

    const { switchCamera, toggleCamera, toggleMute, endCall } = props;

    return (
        <Container >
            <Text>asf</Text>
        </Container>
    )
}

export default CallActionBox

const styles = StyleSheet.create({})