import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Platform, Alert, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from '@/theme';
import { Ionicons } from "@expo/vector-icons";
import Button from '../../components/Button';
import RootNavigation from '../../route/RootNavigation';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { BASE_API } from '../../services/BaseApi';
import { deepPurple } from '../../styles/styles';


const Information = ({ route }) => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [gender, setGender] = useState('Nam');
    const [fullname, setFullname] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const { password, phoneNumber, retryPassword, role } = route.params;
    const [modalVisible, setModalVisible] = useState(false);

    const [modalVisible1, setModalVisible1] = useState(false);

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible1(false);

    const selectGender = (newGender) => {
        setGender(newGender);
        closeModal();
    };

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

        try {
            const response = await BASE_API.post('/users/register', payload);
            console.log('Response Data:', response.data); 
            if (response.status === 200) {
                setModalVisible(true);
            } else {
                Alert.alert("Thông báo", response.data.message || "Đăng ký không thành công");
            }
        } catch (error) {
            if (error.response) {
                console.log('Error data:', error.response.data);
                Alert.alert("Lỗi Đăng ký", error.response.data.message || "Có lỗi xảy ra");
            } else if (error.request) {
                Alert.alert("Lỗi Kết nối", "Không nhận được phản hồi từ server");
            } else {
                Alert.alert("Lỗi Đăng ký", error.message);
            }
        }
    };
    
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
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
                            color: colors.black
                        }}>
                            Thông tin cá nhân
                        </Text>
                    </View>

                    <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                        <Text style={{ fontSize: 12, color: colors.black, marginBottom: 8, fontWeight: '900' }}>
                            Họ và tên
                        </Text>
                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: colors.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}>
                            <TextInput
                                placeholder='Học và tên'
                                placeholderTextColor={colors.black}
                                value={fullname}
                                onChangeText={setFullname}
                                style={{
                                    width: "100%"
                                }}
                            />
                        </View>
                    </View>

                    <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                        <Text style={{ fontSize: 12, color: colors.black, marginBottom: 8, fontWeight: '900' }}>Ngày Sinh</Text>
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            height: 48,
                            borderColor: colors.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingLeft: 22,
                            paddingRight: 10
                        }}>
                            <Text>{date.toLocaleDateString()}</Text>
                            <TouchableOpacity onPress={() => setShow(true)}>
                                <Ionicons name="calendar" size={24} color={colors.black} />
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
                        <Text style={{ fontSize: 12, color: colors.black, marginBottom: 8, fontWeight: '900' }}>
                            Giới tính
                        </Text>
                        <TouchableOpacity
                            style={{
                                width: "20%",
                                height: 48,
                                borderColor: colors.black,
                                borderWidth: 1,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => setModalVisible1(true)} // Opens the modal on press
                        >
                            <Text style={{ color: colors.black }}>{gender}</Text>
                        </TouchableOpacity>
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible1}
                        onRequestClose={() => {
                            setModalVisible1(!modalVisible1);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText}>Chọn giới tính</Text>
                                <Pressable
                                    style={[styles.button, { backgroundColor: gender === 'Nam' ? deepPurple : colors.white }]}
                                    onPress={() => selectGender('Nam')}
                                >
                                    <Text style={[styles.textStyle, { color: gender === 'Nam' ? 'white' : 'black' }]}>Nam</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, { backgroundColor: gender === 'Nữ' ? deepPurple : colors.white }]}
                                    onPress={() => selectGender('Nữ')}
                                >
                                    <Text style={[styles.textStyle, { color: gender === 'Nữ' ? 'white' : 'black' }]}>Nữ</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>

                    <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                        <Text style={{ fontSize: 12, color: colors.black, marginBottom: 8, fontWeight: '900' }}>
                            Địa chỉ Email
                        </Text>
                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: colors.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}>
                            <TextInput
                                placeholder='Địa chỉ Email'
                                placeholderTextColor={colors.black}
                                value={email}
                                onChangeText={setEmail}
                                style={{
                                    width: "100%"
                                }}
                            />
                        </View>
                    </View>

                    <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                        <Text style={{ fontSize: 12, color: colors.black, marginBottom: 8, fontWeight: '900' }}>
                            Số điện thoại
                        </Text>
                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: colors.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}>
                            <TextInput
                                placeholder='Số điện thoại'
                                placeholderTextColor={colors.black}
                                value={phoneNumber}
                                editable={false}
                                style={{
                                    width: "100%"
                                }}
                            />
                        </View>
                    </View>

                    <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                        <Text style={{ fontSize: 12, color: colors.black, marginBottom: 8, fontWeight: '900' }}>
                            Địa chỉ
                        </Text>
                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: colors.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}>
                            <TextInput
                                placeholder='Địa chỉ'
                                placeholderTextColor={colors.black}
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
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText}>Đăng ký thành công</Text>
                                <Pressable
                                    style={styles.button}
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                        RootNavigation.navigate('Login');
                                    }}
                                >
                                    <Text style={styles.textStyle}>OK</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    // ... (các styles khác của bạn)

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // This creates the dim effect
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalContent: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 10,
        padding: 12,
        elevation: 2,
        marginBottom: 10,
        backgroundColor: deepPurple,
        width: 80,
        
    },
    textStyle: {

        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
export default Information;