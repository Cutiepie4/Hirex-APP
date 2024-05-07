import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from '@/theme';
import Button from '../../components/Button';
import RootNavigation from '../../route/RootNavigation';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { BASE_API } from '../../services/BaseApi';

const Experience = (props: any) => {
    const { route } = props;
    const { experienceData, addNewExperience, updateExperience, experienceIndex, idEmployee } = route.params;

    const [jobTitle, setJobTitle] = useState(experienceData?.jobTitle ?? '');
    const [company, setCompany] = useState(experienceData?.company ?? '');
    const [description, setDescription] = useState(experienceData?.description ?? '');
    const [startDate, setStartDate] = useState(experienceData?.startDate ?? '');
    const [endDate, setEndDate] = useState(experienceData?.endDate ?? '');

    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);


    const handleStartDateConfirm = (selectedDate: Date) => {
        setShowStartDatePicker(false);
        const formattedDate = selectedDate.getMonth() + 1 + '/' + selectedDate.getFullYear();
        setStartDate(formattedDate);
    };

    const handleEndDateConfirm = (selectedDate) => {
        setShowEndDatePicker(false);
        // Lấy tháng và năm từ selectedDate
        const formattedDate = selectedDate.getMonth() + 1 + '/' + selectedDate.getFullYear();
        setEndDate(formattedDate);
    };

    useEffect(() => {
    }, []);


    const handleSave = async () => {

        if (!jobTitle.trim() || !company.trim()) {
            alert('Hãy nhập đầy đủ các thông tin bắt buộc');
            return;
        }
        const newExperience = {
            jobTitle: jobTitle.trim(),
            company: company.trim(),
            description: description.trim(),
            startDate,
            endDate,
            employeeId: idEmployee
        };
        if (typeof experienceIndex === 'number') {
            updateExperience(newExperience, experienceIndex);
        } else {
            try {
                const response = await BASE_API.post(`/experiences/create`, newExperience);
                console.log(response.data);
            } catch (error) {
            }
        }

        RootNavigation.pop();
    };

    const handleBack = () => {
        RootNavigation.pop();
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <TouchableOpacity onPress={handleBack}>
                        <Ionicons name="arrow-back" size={24} color="black" style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        textAlign: 'center',
                        color: colors.black
                    }}>
                        {typeof experienceIndex === 'number' ? 'Chỉnh sửa kinh nghiệm' : 'Thêm kinh nghiệm'}
                    </Text>
                </View>


                <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                    <Text style={{ fontSize: 12, color: colors.black, marginBottom: 8, fontWeight: '900' }}>Vị trí <Text style={{ color: 'red' }}>(*)</Text></Text>
                    <TextInput
                        style={styles.input}
                        value={jobTitle}
                        onChangeText={setJobTitle}
                    />
                </View>

                <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                    <Text style={{ fontSize: 12, color: colors.black, marginBottom: 8, fontWeight: '900' }}>Tên công ty </Text>
                    <TextInput
                        style={styles.input}
                        value={company}
                        onChangeText={setCompany}
                    />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <Text style={{ fontSize: 12, color: colors.black, marginBottom: 8, fontWeight: '900' }}>Bắt đầu</Text>
                        <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
                            <TextInput
                                style={styles.input}
                                value={startDate.toString()}
                                editable={false}
                            />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={showStartDatePicker}
                            mode="date"
                            onConfirm={handleStartDateConfirm}
                            onCancel={() => setShowStartDatePicker(false)}
                        />
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={{ fontSize: 12, color: colors.black, marginBottom: 8, fontWeight: '900' }}>Kết thúc</Text>
                        <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
                            <TextInput
                                style={styles.input}
                                value={endDate.toString()}
                                editable={false}
                            />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={showEndDatePicker}
                            mode="date"
                            onConfirm={handleEndDateConfirm}
                            onCancel={() => setShowEndDatePicker(false)}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                    <Text style={{ fontSize: 12, color: colors.black, marginBottom: 8, fontWeight: '900' }}>Mô tả</Text>
                    <TextInput
                        style={styles.input1}
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />
                </View>

                <Button
                    title="Lưu"
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

const styles = StyleSheet.create({
    input: {
        height: 48,
        padding: 10,
        marginBottom: 12,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 8,
        color: 'black'
    },
    input1: {
        height: 150,
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: colors.black,
    },
});

export default Experience;
