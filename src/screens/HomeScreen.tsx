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

const HomeScreen = () => {
    const dispatch = useDispatch();
    const { phoneNumber, access_token } = useSelector((state: RootReducer) => state.authReducer);

    return (
        <Container>
            <View style={{
                paddingHorizontal: regularPadding
            }}>
                <Text>HomeScreen</Text>
                <Text>phone number: {phoneNumber}</Text>
                <Text>token: {access_token}</Text>

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
                    }}
                    filled
                />
            </View>
        </Container>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})