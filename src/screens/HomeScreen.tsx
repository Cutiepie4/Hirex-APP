import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increase, login } from '../redux/slice/authSlice';
import { RootReducer } from '../redux/store/reducer';
import RootNavigation from '../config/RootNavigation';
import { deepPurple, purple } from '../styles/styles';

export default function HomeScreen() {
    const { count } = useSelector((state: RootReducer) => state.authReducer);
    const dispatch = useDispatch();

    const handlePress = () => {
        dispatch(increase());
    }

    return (
        <View style={{ alignItems: 'center' }}>
            <Text style={{ marginTop: 100 }}>HomeScreen</Text>
            <Text style={{ textAlign: 'center' }}>{count}</Text>
            <TouchableOpacity
                style={{
                    backgroundColor: deepPurple,
                    alignItems: 'center',
                    width: 50,
                    borderRadius: 5,
                    height: 20
                }}
                onPress={handlePress}>
                <Text style={{ color: 'white' }}>click</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    marginTop: 30,
                    backgroundColor: 'green',
                    alignItems: 'center',
                    width: 100,
                    borderRadius: 5,
                    height: 40,
                    justifyContent: 'center'
                }}
                onPress={() => {
                    RootNavigation.navigate('Messages');
                }}>
                <Text style={[styles.titleButton]}>Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    marginTop: 30,
                    backgroundColor: 'green',
                    alignItems: 'center',
                    width: 100,
                    borderRadius: 5,
                    height: 40,
                    justifyContent: 'center'
                }}
                onPress={() => {
                    RootNavigation.navigate('Notifications');
                }}>
                <Text style={[styles.titleButton]}>Notification</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    titleButton: {
        color: purple
    }
})