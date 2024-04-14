import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increase, login } from '../redux/slice/authSlice';
import { RootReducer } from '../redux/config/reducer';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const navigation = useNavigation();
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
                    backgroundColor: 'green',
                    alignItems: 'center',
                    width: 50,
                    borderRadius: 5,
                    height: 20
                }}
                onPress={() => navigation.navigate('EmployeeList')}
                >
                <Text style={{ color: 'white' }}>click</Text>
            </TouchableOpacity>
        </View>
    )
}