import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Skill = ({ route, navigation }) => {
    const allSkills = ['Graphic Design', 'Graphic Thinking', 'UI/UX Design', 'Adobe Indesign', 'Web Design', 'InDesign', 'Canva Design', 'User Interface Design', 'Product Design', 'User Experience Design'];
    const [searchTerm, setSearchTerm] = useState('');
    const { selectedSkills, updateSelectedSkills } = route.params;
    const [localSelectedSkills, setLocalSelectedSkills] = useState(selectedSkills || []);

    useEffect(() => {
        if (selectedSkills) {
            setLocalSelectedSkills(selectedSkills);
        }
    }, [selectedSkills]);

    const addSkill = skill => {
        if (!localSelectedSkills.includes(skill)) {
            setLocalSelectedSkills([...localSelectedSkills, skill]);
        }
    };

    const removeSkill = skill => {
        setLocalSelectedSkills(localSelectedSkills.filter(s => s !== skill));
    };

    const handleSave = () => {
        if (updateSelectedSkills) { // Kiểm tra xem updateSelectedSkills có phải là một hàm không
            updateSelectedSkills(localSelectedSkills); // Cập nhật vào Profile
            navigation.goBack(); // Quay lại màn hình trước đó
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchSection}>
                <AntDesign name="search1" size={20} color="grey" />
                <TextInput
                    style={styles.input}
                    placeholder="Search skills"
                    onChangeText={setSearchTerm}
                    value={searchTerm}
                />
                {searchTerm ? <AntDesign name="close" size={20} color="grey" onPress={() => setSearchTerm('')} /> : null}
            </View>

            <View style={styles.selectedSkills}>
                {localSelectedSkills.map(skill => (
                    <View key={skill} style={styles.selectedSkill}>
                        <Text style={styles.skillText}>{skill}</Text>
                        <AntDesign name="closecircle" size={20} color="red" onPress={() => removeSkill(skill)} />
                    </View>
                ))}
            </View>
            <ScrollView style={styles.list}>
                {searchTerm ? (
                    allSkills.filter(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())).length > 0 ? (
                        allSkills.filter(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())).map(skill => (
                            <TouchableOpacity key={skill} style={styles.skill} onPress={() => addSkill(skill)}>
                                <Text>{skill}</Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text style={styles.noSkills}>Không tìm thấy kỹ năng</Text>
                    )
                ) : null}
            </ScrollView>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>SAVE</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noSkills: {
        textAlign: 'center',
        padding: 20,
      },
      
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        width: '90%',
        marginBottom: 20,
        borderWidth: 0.2,

    },
    input: {
        marginLeft: 10,
        flex: 1,
    },
    list: {
        width: '90%',
        maxHeight: '50%',
    },
    skill: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 5,
        borderRadius: 5,
    },
    selectedSkills: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 20,
    },
    selectedSkill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 20,
        padding: 10,
        margin: 5,
    },
    skillText: {
        marginRight: 10,
    },
    saveButton: {
        backgroundColor: '#130160',
        padding: 15,
        borderRadius: 10,
        width: '60%',
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Skill;
