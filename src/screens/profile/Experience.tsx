import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from '@/theme';
import Button from '../../components/Button';
import RootNavigation from '../../route/RootNavigation';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Experience = (props: any) => {
    const {route} = props;
    const { experienceData, addNewExperience, updateExperience, experienceIndex } = route.params;

    const [jobTitle, setJobTitle] = useState(experienceData?.jobTitle ?? '');
    const [company, setCompany] = useState(experienceData?.company ?? '');
    const [description, setDescription] = useState(experienceData?.description ?? '');
    const [startDate, setStartDate] = useState(experienceData?.startDate ?? '');
    const [endDate, setEndDate] = useState(experienceData?.endDate ?? '');

    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);


    const handleStartDateConfirm = (selectedDate: Date) => {
        setShowStartDatePicker(false);
        // Lấy tháng và năm từ selectedDate
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
        console.log('experienceData', experienceData);
    }, []);
    const handleSave = () => {

        if (!jobTitle.trim() || !company.trim() || !startDate.trim() || !endDate.trim()) {
            alert('Please fill in all required fields.'); // Bạn có thể sử dụng Alert từ 'react-native' để hiển thị thông báo
            return; // Dừng hàm nếu có trường nào đó bỏ trống
        }
        const newExperience = {
            jobTitle: jobTitle.trim(),
            company: company.trim(),
            description: description.trim(), // Không bắt buộc nhưng vẫn nên trim()
            startDate,
            endDate,
        };

        // Check if we are updating an existing experience or adding a new one
        if (typeof experienceIndex === 'number') {
            updateExperience(newExperience, experienceIndex);
        } else {
            addNewExperience(newExperience);
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
                        {typeof experienceIndex === 'number' ? 'Change work experience' : 'Add work experience'}
                    </Text>
                </View>


                <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                    <Text style={{ fontSize: 12, color: colors.black, marginBottom: 8, fontWeight: '900' }}>Vị trí</Text>
                    <TextInput
                        style={styles.input}
                        value={jobTitle}
                        onChangeText={setJobTitle}
                    />
                </View>

                <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                    <Text style={{ fontSize: 12, color: colors.black, marginBottom: 8, fontWeight: '900' }}>Tên công ty</Text>
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
                        <Text style={{ fontSize: 12, color: colors.black, marginBottom: 8, fontWeight: '900' }}>Kết thức</Text>
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
