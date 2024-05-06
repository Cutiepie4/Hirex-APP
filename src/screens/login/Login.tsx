import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Container from '../../components/Container';
import RootNavigation from '../../route/RootNavigation'
import { useDispatch } from 'react-redux';
import { hideLoading, login, showLoading } from '../../redux/slice/authSlice';
import GOOGLE from '../../assets/images/google_logo.png'

import { BASE_API } from '../../services/BaseApi';
import Toast from 'react-native-toast-message';

const Login = () => {
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLoginPress = async () => {
        dispatch(showLoading());
        
        try {
            const response = await BASE_API.post('/users/login', {
                phoneNumber: phoneNumber,
                password: password
            });

            if (response && response.data) {
                const token = response.data.token;
                const role = response.data.role;
                const idUser = response.data.id;

                console.log('Token:', token);
                console.log('Role:', role);
                console.log('idUser:', idUser);

                // Dispatch action to update Redux store with token
                dispatch(login({ role, phoneNumber, access_token: token }));

                RootNavigation.navigate('HomeTab', {
                    screen: 'Tab2', // Name of the tab where ProfileStack is loaded
                    params: {
                        screen: 'Profile', // Assuming 'Profile' is the name of the screen inside ProfileStack
                        params: {
                            idUser: idUser, // Your user ID parameter
                        },
                    },
                });
                
                
                Toast.show({
                    type: 'success',
                    props: {
                        title: 'Đăng nhập thành công',
                        content: 'Chào mừng trở lại!'
                    },
                    autoHide: false
                })
            } else {
                console.error('Token not found in response');
            }
        } catch (error) {
            console.error('Error:');
        } finally {
            dispatch(hideLoading());
        }
    };

    return (
        <Container>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                <View style={{ flex: 1, marginHorizontal: 22 }}>
                    <View style={{
                        marginHorizontal: 22,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{ marginVertical: 50 }}>
                            <Text style={{ fontSize: 30, fontWeight: '900', marginVertical: 12, color: colors.black }}>
                                Chào mừng trở lại
                            </Text>
                        </View>
                    </View>
                    <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                        <Text style={{ fontSize: 16, color: colors.black, marginBottom: 8, fontWeight: '900' }}>
                            Số điện thoại
                        </Text>
                        <View style={{
                            height: 48,
                            borderColor: colors.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}>

                            <Input placeholder="Số điện thoại" value={phoneNumber} onChangeText={setPhoneNumber} />
                        </View>

                    </View>

                    <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                        <Text style={{ fontSize: 16, color: colors.black, fontWeight: '900', marginBottom: 8 }}>
                            Mật khẩu
                        </Text>
                        <View style={{
                            height: 48,
                            borderColor: colors.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}>
                            <Input placeholder="Mật khẩu" value={password} onChangeText={setPassword} secureTextEntry={isPasswordShown} />
                            <TouchableOpacity
                                onPress={() => setIsPasswordShown(!isPasswordShown)}
                                style={{ position: 'absolute', right: 12 }}
                            >
                                {isPasswordShown ? (
                                    <Ionicons name="eye-off" size={24} color={colors.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={colors.black} />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginVertical: 6
                    }}>
                        <Text>Quên mật khẩu?</Text>
                    </View>

                    <Button
                        title="Đăng Nhập"
                        filled
                        onPress={handleLoginPress}
                        // onPress={() => RootNavigation.navigate('HomeTab')}
                        style={{
                            marginTop: 18,
                            marginBottom: 4,
                            height: 52,
                            width: 250, // thêm dòng này để đặt chiều rộng cố định cho Button
                            alignSelf: 'center' // thêm dòng này để căn giữa Button
                        }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => RootNavigation.navigate('Setting')}
                            style={{
                                marginTop: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                height: 52,
                                width: 250,
                                borderWidth: 1,
                                borderColor: colors.grey,
                                marginRight: 4,
                                borderRadius: 10,
                                backgroundColor: colors.lavendar,
                                alignSelf: 'center'
                            }}
                        >
                            <Image
                                source={GOOGLE}
                                style={{ height: 30, width: 30, marginRight: 8 }}
                                resizeMode="contain"
                            />
                            <Text style={{ fontSize: 15, fontWeight: '900', marginVertical: 12, color: colors.black }}>Đăng nhập với GOOGLE</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 22 }}>
                        <Text style={{ fontSize: 16, color: colors.black }}>You don't have an account yet?</Text>
                        <Pressable onPress={() => RootNavigation.navigate('Signup')}>
                            <Text style={{ fontSize: 16, color: '#FF9228', fontWeight: '900', marginLeft: 6 }}>
                                Đăng ký
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        </Container>
    );
};

export default Login;
