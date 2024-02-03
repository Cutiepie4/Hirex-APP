import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-ui-lib'
import { useDispatch, useSelector } from 'react-redux'
import { increase, login } from '../redux/slice/authSlice';
import { RootReducer } from '../redux/config/reducer';

export default function HomeScreen() {
    const { count } = useSelector((state: RootReducer) => state.authReducer);
    const dispatch = useDispatch();

    const handlePress = () => {
        dispatch(increase());
    }

    return (
        <View>
            <Text style={{ marginTop: 100 }}>HomeScreen</Text>
            <Text style={{ textAlign: 'center' }}>{count}</Text>
            <Button onPress={handlePress} label={'Increase'}></Button>
        </View>
    )
}

const styles = StyleSheet.create({

})