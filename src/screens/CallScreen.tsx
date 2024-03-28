import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../components/Container'
import {
    RTCPeerConnection,
    RTCView,
    mediaDevices,
    RTCIceCandidate,
    RTCSessionDescription,
    MediaStream,
} from "react-native-webrtc";

const CallScreen = () => {
    return (
        <Container>
            <Text>CallScreen</Text>
            <RTCView />
        </Container>
    )
}

export default CallScreen

const styles = StyleSheet.create({})