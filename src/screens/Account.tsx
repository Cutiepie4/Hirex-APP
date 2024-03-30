import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Platform } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';
import RootNavigation from '../config/RootNavigation';
import Container from '../components/Container';
import { deepPurple } from '../styles/styles'
import COLORS from '../constants/colors';
import { SafeAreaView } from "react-native-safe-area-context";
import Button from '../components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import BACKGROUND from '../assets/images/background.jpg'

const Account = ({ route }) => {
    
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [gender, setGender] = useState('female');
    const [image, setImage] = useState(null);
    const { showActionSheetWithOptions } = useActionSheet();
    const [isEditing, setIsEditing] = useState(true);
    // Mock user data - replace with actual data retrieval logic
    useEffect(() => {
        const mockData = {
            fullName: 'Nguyễn Phúc Quân',
            birthDate: new Date('2002-04-19'),
            gender: 'male',
            email: 'quan@example.com',
            phoneNumber: '0123456789',
            address: '123 Đường Lý Thường Kiệt, Quận 10, TP.HCM',
        };

        if (mockData.fullName) { // Check if there is any data to indicate an existing user
            setUserData(mockData);
            setDate(new Date(mockData.birthDate)); // Update the date state for the date picker
            setGender(mockData.gender); // Update the gender state
            // setIsEditing(false); // Switch to view mode
        }
    }, []);

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };
    const [userData, setUserData] = useState({
        fullName: '',
        birthDate: new Date(),
        gender: 'male',
        email: '',
        phoneNumber: '',
        address: '',
    });

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('You have refused to allow this app to access your camera!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    const handleSave = () => {
        RootNavigation.navigate('ChooseRole');
    };

    const showImagePickerOptions = () => {
        const options = ['Chụp ảnh', 'Chọn ảnh từ thư viện', 'Hủy bỏ'];
        const cancelButtonIndex = 2;
        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            buttonIndex => {
                switch (buttonIndex) {
                    case 0:
                        takePhoto();
                        break;
                    case 1:
                        pickImage();
                        break;
                    default:
                        break; // Cancel action
                }
            }
        );
    };

    return (
        <Container statusBarColor={deepPurple} statusBarContentColor='light'>
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image source={BACKGROUND} style={{ height: 140, width: '100%', position: 'absolute', top: 0 }}></Image>
                        <View style={styles.profileContainer}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.profileImage} />
                            ) : (
                                <MaterialCommunityIcons name="account-circle" size={90} color="black" style={{ marginLeft: 15 }} />
                            )}
                        </View>
                        <TouchableOpacity style={styles.cameraIcon} onPress={showImagePickerOptions}>
                            <FontAwesome5 name="camera" size={15} color="white" />
                        </TouchableOpacity>
                        <View style={styles.nameRoleContainer}>
                            <Text style={styles.name}>Nguyễn Quân</Text>
                            <Text style={styles.role}>Applicant</Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 10, paddingTop: 20 }}>
                        <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                            <Text style={{ fontSize: 13, color: COLORS.black, marginBottom: 8, fontWeight: '900' }}>
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
                                    value={userData.fullName}
                                    onChangeText={(text) => setUserData({ ...userData, fullName: text })}
                                    placeholder='Họ và tên'
                                    editable={!isEditing}
                                    placeholderTextColor={COLORS.black}
                                    style={{
                                        width: "100%"
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                            <Text style={{ fontSize: 13, color: COLORS.black, marginBottom: 8, fontWeight: '900' }}>Ngày Sinh</Text>
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
                                <TouchableOpacity onPress={() => setShow(true)} disabled={isEditing}>
                                    <Ionicons name="calendar" size={24} color={COLORS.black} />
                                </TouchableOpacity>
                            </View>
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    //   mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                        </View>
                        <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                            <Text style={{ fontSize: 13, color: COLORS.black, marginBottom: 8, fontWeight: '900' }}> Giới tính </Text>
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
                                        marginRight: 15,
                                        opacity: !isEditing ? 1 : 0.5 // Làm mờ nút khi không ở chế độ chỉnh sửa

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
                                    <Text>Name</Text>
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
                                        marginRight: 15,
                                        opacity: !isEditing ? 1 : 0.5 // Làm mờ nút khi không ở chế độ chỉnh sửa
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
                            <Text style={{ fontSize: 13, color: COLORS.black, marginBottom: 8, fontWeight: '900' }}>
                                Email
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
                                    value={userData.email}
                                    onChangeText={(text) => setUserData({ ...userData, email: text })}
                                    placeholder='Email'
                                    editable={!isEditing}
                                    placeholderTextColor={COLORS.black}
                                    style={{ width: "100%" }}
                                />
                            </View>
                        </View>
                        <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                            <Text style={{ fontSize: 13, color: COLORS.black, marginBottom: 8, fontWeight: '900' }}>
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
                                    value={userData.phoneNumber}
                                    onChangeText={(text) => setUserData({ ...userData, phoneNumber: text })}
                                    placeholder='Số điện thoại'
                                    editable={!isEditing}
                                    placeholderTextColor={COLORS.black}
                                    style={{ width: "100%" }}
                                />
                            </View>
                        </View>
                        <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                            <Text style={{ fontSize: 13, color: COLORS.black, marginBottom: 8, fontWeight: '900' }}>
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
                                    value={userData.address}
                                    onChangeText={(text) => setUserData({ ...userData, address: text })}
                                    placeholder='Địa chỉ'
                                    editable={!isEditing}
                                    placeholderTextColor={COLORS.black}
                                    style={{ width: "100%" }}
                                />
                            </View>
                        </View>

                        <Button
                            title={isEditing ? "Edit" : "Save"}
                            filled
                            onPress={() => {
                                if (isEditing) {
                                    // Implement update logic here
                                } else {
                                    // Implement save logic here
                                }
                                toggleEditing()
                            }}
                            style={{
                                marginTop: 18,
                                marginBottom: 4,
                                height: 52,
                                width: 250,
                                alignSelf: 'center'
                            }}
                        />

                    </View>
                </View>
            </SafeAreaView>
        </Container >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red'
    },
    header: {

        // flexDirection: 'row',
        // justifyContent: 'flex-start', // Align items to the start of the container
        // alignItems: 'center', // Center items vertically
        // backgroundColor: '#6c5ce7',
        // paddingHorizontal: 50,
        paddingVertical: 25,
    },
    profileContainer: {
        // justifyContent: 'center',
        // alignItems: 'center',
        position: 'relative',
        top: 5,
    },
    cameraIcon: {
        backgroundColor: 'grey',
        borderRadius: 30,
        padding: 10,
        position: 'absolute', // Position the camera icon absolutely
        left: 75, // Adjust according to your needs
        top: 78, // Adjust based on the size of the profile image and header height
    },

    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 60,
    },
    nameRoleContainer: {
        alignItems: 'center',
        marginTop: -60,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    role: {
        fontSize: 16,
        color: 'black',
        // marginVertical: 10,
    },
    inputContainer: {
        marginTop: 30,
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    input: {
        width: '100%',
        height: 48,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 22,
        color: COLORS.black,
    },
});

export default Account;
