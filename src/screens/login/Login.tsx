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

        try {
            dispatch(showLoading());
            const response = await BASE_API.post('/users/login', {
                phoneNumber: phoneNumber,
                password: password
            });
            if (response.status == 200 && response.data) {

                const token = response.data.token;
                const role = response.data.role;

                console.log('Token:', token);
                console.log('Role:', role);

                // Dispatch action to update Redux store with token
                dispatch(login({ role, phoneNumber, access_token: token }));
                Toast.show({
                    type: 'success',
                    props: {
                        title: 'Đăng nhập thành công',
                        content: `Chào mừng ${phoneNumber} trở lại!`
                    },
                });
                // Navigate to HomeTabs screen upon successful login
                RootNavigation.navigate('HomeTab');
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
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                    <View style={{ marginHorizontal: 22, justifyContent: 'center' }}>
                        <View style={{
                            marginHorizontal: 22,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <View style={{ marginVertical: 50 }}>
                                <Text style={{ fontSize: 30, fontWeight: '900', marginVertical: 12, color: colors.black }}>
                                    Welcome Back
                                </Text>
                                <Text style={{ fontSize: 16, color: colors.black }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                            <Text style={{ fontSize: 16, color: colors.black, marginBottom: 8, fontWeight: '900' }}>
                                Phone Number
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

                                <Input placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} />
                            </View>

                        </View>

                        <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                            <Text style={{ fontSize: 16, color: colors.black, fontWeight: '900', marginBottom: 8 }}>
                                Password
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
                                <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={isPasswordShown} />
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
                            <Text>Forget Password?</Text>
                        </View>

                        <Button
                            title="LOGIN"
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
                                <Text style={{ fontSize: 15, fontWeight: '900', marginVertical: 12, color: colors.black }}>SIGN IN WITH GOOGLE</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 22 }}>
                            <Text style={{ fontSize: 16, color: colors.black }}>You don't have an account yet?</Text>
                            <Pressable onPress={() => RootNavigation.navigate('Signup')}>
                                <Text style={{ fontSize: 16, color: '#FF9228', fontWeight: '900', marginLeft: 6 }}>
                                    Sign up
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </KeyboardAvoidingView>

            </SafeAreaView>
        </Container>
    );
};

export default Login;
