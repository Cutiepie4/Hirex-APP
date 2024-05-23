import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native';
import { AntDesign, Entypo, MaterialCommunityIcons, FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import BACKGROUND from '../../assets/images/background.jpg';
import { BASE_API } from '../../services/BaseApi';
import { useSelector } from 'react-redux';
import { RootReducer } from '@/redux/store/reducer';
import { colors, fonts, sizes } from '@/theme';
import PDF from '@assets/images/PDF.png'
import { downloadAndOpenPDF } from '@/utils/utils';


const { height, width } = Dimensions.get('window');
const ProfileReadonly = ({ route }) => {
    let employeeId = route.params?.employeeId || null;
    let information = route.params?.information || null;
    const [employee, setEmployee] = useState(null)

    const getEmployee = async () => {
        await BASE_API.get(`/employees/${employeeId}`)
            .then(res => {
                setEmployee(res.data)
            });
    };

    useFocusEffect(
        useCallback(() => {
            getEmployee()
                .catch(err => {

                });
            return () => {
            };
        }, [])
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={BACKGROUND} style={{ height: height / 4.7, width: '100%', position: 'absolute', top: 0, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}></Image>
                    <View style={styles.profileContainer}>
                        {employee?.user?.imageBase64 ? (
                            <Image source={{ uri: `data:image;base64,${employee?.user?.imageBase64}` }} style={styles.profileImage} />
                        ) : (
                            <MaterialCommunityIcons name="account-circle" size={100} color="black" style={{ marginLeft: '5%', position: 'absolute' }} />
                        )}
                    </View>
                    <View style={styles.nameRoleContainer}>
                        <Text style={styles.name}>{employee?.user?.fullName || employee?.user?.phoneNumber}</Text>
                        <Text style={styles.role}>Người xin việc</Text>
                    </View>
                </View>

                <View style={{ marginTop: '20%', paddingLeft: 25, paddingRight: 25 }}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ height: 3 * height / 4 - 15 }}>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <AntDesign name="user" size={24} color="#FF9228" />
                                <Text style={[styles.desc_text_3, { color: colors.primary }]}> Giới thiệu</Text>
                            </View>
                            <View style={styles.separator} />
                            <Text style={styles.desc_text_4}>{employee?.about}</Text>
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Entypo name="briefcase" size={24} color="orange" />
                                <Text style={[styles.desc_text_3, { color: colors.primary }]}> Kinh nghiệm làm việc</Text>
                            </View>
                            <View style={styles.separator} />
                            {employee?.experiences?.map((experience, index) => {
                                return (
                                    <View key={index}>
                                        <Text style={styles.desc_text_3}>{experience.jobTitle}</Text>
                                        <Text>{experience.company}</Text>
                                        <Text>{experience.startDate} - {experience.endDate}</Text>
                                    </View>
                                )
                            })}
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="book-education" size={24} color="orange" />
                                <Text style={[styles.desc_text_3, { color: colors.primary }]}> Học vấn</Text>
                            </View>
                            <View style={styles.separator} />
                            {employee?.educations?.map((education, index) => {
                                return (
                                    <View key={index}>
                                        <Text style={styles.desc_text_3}>{education.major}</Text>
                                        <Text>{education.institution}</Text>
                                        <Text>{education.startDate} - {education.endDate}</Text>
                                    </View>
                                )
                            })}
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <AntDesign name="staro" size={24} color="#FF9228" />
                                <Text style={[styles.desc_text_3, { color: colors.primary }]}> Kỹ năng</Text>
                            </View>
                            <View style={styles.separator} />
                            {employee?.skills?.map((skill, index) => {
                                return (
                                    <View key={index}>
                                        <Text style={styles.desc_text_3}>{skill.name}</Text>
                                        <Text>
                                            {skill.note ? skill.note : 'Chưa có thông tin'}
                                        </Text>
                                    </View>
                                )
                            })}
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="certificate-outline" size={24} color="#FF9228" />
                                <Text style={[styles.desc_text_3, { color: colors.primary }]}> Chứng chỉ</Text>
                            </View>
                            <View style={styles.separator} />
                            {employee?.certification?.map((cert, index) => {
                                return (
                                    <View key={index}>
                                        <Text style={styles.desc_text_3}>{cert?.name}</Text>
                                        <Text>{cert?.description}</Text>
                                        <Text>{cert?.startDate}</Text>
                                    </View>
                                )
                            })}
                        </View>
                        {information &&
                            <View style={{ marginTop: 30 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <MaterialCommunityIcons name="file-account" size={24} color="orange" />
                                    <Text style={[styles.desc_text_3, { color: colors.primary }]}> Lý do xin việc</Text>
                                </View>
                                <View style={styles.separator} />
                                <Text style={styles.desc_text_4}>{information}</Text>
                            </View>
                        }
                        <View style={{ marginTop: 30 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="file-account" size={24} color="orange" />
                                <Text style={[styles.desc_text_3, { color: colors.primary }]}> CV</Text>
                            </View>
                            <View style={styles.separator} />
                            {employee?.resumes?.map((resume, index) => {
                                return (
                                    <View key={index} style={{ minHeight: 80, backgroundColor: colors.grey_light, borderRadius: 20 }}>
                                        <View style={{ margin: 20, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <Image source={PDF} style={{ width: 50, height: 50 }} />
                                            <View style={{ flex: 1 }}>
                                                <Text numberOfLines={1} style={[styles.desc_text_5]}>{resume?.nameFile}</Text>
                                                <Text style={styles.desc_text_6}>{`${resume?.filesize || '-'} kb`}</Text>
                                            </View>
                                            <Ionicons name="download-outline" size={26} onPress={() => downloadAndOpenPDF(resume?.fileBase64, 'application/pdf', resume?.nameFile) } />
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>

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
        backgroundColor: colors.background,
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
        marginBottom: 10, // Tạo khoảng cách giữa các nút

    },
    editButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    desc_text_3: {
        fontFamily: fonts.dMSans.bold,
        fontSize: sizes.h16
    },
    desc_text_4: {
        fontFamily: fonts.dMSans.regular,
        fontSize: sizes.h13,
        marginTop: 10
    },
    desc_text_5: {
        fontFamily: fonts.dMSans.regular,
        fontSize: sizes.h12,
        color: colors.primary

    },
    desc_text_6: {
        fontFamily: fonts.dMSans.regular,
        fontSize: sizes.h12,
        color: colors.nega

    },
});

export default ProfileReadonly;
