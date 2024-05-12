import { StyleSheet, View, Text, Modal, Pressable, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from '@/theme';
import { Ionicons } from "@expo/vector-icons";
import Button from '../../components/Button';
import RootNavigation from '../../route/RootNavigation'
import Input from '../../components/Input';
import { BASE_API } from '../../services/BaseApi';
import Toast from 'react-native-toast-message';
import { RootReducer } from '@/redux/store/reducer';
import { useSelector } from 'react-redux';

const UpdatePassword = () => {
    const { userId, phoneNumber } = useSelector((state: RootReducer) => state.authReducer);
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [isPasswordShown1, setIsPasswordShown1] = useState(true);
    const [isPasswordShown2, setIsPasswordShown2] = useState(true);

    const [password, setPassword] = useState('');
    const [passwordNew, setPasswordNew] = useState('');
    const [retryPassword, setRetryPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    const handleSave = async () => {
        try {

            if (!password || !passwordNew || !retryPassword) {
                Alert.alert("Vui lòng điền đầy đủ thông tin.");
                return;
            }
            if (passwordNew !== retryPassword) {
                Alert.alert("Mật khẩu nhập lại không khớp.");
                return;
            }
            setModalVisible(false);

            const response = await BASE_API.put("users/updatePassword", {
                phoneNumber: phoneNumber,
                oldPassword: password,
                newPassword: passwordNew,
            });
            const data = response.data;
            Toast.show({
                type: 'success',
                props: {
                    title: 'Lưu thành công',
                },
            });
        } catch (error) {
            if (error.response) {
                Alert.alert("Lỗi thay đổi mật khẩu", error.response.data || "Có lỗi xảy ra");
            }
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };
    const handleModal = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
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
                            Thay đổi mật khẩu
                        </Text>
                    </View>


                    <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                        <Text style={{ fontSize: 16, color: colors.black, fontWeight: 'bold', marginBottom: 8 }}>
                            Mật khẩu cũ
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

                    <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                        <Text style={{ fontSize: 16, color: colors.black, fontWeight: 'bold', marginBottom: 8 }}>
                            Mật khẩu mới
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
                            <Input placeholder="Password" value={passwordNew} onChangeText={setPasswordNew} secureTextEntry={isPasswordShown1} />
                            <TouchableOpacity
                                onPress={() => setIsPasswordShown1(!isPasswordShown1)}
                                style={{ position: 'absolute', right: 12 }}
                            >
                                {isPasswordShown1 ? (
                                    <Ionicons name="eye-off" size={24} color={colors.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={colors.black} />
                                )}
                            </TouchableOpacity>
                        </View>


                    </View>

                    <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                        <Text style={{ fontSize: 16, color: colors.black, fontWeight: 'bold', marginBottom: 8 }}>
                            Xác nhận lại
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
                            <Input placeholder="Password" value={retryPassword} onChangeText={setRetryPassword} secureTextEntry={isPasswordShown2} />
                            <TouchableOpacity
                                onPress={() => setIsPasswordShown2(!isPasswordShown2)}
                                style={{ position: 'absolute', right: 12 }}
                            >
                                {isPasswordShown2 ? (
                                    <Ionicons name="eye-off" size={24} color={colors.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={colors.black} />
                                )}
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={styles.saveButtonContainer}>
                        <TouchableOpacity style={styles.saveButton} onPress={handleModal}>
                            <Text style={styles.saveButtonText}>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer1}>
                            <View style={styles.modalContent1}>
                                <Text style={styles.modalText}>
                                    Bạn có chắc chắn muốn lưu?
                                </Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.yesButton} onPress={handleSave}>
                                        <Text style={styles.buttonText}>Có</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                                        <Text style={styles.buttonText}>Không</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    profileContainer: {
        position: 'absolute',
        top: 20,
        left: 15,
    },
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    header: {
        // backgroundColor: 'red',
        paddingVertical: '16%',
    },
    nameRoleContainer: {
        position: 'absolute',
        top: 40,
        left: 150
    },
    profileImage: {
        marginLeft: '6%',
        width: 80,
        height: 80,
        borderRadius: 60,
        top: 10
    },
    cameraIcon: {
        backgroundColor: 'grey',
        borderRadius: 30,
        padding: 10,
        position: 'absolute',
        left: 65,
        top: 55,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    role: {
        fontSize: 16,
        color: '#FF9228',
    },
    input: {
        width: "100%",
        height: 48,
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: "center",
        paddingLeft: 22
    },
    inputText: {
        width: "100%",
    },
    label: {
        fontSize: 13,
        color: colors.black,
        marginBottom: 8,
        fontWeight: '900'
    },
    saveButton: {
        backgroundColor: '#130160',
        borderRadius: 10,
        padding: 10,
        height: 52,
        width: 200,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    saveButtonContainer: {
        alignItems: 'center',
    },
    modalContainer1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent1: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
    },
    yesButton: {
        backgroundColor: '#130160',
        borderRadius: 10,
        padding: 15,
        width: 90,
        margin: 5,
    },
    cancelButton: {
        backgroundColor: '#D6CDFE',
        borderRadius: 10,
        padding: 15,
        width: 90,
        margin: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default UpdatePassword;
