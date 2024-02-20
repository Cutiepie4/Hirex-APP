import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Platform, SafeAreaView } from 'react-native';
import { EvilIcons, AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';


const AllListJob = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginBottom: 10, flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', borderRadius: 10, alignSelf: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                    <EvilIcons name="search" size={24} color="lightgray" />
                    <TextInput
                        placeholder='Search here...'
                        style={{
                            width: '70%',
                            height: 40,
                            marginLeft: 5
                        }}
                    >
                    </TextInput>
                </View>
                <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: '#03DAC6', alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginLeft: 10 }}>
                    <AntDesign name="filter" size={20} color="#F5F5F5" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: '100%',
        height: '100%',
        paddingTop: Platform.OS === 'android' ? 45 : 0,
        backgroundColor: '#F5F5F5',
    },
})
export default AllListJob