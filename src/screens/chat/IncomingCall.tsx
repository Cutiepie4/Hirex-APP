import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Container from '@/components/Container'
import CAT from '../../assets/ccat.jpg';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    hangUp: () => void;
    join: () => void;
}

const IncomingCall = (props: Props) => {
    return (
        <Container>
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
                    <MaterialCommunityIcons name="phone-hangup" size={28} color="white" />
                </TouchableOpacity>
            </View>
        </Container>
    )
}

export default IncomingCall

const styles = StyleSheet.create({
    circle: {
        backgroundColor: 'red',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 20
    }
})