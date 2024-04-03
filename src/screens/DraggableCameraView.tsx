import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../components/Container'
import { RTCView } from 'react-native-webrtc'

const DraggableCameraView = (props) => {
    return (
        <Container>
            <View style={{
                backgroundColor: 'red',
                width: 100,
                height: 150
            }}>
            </View>
        </Container>
    )
}

export default DraggableCameraView

const styles = StyleSheet.create({})