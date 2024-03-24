import React, { useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Platform, TouchableOpacity, Text, View, ScrollView, Modal } from 'react-native';
import { Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import CustomModal from "./constaints/CustomModal";
const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

const AddJob = () => {
    const list = ['Vị trí công việc', 'Loại hình làm việc', 'Địa chỉ', 'Công ty', 'Loại việc làm', 'Mô tả', 'Chính sách lao động']

    const renderIcon = (job: any) => {
        switch (job) {
            case 'Loại hình làm việc':
                return textTypeWork !== null ? <FontAwesome5 name="pencil-alt" size={24} color="black" /> : <MaterialIcons name="add" size={24} color="#FF9228" />;
            case 'Loại việc làm':
                return textTimeWork !== null ? <FontAwesome5 name="pencil-alt" size={24} color="black" /> : <MaterialIcons name="add" size={24} color="#FF9228" />;
            case 'Mô tả':
            case 'Vị trí công việc':
            case 'Địa chỉ':
            case 'Công ty':
            case 'Chính sách lao động':
                return <MaterialIcons name="add" size={24} color="#FF9228" />;
            default:
                return null;
        }
    };

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [chosenCheckBox, setChosenCheckBox] = useState(-1);
    const [textTypeWork, setTextTypeWork] = useState(null)

    const handleButtonTypeWorkplace = (index: number) => {
        setSelectedIndex(index === selectedIndex ? -1 : index);
    }

    const typeWork = [
        {
            index: 1,
            title: 'On-Site',
            describe: 'Nhân viên đến làm việc'
        },

        {
            index: 2,
            title: 'Hybrid',
            describe: 'Làm việc trực tiếp tại chỗ hoặc ngoài cơ sở'
        },

        {
            index: 3,
            title: 'Remote',
            describe: 'Làm việc từ xa'
        },
    ]


    const handleCheckBoxTypeWorkplace = (index: number) => {
        setChosenCheckBox(index === chosenCheckBox ? -1 : index);
        setTextTypeWork(typeWork.find(item => item.index === index));
        setSelectedIndex(-1);
    }


    const timeWork = [
        {
            index: 1,
            title: 'Full Time',
        },

        {
            index: 2,
            title: 'Part Time',
        },
    ]

    const [chosenTimeCheckBox, setTimeChosenCheckBox] = useState(-1);
    const [textTimeWork, setTextTimeWork] = useState(null)

    const handleCheckBoxTimeWorkplace = (index: any) => {
        setTimeChosenCheckBox(index === chosenTimeCheckBox ? -1 : index);
        setTextTimeWork(timeWork.find(item => item.index === index));
        setSelectedIndex(-1)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{ rowGap: 20 }}>
                    <TouchableOpacity>
                        <Feather name="x" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.textTitle}>Thêm công việc</Text>
                    <View style={styles.content}>
                        {list.map((job, index) => (
                            <View style={styles.boxJob} key={index}>
                                <View style={{ rowGap: 5 }}>
                                    <Text style={styles.text}>{job}</Text>
                                    {index === 1 && textTypeWork != null && (
                                        <Text style={{ color: '#524B6B', fontSize: 12 }}>{textTypeWork.title}</Text>
                                    )}

                                    {index === 4 && textTimeWork != null && (
                                        <Text style={{ color: '#524B6B', fontSize: 12 }}>{textTimeWork.title}</Text>
                                    )}
                                </View>
                                <TouchableOpacity style={styles.circle} onPress={() => handleButtonTypeWorkplace(index)}>
                                    {renderIcon(job)}
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                    {/* <Button title="CREATE" color="#130160" onPress={handleButton} style={{width: '50%', paddingVertical: 20, alignSelf: 'center'}} filled={true}></Button> */}
                    <TouchableOpacity style={styles.buttonCreate} >
                        <Text style={styles.textButtonCreate}>Xác nhận</Text>
                    </TouchableOpacity>

                    <CustomModal
                        visible={selectedIndex === 1}
                        onClose={() => setSelectedIndex(-1)}
                        list={typeWork}
                        chosenCheckBox={chosenCheckBox}
                        handleCheckBoxIndex={handleCheckBoxTypeWorkplace}
                    />

                    <CustomModal
                        visible={selectedIndex === 4}
                        onClose={() => setSelectedIndex(-1)}
                        list={timeWork}
                        chosenCheckBox={chosenTimeCheckBox}
                        handleCheckBoxIndex={handleCheckBoxTimeWorkplace}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? 45 : 0,
        marginHorizontal: 16,
        // paddingBottom: 10s
    },

    boxJob: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: heightScreen / 10,
        width: '100%',
        backgroundColor: '#FFFFFF',
        alignItems: "center",
        paddingHorizontal: 15,
        borderRadius: 15
    },

    content: {
        rowGap: 20,
    },

    circle: {
        backgroundColor: '#FFD6AD',
        borderRadius: 50
    },

    text: {
        fontSize: 16,
        fontWeight: '500',
        color: '#150B3D'
    },

    textTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#150B3D'
    },

    buttonCreate: {
        alignSelf: 'center',
        backgroundColor: '#130160',
        paddingVertical: 15,
        paddingHorizontal: 80,
        marginBottom: 10,
        borderRadius: 10
    },

    textButtonCreate: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600'
    },

    blurLine: {
        height: 5,
        width: '10%',
        backgroundColor: '#9B9B9B',
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: heightScreen / 35
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalContent: {
        backgroundColor: '#ffffff',
        width: '100%',
        padding: 5,
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        paddingBottom: 10
    },

    closeText: {
        alignSelf: 'flex-end',
        color: '#333333',
        fontSize: 16,
    },
})

export default AddJob