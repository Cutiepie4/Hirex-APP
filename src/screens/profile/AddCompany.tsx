import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Image, ScrollView, Dimensions, Alert, Modal } from 'react-native';
import { AntDesign, Entypo, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';
import RootNavigation from '../../route/RootNavigation';
import Container from '../../components/Container';
import { deepPurple } from '../../styles/styles'
import BACKGROUND from '../../assets/images/background.jpg';
import { colors } from '@/theme';
import { BASE_API } from '../../services/BaseApi';
import { useSelector } from 'react-redux';
import { RootReducer } from '@/redux/store/reducer';
const { height, width } = Dimensions.get('window');

const AddCompany = () => {

    const { userId, phoneNumber } = useSelector((state: RootReducer) => state.authReducer)
    const [image, setImage] = useState(null);
    const [companyLists, setCompanyLists] = useState([]);
    const [user, setUser] = useState(null)
    const [name, setName] = useState(null);
    const [idEmployer, setIdEmployer] = useState('');
    const [modalVisible, setModalVisible] = useState(false);  // New state for modal visibility

    const { showActionSheetWithOptions } = useActionSheet();

    const getEmployer = async () => {
        try {
            const response = await BASE_API.get(`/employer/${userId}`);

            setCompanyLists(response.data.companies || [])
            setUser(response.data.user)
            setName(response.data.user?.fullName)

            setIdEmployer(response.data.id)


            const imageData = response.data.user?.imageBase64;

            if (imageData) {
                const uri = `data:image;base64,${imageData}`;
                setImage(uri);
            }
        } catch (error) {
            console.error('Failed to fetch employee:', error);
        } finally {
        }
    };

    useFocusEffect(
        useCallback(() => {
            getEmployer();
            return () => {
            };
        }, [userId])
    );

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

    const uploadImageAndSaveData = async (phoneNumber) => {
        let imageResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 0.2,
        });

        if (!imageResult.canceled) {
            setImage(imageResult.assets[0].uri);
            try {
                const uri = imageResult.assets[0].uri;
                const uriParts = uri.split('.');
                const fileType = uriParts[uriParts.length - 1];

                const formData = new FormData();
                formData.append('image', {
                    uri: uri,
                    name: `photo.${fileType}`,
                    type: `image/${fileType}`
                });
                formData.append('phoneNumber', phoneNumber);

                const uploadResponse = await BASE_API.post('/users/uploadImage', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (uploadResponse.status === 200) {
                    console.log('Upload thành công, message:', uploadResponse.data);
                } else {
                    throw new Error('Upload không thành công: ' + uploadResponse.data);
                }
            } catch (error) {
                console.error('Lỗi khi upload ảnh: ', error);
            }
        }
    };

    const showImagePickerOptions = () => {
        const options = ['Chọn ảnh từ thư viện', 'Hủy bỏ'];
        const cancelButtonIndex = 2;
        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            buttonIndex => {
                switch (buttonIndex) {
                    case 0:
                        uploadImageAndSaveData(phoneNumber);
                        break;
                    default:
                        break; // Cancel action
                }
            }
        );
    };

    const addNewCompany = (newCompany) => {
        setCompanyLists([...companyLists, newCompany]);
    };

    const deleteCompany = (index) => {
        // Hiển thị cửa sổ xác nhận trước khi xóa
        Alert.alert(
            "Xác nhận xóa",
            "Bạn có chắc chắn muốn xóa ?",
            [
                {
                    text: "Hủy",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Xác nhận",
                    onPress: () => confirmDeletedeleteCompany(index)
                }
            ],
            { cancelable: false }
        );
    };

    const confirmDeletedeleteCompany = async (id) => {
        try {
            const response = await BASE_API.delete(`/companies/${id}`);
        } catch (error) {
        }
        const updatedList = companyLists.filter(education => education.id !== id);
        setCompanyLists(updatedList);
    };

    const editCompany = (company, index) => {
        RootNavigation.navigate('Company', {
            companyData: company,
            companyIndex: index,
            idEmployer: idEmployer,
            updateCompany: (updatedCompany, index) => {
                const updatedList = [...companyLists];
                updatedList[index] = updatedCompany;
                setCompanyLists(updatedList);
            }
        });
    };
    const toggleModal = () => {
        setModalVisible(!modalVisible);  // Function to toggle the modal's visibility
    };
    const companyScreen = () => {
        RootNavigation.navigate('Company', {
            addNewCompany: addNewCompany,
            idEmployer: idEmployer

        });
    };

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={BACKGROUND} style={{ height: height / 5, width: '100%', position: 'absolute', top: 0 }}></Image>
                    <View style={styles.profileContainer}>
                        {image ? (
                            <TouchableOpacity onPress={toggleModal}>
                                <Image source={{ uri: image }} style={styles.profileImage} />
                            </TouchableOpacity>
                        ) : (
                            <MaterialCommunityIcons name="account-circle" size={100} color="black" style={{ marginLeft: '5%', position: 'absolute' }} />
                        )}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={toggleModal}  // Handles hardware back button on Android
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Image source={{ uri: image }} style={styles.fullSizeImage} />
                                    <TouchableOpacity
                                        style={styles.buttonClose}
                                        onPress={toggleModal}
                                    >
                                        <Text style={styles.textStyle}>Thoát</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <TouchableOpacity style={styles.cameraIcon} onPress={showImagePickerOptions}>
                        <FontAwesome5 name="camera" size={15} color="white" />
                    </TouchableOpacity>
                    <View style={styles.nameRoleContainer}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.role}>Người tuyển dụng</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ margin: 20, top: 30 }}>
                        <View style={styles.sectionContainer}>
                            <View style={styles.section}>
                                <View style={styles.iconWithText}>
                                    <MaterialCommunityIcons name="office-building-marker" size={28} color="#FF9228" />
                                    <Text style={styles.sectionText}>Company</Text>
                                    <View style={styles.editButtonContainer}>
                                        <TouchableOpacity style={styles.addButton} onPress={companyScreen}>
                                            <AntDesign name="plus" size={24} color="#FF9228" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View>
                                    {companyLists.length > 0 && (
                                        <>
                                            <View style={styles.separator}></View>
                                            {companyLists.map((company, index) => (
                                                <View key={index} style={styles.experienceItem}>
                                                    <View style={styles.experienceInfo}>
                                                        <Text style={styles.experienceText}>{company.name}</Text>
                                                        <Text>{company.industry}</Text>
                                                        <Text>{company.description}</Text>
                                                    </View>

                                                    <View style={styles.buttonsContainer1}>
                                                        <TouchableOpacity
                                                            style={styles.addButton}
                                                            onPress={() => editCompany(company, company.id)}
                                                        >
                                                            <AntDesign name="edit" size={24} color="#FF9228" />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={styles.addButton}
                                                            onPress={() => deleteCompany(company.id)}
                                                        >
                                                            <AntDesign name="delete" size={24} color="#FF9228" />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            ))}
                                        </>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </View>
        </SafeAreaView >

    );
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    fullSizeImage: {
        width: 300,  // Set this according to your needs
        height: 300,  // Set this according to your needs
        resizeMode: 'contain'
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 15
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    profileContainer: {
        position: 'absolute',
        top: 50,
        left: 15,
    },
    buttonsContainer1: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
    },
    experienceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.grey_light,
        marginBottom: 10,
        borderRadius: 5,
        elevation: 3,
    },
    skillItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.grey_light,
        height: 90,
        marginBottom: 10,
        borderRadius: 5,
        elevation: 3,
    },
    experienceInfo: {
        flex: 1,
        marginRight: 10,
    },
    experienceText: {
        fontSize: 18,
        fontWeight: '900',
        color: 'black',
        marginVertical: 2,
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
        top: 70,
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
        left: 80,
        top: 105,
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
    section: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    iconWithText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionText: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
    separator: {
        height: 1,
        backgroundColor: '#e1e4e8',
        marginVertical: 10,
    },
    aboutMeText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'left',
        lineHeight: 24,
    },
    addButton: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        elevation: 3,
        marginBottom: 10,

    },
    editButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

export default AddCompany;
