import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import COLORS from '../constants/colors';
import Button from '../components/Button';
import RootNavigation from '../route/RootNavigation';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Certification = ({ route, navigation }) => {

    const { certificationData, addNewCertification, updateCertification, certificationIndex } = route.params;

    const [name, setName] = useState(certificationData?.name ?? '');
    const [description, setDescription] = useState(certificationData?.description ?? '');
    const [startDate, setStartDate] = useState(certificationData?.startDate ?? '');

    const [showStartDatePicker, setShowStartDatePicker] = useState(false);


    const handleStartDateConfirm = (selectedDate) => {
        setShowStartDatePicker(false);
        const formattedDate = selectedDate.getMonth() + 1 + '/' + selectedDate.getFullYear();
        setStartDate(formattedDate);
    };


    const handleSave = () => {

        if (!name.trim() || !description.trim() || !startDate.trim()) {
            alert('Please fill in all required fields.'); // Bạn có thể sử dụng Alert từ 'react-native' để hiển thị thông báo
            return; // Dừng hàm nếu có trường nào đó bỏ trống
        }
        const newCertification = {
            name: name.trim(),
            description: description.trim(), // Không bắt buộc nhưng vẫn nên trim()
            startDate,
        };

        // Check if we are updating an existing experience or adding a new one
        if (typeof certificationIndex === 'number') {
            updateCertification(newCertification, certificationIndex);
        } else {
            addNewCertification(newCertification);
        }

        navigation.goBack();
    };

    const handleBack = () => {
        navigation.goBack();
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
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
                        color: COLORS.black
                    }}>
                        {typeof certificationIndex === 'number' ? 'Change Certification' : 'Add Certification'}
                    </Text>
                </View>


                <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                    <Text style={{ fontSize: 12, color: COLORS.black, marginBottom: 8, fontWeight: '900' }}>Tên bằng, chứng chỉ</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <Text style={{ fontSize: 12, color: COLORS.black, marginBottom: 8, fontWeight: '900' }}>Bắt đầu</Text>
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

                </View>
                <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                    <Text style={{ fontSize: 12, color: COLORS.black, marginBottom: 8, fontWeight: '900' }}>Mô tả</Text>
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
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.black,
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
        borderColor: COLORS.black,
    },
});

export default Certification;
