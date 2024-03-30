import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, TextInput, TouchableOpacity, Platform, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Button from '../components/Button';
import RootNavigation from '../config/RootNavigation';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';


const Information = ({ route }) => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [gender, setGender] = useState('male');
    const [fullname, setFullname] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const { password, phoneNumber, retryPassword, role } = route.params;



    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const handleSave = async () => {
        const payload = {
            fullname,
            phone_number: phoneNumber,
            address,
            password,
            retype_password: retryPassword,
            date_of_birth: date.toISOString().split('T')[0],
            role_id: role,
        };
        console.log(phoneNumber)
        console.log(password)
        console.log(address)
        console.log(retryPassword)
        console.log(date.toISOString().split('T')[0])
        console.log(role)



        try {
            const response = await axios.post('http://172.16.4.155:8080/api/v1/users/register', payload);

            if (response.status === 200) {
                Alert.alert("Success", "Registration successful");
                // Navigate to login or another screen
            } else {
                throw new Error('Failed to register. Please try again.');
            }
        } catch (error) {
            Alert.alert("Error", error.toString());
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <TouchableOpacity onPress={() => RootNavigation.pop()}>
                        <Ionicons name="arrow-back" size={24} color="black" style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        textAlign: 'center',
                        color: COLORS.black
                    }}>
                        Required Information
                    </Text>
                </View>

                <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                    <Text style={{ fontSize: 12, color: COLORS.black, marginBottom: 8, fontWeight: '900' }}>
                        Họ và tên
                    </Text>
                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Học và tên'
                            placeholderTextColor={COLORS.black}
                            value={fullname}
                            onChangeText={setFullname}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                    <Text style={{ fontSize: 12, color: COLORS.black, marginBottom: 8, fontWeight: '900' }}>Ngày Sinh</Text>
                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingLeft: 22,
                        paddingRight: 10
                    }}>
                        <Text>{date.toLocaleDateString()}</Text>
                        <TouchableOpacity onPress={() => setShow(true)}>
                            <Ionicons name="calendar" size={24} color={COLORS.black} />
                        </TouchableOpacity>
                    </View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onChange}
                        />
                    )}
                </View>

                <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                    <Text style={{ fontSize: 12, color: COLORS.black, marginBottom: 8, fontWeight: '900' }}> Giới tính </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            padding: 10
                        }}>
                            <TouchableOpacity style={{
                                height: 24,
                                width: 24,
                                borderRadius: 12,
                                borderWidth: 2,
                                borderColor: '#000',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 15
                            }}
                                onPress={() => setGender('male')}>
                                {
                                    gender === 'male' ?
                                        <View style={{
                                            height: 12,
                                            width: 12,
                                            borderRadius: 6,
                                            backgroundColor: '#000',
                                        }} />
                                        : null
                                }
                            </TouchableOpacity>
                            <Text>Nam</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            padding: 10
                        }}>
                            <TouchableOpacity style={{
                                height: 24,
                                width: 24,
                                borderRadius: 12,
                                borderWidth: 2,
                                borderColor: '#000',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 15
                            }}
                                onPress={() => setGender('female')}>
                                {
                                    gender === 'female' ?
                                        <View style={{
                                            height: 12,
                                            width: 12,
                                            borderRadius: 6,
                                            backgroundColor: '#000',
                                        }} />
                                        : null
                                }
                            </TouchableOpacity>
                            <Text>Nữ</Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                    <Text style={{ fontSize: 12, color: COLORS.black, marginBottom: 8, fontWeight: '900' }}>
                        Địa chỉ Email
                    </Text>
                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Địa chỉ Email'
                            placeholderTextColor={COLORS.black}
                            value={address}
                            onChangeText={setAddress}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                    <Text style={{ fontSize: 12, color: COLORS.black, marginBottom: 8, fontWeight: '900' }}>
                        Số điện thoại
                    </Text>
                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Số điện thoại'
                            placeholderTextColor={COLORS.black}
                            value={phoneNumber}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                    <Text style={{ fontSize: 12, color: COLORS.black, marginBottom: 8, fontWeight: '900' }}>
                        Địa chỉ
                    </Text>
                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Địa chỉ'
                            placeholderTextColor={COLORS.black}
                            value={address}
                            onChangeText={setAddress}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

                <Button
                    title="Save"
                    filled
                    onPress={handleSave}
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                        height: 52,
                        width: 250,
                        alignSelf: 'center'
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default Information;