import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { AntDesign, Entypo, MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';
import RootNavigation from '../route/RootNavigation';
import Container from '../components/Container';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import Navbar from '../components/Navbar';
import BACKGROUND from '../assets/images/background.jpg';

const Profile = () => {

    const [aboutMe, setAboutMe] = useState('');
    const [image, setImage] = useState(null);
    const [experienceLists, setExperienceLists] = useState([]);
    const [educationLists, setEducationLists] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [showAllSkills, setShowAllSkills] = useState(false);
    const [certificationLists, setCertificationLists] = useState([]);
    const [isPickingDocument, setIsPickingDocument] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const { showActionSheetWithOptions } = useActionSheet();

    const handleSeeMore = () => {
        setShowAllSkills(!showAllSkills);
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
    const saveFile = async () => {
        if (selectedFile) {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission required to save files');
                return;
            }

            const fileUri = FileSystem.cacheDirectory + selectedFile.name;

            try {
                await FileSystem.copyAsync({
                    from: selectedFile.uri,
                    to: fileUri
                });

                const asset = await MediaLibrary.createAssetAsync(fileUri);
                await MediaLibrary.createAlbumAsync('Download', asset, false);
                alert('File saved successfully!');
            } catch (error) {
                console.error('Error saving the file', error);
                alert('An error occurred while saving the file.');
            }
        }
    };
    const pickDocument = async () => {
        if (isPickingDocument) {
            return;
        }
        setIsPickingDocument(true);

        try {
            let result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
            });
            console.log(result);
            if (!result.canceled && result.assets && result.assets.length > 0) {
                setSelectedFile(result.assets[0]);
            }

        } catch (error) {
            console.error("Document picking error:", error);
        } finally {
            setIsPickingDocument(false);
        }
    };
    const formatFileSize = (sizeInBytes) => {
        return (sizeInBytes / 1024).toFixed(0) + ' KB';
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
        // Thêm newExperience vào cuối mảng của các trải nghiệm làm việc
        setExperienceLists([...experienceLists, newExperience]);
    };
    const deleteExperience = (index) => {
        const updatedList = [...experienceLists];
        updatedList.splice(index, 1);
        setExperienceLists(updatedList);
    };
    const editExperience = (experience, index) => {
        RootNavigation.navigate('Experience', {
            experienceData: experience,
            experienceIndex: index,
            updateExperience: (updatedExperience, index) => {
                const updatedList = [...experienceLists];
                updatedList[index] = updatedExperience;
                setExperienceLists(updatedList);
            }
        });
    };

    const addNewEducation = (newEducation) => {
        // Thêm newEducation vào cuối mảng của các trải nghiệm làm việc
        setEducationLists([...educationLists, newEducation]);
    };
    const deleteEducation = (index) => {
        const updatedList = [...educationLists];
        updatedList.splice(index, 1);
        setEducationLists(updatedList);
    };
    const editEducation = (education, index) => {
        RootNavigation.navigate('Education', {
            educationData: education,
            educationIndex: index,
            updateEducation: (updateEducation, index) => {
                const updatedList = [...educationLists];
                updatedList[index] = updateEducation;
                setEducationLists(updatedList);
            }
        });
    };

    const addNewCertification = (newCertification) => {
        setCertificationLists([...certificationLists, newCertification]);
    };
    const deleteCertification = (index) => {
        const updatedList = [...certificationLists];
        updatedList.splice(index, 1);
        setCertificationLists(updatedList);
    };
    const editCertification = (certification, index) => {
        RootNavigation.navigate('Certification', {
            certificationData: certification,
            certificationIndex: index,
            updateCertification: (updateCertification, index) => {
                const updatedList = [...certificationLists];
                updatedList[index] = updateCertification;
                setCertificationLists(updatedList);
            }
        });
    };

    const experienceScreen = () => {
        RootNavigation.navigate('Experience', { addNewExperience: addNewExperience });
    };
    const aboutScreen = () => {
        RootNavigation.navigate('AboutMeScreen', { saveAboutMe: setAboutMe, aboutMe });
    };

    const educationScreen = () => {
        RootNavigation.navigate('Education', { addNewEducation: addNewEducation });
    };

    const skillScreen = () => {
        RootNavigation.navigate('Skill', {
            selectedSkills: selectedSkills,
            updateSelectedSkills: setSelectedSkills
        });
    };

    const certificationScreen = () => {
        RootNavigation.navigate('Certification', { addNewCertification: addNewCertification });
    };

    const renderAboutMeSection = () => {
        return (
            <View style={styles.section}>
                <View style={styles.iconWithText}>
                    <AntDesign name="user" size={24} color="#FF9228" />
                    <Text style={styles.sectionText}>About me</Text>
                    {aboutMe ? (
                        <View style={styles.editButtonContainer}>
                            <TouchableOpacity style={styles.addButton} onPress={aboutScreen}>
                                <AntDesign name="edit" size={24} color="orange" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity style={[styles.addButton, { marginLeft: 'auto' }]} onPress={aboutScreen}>
                            <AntDesign name="plus" size={24} color="orange" />
                        </TouchableOpacity>
                    )}
                </View>
                {aboutMe ? (
                    <>
                        <View style={styles.separator}></View>
                        <Text style={styles.aboutMeText}>{aboutMe}</Text>
                    </>
                ) : null}
            </View>
        );
    };

    const renderExperienceSection = () => {
        return (
            <View style={styles.section}>
                <View style={styles.iconWithText}>
                    <Entypo name="briefcase" size={24} color="orange" />
                    <Text style={styles.sectionText}>Work experience</Text>
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
                                        <Text>{experience.startDate} - {experience.endDate}</Text>
                                    </View>
                                    <View style={styles.buttonsContainer1}>
                                        <TouchableOpacity
                                            style={styles.addButton}
                                            onPress={() => editExperience(experience, index)}
                                        >
                                            <AntDesign name="edit" size={24} color="#FF9228" />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.addButton}
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
        );
    };

    const renderEducationSection = () => {
        return (
            <View style={styles.section}>
                <View style={styles.iconWithText}>
                    <MaterialCommunityIcons name="book-education" size={24} color="orange" />
                    <Text style={styles.sectionText}>Education</Text>
                    <View style={styles.editButtonContainer}>
                        <TouchableOpacity style={styles.addButton} onPress={educationScreen}>
                            <AntDesign name="plus" size={24} color="orange" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    {educationLists.length > 0 && (
                        <>
                            <View style={styles.separator}></View>
                            {educationLists.map((education, index) => (
                                <View key={index} style={styles.experienceItem}>
                                    <View>
                                        <Text style={styles.experienceText}>{education.major}</Text>
                                        <Text>{education.institution}</Text>
                                        <Text>{education.startDate} - {education.endDate}</Text>
                                    </View>
                                    <View style={styles.buttonsContainer1}>
                                        <TouchableOpacity
                                            style={styles.addButton}
                                            onPress={() => editEducation(education, index)}
                                        >
                                            <AntDesign name="edit" size={24} color="#FF9228" />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.addButton}
                                            onPress={() => deleteEducation(index)}
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
        );
    };

    const renderSkillSection = () => {
        return (
            <View style={styles.section}>
                <View style={styles.iconWithText}>
                    <AntDesign name="staro" size={24} color="#FF9228" />
                    <Text style={styles.sectionText}>Skill</Text>
                    <View style={styles.editButtonContainer}>
                        <TouchableOpacity style={styles.addButton} onPress={skillScreen}>
                            <AntDesign name="plus" size={24} color="orange" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    {selectedSkills.length > 0 && (
                        <>
                            <View style={styles.separator}></View>
                            <View style={styles.skillsContainer}>
                                {selectedSkills.slice(0, showAllSkills ? selectedSkills.length : 5).map((skill, index) => (
                                    <View key={index} style={styles.skillItem}>
                                        <Text style={styles.skillText}>{skill}</Text>
                                    </View>
                                ))}
                                {selectedSkills.length > 5 && (
                                    <TouchableOpacity onPress={handleSeeMore}>
                                        <Text style={styles.seeMoreText}>{showAllSkills ? 'See less' : 'See more'}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </>
                    )}
                </View>
            </View>
        );
    };

    const renderCertificationSection = () => {
        return (
            <View style={styles.section}>
                <View style={styles.iconWithText}>
                    <MaterialCommunityIcons name="certificate-outline" size={24} color="#FF9228" />
                    <Text style={styles.sectionText}>Certification</Text>
                    <View style={styles.editButtonContainer}>
                        <TouchableOpacity style={styles.addButton} onPress={certificationScreen}>
                            <AntDesign name="plus" size={24} color="orange" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    {certificationLists.length > 0 && (
                        <>
                            <View style={styles.separator}></View>
                            {certificationLists.map((certification, index) => (
                                <View key={index} style={styles.experienceItem}>
                                    <View>
                                        <Text style={styles.experienceText}>{certification.name}</Text>
                                        <Text>{certification.description}</Text>
                                        <Text>{certification.startDate}</Text>
                                    </View>

                                    <View style={styles.buttonsContainer1}>
                                        <TouchableOpacity
                                            style={styles.addButton}
                                            onPress={() => editCertification(certification, index)}
                                        >
                                            <AntDesign name="edit" size={24} color="#FF9228" />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.addButton}
                                            onPress={() => deleteCertification(index)}
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
        );
    };

    const renderResumeSection = () => {
        return (
            <View style={styles.section}>
                <View style={styles.iconWithText}>
                    <MaterialCommunityIcons name="file-account" size={24} color="orange" />
                    <Text style={styles.sectionText}>Resume</Text>
                    <View style={styles.editButtonContainer}>
                        <TouchableOpacity style={styles.addButton} onPress={pickDocument}>
                            <AntDesign name="plus" size={24} color="orange" />
                        </TouchableOpacity>
                    </View>
                </View>
                {selectedFile && (
                    <>
                        <View style={styles.separator}></View>
                        <View style={styles.experienceItem}>
                            <MaterialIcons name="picture-as-pdf" size={40} color="red" />
                            <View >
                                <Text style={styles.sectionText}>{selectedFile.name}</Text>
                                <Text style={styles.sectionText}>{formatFileSize(selectedFile.size)}</Text>
                            </View>
                            <View style={styles.buttonsContainer1}>
                                <TouchableOpacity style={styles.addButton} onPress={saveFile}>
                                    <MaterialIcons name="save-alt" size={24} color="#FF9228" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.addButton} onPress={() => setSelectedFile(null)}>
                                    <AntDesign name="delete" size={24} color="#FF9228" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )}
            </View>
        );
    };

    return (
        <Container statusBarContentColor='light'>
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
                            <Text style={styles.role}>Applicant</Text>
                        </View>
                    </View>
                    <ScrollView>
                        <View style={{
                            margin: 20,
                        }}>
                            {renderAboutMeSection()}
                            {renderExperienceSection()}
                            {renderEducationSection()}
                            {renderSkillSection()}
                            {renderCertificationSection()}
                            {renderResumeSection()}
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView >
        </Container >

    );
}

const styles = StyleSheet.create({

    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'center',
        // alignItems: 'center',
        marginVertical: 15,
    },
    skillItem: {
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 3,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e1e4e8',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '40%', // Điều chỉnh này giúp không quá 3 kỹ năng trên một hàng
    },
    skillText: {
        color: '#130160',
        fontWeight: 'bold',
        textAlign: 'center', // Đảm bảo văn bản được căn giữa trong kỹ năng
    },
    seeMoreText: {
        color: '#130160',
        fontWeight: 'bold',
        marginTop: 10,
        alignSelf: 'center', // Đảm bảo nút "See more" được căn giữa
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
        marginBottom: 10, // Tạo khoảng cách giữa các nút

    },
    editButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

export default Profile;
