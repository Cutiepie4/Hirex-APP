import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from '@/theme';
import Button from '../../components/Button';
import RootNavigation from '../../route/RootNavigation';

const Company = ({ route, navigation }) => {

    const { companyData, addNewExperience, updateExperience, experienceIndex } = route.params;

    const [name, setName] = useState(companyData?.name ?? '');
    const [shortName, setSortName] = useState(companyData?.shortName ?? '');
    const [description, setDescription] = useState(companyData?.description ?? '');
    const [startDate, setStartDate] = useState(companyData?.startDate ?? '');
    const [endDate, setEndDate] = useState(companyData?.endDate ?? '');

    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);


    const handleStartDateConfirm = (selectedDate) => {
        setShowStartDatePicker(false);
        const formattedDate = selectedDate.getMonth() + 1 + '/' + selectedDate.getFullYear();
        setStartDate(formattedDate);
    };

    const handleEndDateConfirm = (selectedDate) => {
        setShowEndDatePicker(false);
        const formattedDate = selectedDate.getMonth() + 1 + '/' + selectedDate.getFullYear();
        setEndDate(formattedDate);
    };

    useEffect(() => {
    }, []);
    const handleSave = () => {

        if (!name.trim() || !shortName.trim()) {
            alert('Please fill in all required fields.'); 
            return; 
        }
        const newExperience = {
            name: name.trim(),
            shortName: shortName.trim(),
            description: description.trim(), 
            startDate,
            endDate,
        };
        if (typeof experienceIndex === 'number') {
            updateExperience(newExperience, experienceIndex);
        } else {
            addNewExperience(newExperience);
        }

        navigation.goBack();
    };

    const handleBack = () => {
        navigation.goBack();
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <ScrollView>
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
                            {typeof experienceIndex === 'number' ? 'Thay đổi công ty' : 'Thêm công ty'}
                        </Text>
                    </View>

                    <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                        <Text style={{ fontSize: 12, color: colors.black, marginBottom: 8, fontWeight: '900' }}>Tên ngắn</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                        <Text style={{ fontSize: 12, color: colors.black, marginBottom: 8, fontWeight: '900' }}>Tên công ty</Text>
                        <TextInput
                            style={styles.input}
                            value={shortName}
                            onChangeText={setSortName}
                        />
                    </View>

                    <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                        <Text style={{ fontSize: 12, color: colors.black, marginBottom: 8, fontWeight: '900' }}>Quy mô công ty</Text>
                        <TextInput
                            style={styles.input}
                        // value={jobTitle}
                        // onChangeText={setJobTitle}
                        />
                    </View>
                    <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                        <Text style={{ fontSize: 12, color: colors.black, marginBottom: 8, fontWeight: '900' }}>Địa điểm</Text>
                        <TextInput
                            style={styles.input}
                        // value={jobTitle}
                        // onChangeText={setJobTitle}
                        />
                    </View>

                    <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                        <Text style={{ fontSize: 12, color: colors.black, marginBottom: 8, fontWeight: '900' }}>Ngành nghề</Text>
                        <TextInput
                            style={styles.input}
                        // value={jobTitle}
                        // onChangeText={setJobTitle}
                        />
                    </View>

                    <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                        <Text style={{ fontSize: 12, color: colors.black, marginBottom: 8, fontWeight: '900' }}>Website</Text>
                        <TextInput
                            style={styles.input}
                        // value={jobTitle}
                        // onChangeText={setJobTitle}
                        />
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
            </ScrollView>
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

export default Company;
