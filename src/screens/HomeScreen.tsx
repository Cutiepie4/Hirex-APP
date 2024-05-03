import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../redux/store/reducer'
import Button from '../components/Button'
import { logout } from '../redux/slice/authSlice'
import { regularPadding } from '../styles/styles'
import RootNavigation from '../route/RootNavigation'
import Toast from 'react-native-toast-message'
import { clearChatRoom } from '@/redux/slice/chatSlice'

const HomeScreen = () => {
    const dispatch = useDispatch();
    const { phoneNumber, access_token, role } = useSelector((state: RootReducer) => state.authReducer);

    return (
        <Container>
            <View style={{
                paddingHorizontal: regularPadding
            }}>
                <Text>HomeScreen</Text>
                <Text>phone number: {phoneNumber}</Text>
                <Text>token: {access_token}</Text>
                <Text>role: {role}</Text>

                <Button
                    title='Logout'
                    onPress={() => {
                        RootNavigation.popToTop();
                        Toast.show({
                            type: 'error',
                            props: {
                                title: 'Thông báo',
                                content: 'Đã có lỗi xảy ra, vui lòng thử  dsaf asdf asdf asdf asdfasdflại',
                            },
                        });
                        dispatch(logout());
                        dispatch(clearChatRoom());
                    }}
                    filled
                />
            </View>
        </Container>
    )
}

export default HomeScreen