import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { AntDesign, Entypo, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';
import RootNavigation from '../route/RootNavigation';
import Container from '../components/Container';
import { deepPurple } from '../styles/styles'
import BACKGROUND from '../assets/images/background.jpg'

const AddCompany = () => {

    const [image, setImage] = useState(null);
    const [experienceLists, setExperienceLists] = useState([]);

    const [isPickingDocument, setIsPickingDocument] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const { showActionSheetWithOptions } = useActionSheet();

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

    const showImagePickerOptions = () => {
        const options = ['Chụp ảnh', 'Chọn ảnh từ thư viện', 'Hủy bỏ'];
        const cancelButtonIndex = 2;
        console.log('ssss');
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

    const addNewExperience = (newExperience) => {
        setExperienceLists([...experienceLists, newExperience]);
    };
    const deleteExperience = (index) => {
        const updatedList = [...experienceLists];
        updatedList.splice(index, 1);
        setExperienceLists(updatedList);
    };
    const editExperience = (experience, index) => {
        RootNavigation.navigate('Company', {
            experienceData: experience,
            experienceIndex: index,
            updateExperience: (updatedExperience, index) => {
                const updatedList = [...experienceLists];
                updatedList[index] = updatedExperience;
                setExperienceLists(updatedList);
            }
        });
    };


    const experienceScreen = () => {
        RootNavigation.navigate('Company', { addNewExperience: addNewExperience });
    };

    return (
        <Container statusBarColor={deepPurple} statusBarContentColor='light'>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.container}>
                    <Image source={BACKGROUND} style={{ height: '20%', width: '100%', position: 'absolute', top: 0 }}></Image>
                    <View style={styles.header}>
                        <View style={{ paddingTop: 10 }}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.profileImage} />
                            ) : (
                                <MaterialCommunityIcons name="account-circle" size={90} color="black" style={{ marginLeft: 15 }} />
                            )}
                        </View>
                        <View style={styles.cameraIcon}>
                            <TouchableOpacity onPress={showImagePickerOptions}>
                                <FontAwesome5 name="camera" size={15} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.nameRoleContainer}>
                            <Text style={styles.name}>Nguyễn Quân</Text>
                            <Text style={styles.role}>Business</Text>
                        </View>
                    </View>
                    <ScrollView>
                        <View style={styles.sectionContainer}>

                            <View style={styles.section}>
                                <View style={styles.iconWithText}>
                                    <MaterialCommunityIcons name="office-building-marker" size={28} color="#FF9228" />
                                    <Text style={styles.sectionText}>Company</Text>
                                    <View style={styles.editButtonContainer}>
                                        <TouchableOpacity style={styles.addButton} onPress={experienceScreen}>
                                            <AntDesign name="plus" size={24} color="#FF9228" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View>
                                    {experienceLists.length > 0 && (
                                        <>
                                            <View style={styles.separator}></View>
                                            {experienceLists.map((experience, index) => (
                                                <View key={index} style={styles.experienceItem}>
                                                    <View style={styles.experienceInfo}>
                                                        <Text style={styles.experienceText}>{experience.jobTitle}</Text>
                                                        <Text>{experience.company}</Text>
                                                        <Text>{experience.description}</Text>

                                                    </View>

                                                    <View style={styles.buttonsContainer1}>
                                                        <TouchableOpacity
                                                            style={styles.addButton}
                                                            onPress={() => editExperience(experience, index)}
                                                        >
                                                            <AntDesign name="edit" size={24} color="#FF9228" />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={styles.addButton} // Bạn nên thay đổi này thành styles.deleteButton nếu đã tạo
                                                            onPress={() => deleteExperience(index)}
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
                    </ScrollView>
                </View>
            </SafeAreaView >
        </Container >

    );
}

const styles = StyleSheet.create({


    seeMoreText: {
        color: '#130160',
        fontWeight: 'bold',
        marginTop: 10,
        alignSelf: 'center', // Đảm bảo nút "See more" được căn giữa
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // Đặt thêm styles cho container chứa buttons nếu cần
    },
    buttonsContainer1: {
        // Đổi từ 'row' sang 'column' để sắp xếp các thành phần theo chiều dọc thay vì chiều ngang
        flexDirection: 'column',
        justifyContent: 'center', // Căn giữa các nút theo chiều dọc
        alignItems: 'center', // Căn giữa các nút theo chiều ngang
        padding: 10, // Thêm padding nếu cần
        // marginLeft: '89%'
    },
    experienceItem: {
        flexDirection: 'row', // Sắp xếp các thành phần theo chiều ngang
        justifyContent: 'space-between', // Phân tách thông tin và các nút chỉnh sửa/xóa
        alignItems: 'center', // Căn giữa các thành phần theo chiều dọc
        padding: 10, // Thêm padding xung quanh để tạo khoảng cách
        backgroundColor: 'white', // Nền trắng cho mỗi mục kinh nghiệm
        marginBottom: 10, // Khoảng cách giữa các mục
        borderRadius: 5, // Bo tròn góc nếu cần
        // shadowColor: '#000', // Màu bóng
        // shadowOffset: { width: 0, height: 1 }, // Offset cho bóng
        // shadowOpacity: 0.22, // Độ mờ của bóng
        // shadowRadius: 2.22, // Bán kính bóng
        elevation: 3, // Độ cao của phần tử (cho Android)
    },
    experienceItem1: {
        flexDirection: 'row', // Sắp xếp các thành phần theo chiều ngang
        // justifyContent: 'space-between', // Phân tách thông tin và các nút chỉnh sửa/xóa
        alignItems: 'center', // Căn giữa các thành phần theo chiều dọc
        padding: 10, // Thêm padding xung quanh để tạo khoảng cách
        backgroundColor: 'white', // Nền trắng cho mỗi mục kinh nghiệm
        marginBottom: 10, // Khoảng cách giữa các mục
        borderRadius: 5, // Bo tròn góc nếu cần
        elevation: 3, // Độ cao của phần tử (cho Android)
    },
    experienceInfo: {
        flex: 1, // Cho phép nó chiếm đa phần không gian trong hàng
        marginRight: 10, // Khoảng cách giữa thông tin và các nút
    },

    experienceText: {
        fontSize: 18, // Đặt kích thước font
        fontWeight: '900', // Đặt font đậm
        color: 'black', // Màu chữ
        marginVertical: 2, // Khoảng cách giữa các dòng
    },

    editButton: {
        padding: 8,
        backgroundColor: 'blue',
        borderRadius: 4,
        margin: 4
    },
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    header: {
        paddingTop: 50,
        height: '20%',
        // backgroundColor: '#6c5ce7',
    },
    nameRoleContainer: {
        alignItems: 'center',
        marginTop: -60,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 60,
        marginLeft: 20
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 20,
        right: 280,
        backgroundColor: 'grey',
        borderRadius: 30,
        padding: 10,
        alignItems: 'center'
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    role: {
        fontSize: 16,
        color: 'red',
        margin: 10
    },
    sectionContainer: {
        margin: 20,
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
    addButton: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        elevation: 3,
        marginBottom: 10, // Tạo khoảng cách giữa các nút

    },
    editButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

export default AddCompany;
