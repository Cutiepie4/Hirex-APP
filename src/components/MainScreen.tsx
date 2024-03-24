import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Image, Text, TouchableOpacity, StyleSheet, Platform, Dimensions, Button } from 'react-native';
import { FontAwesome6, FontAwesome } from '@expo/vector-icons';
import BoxJob from './constaints/BoxJob';
import Navbar from './constaints/Navbar';

const { height: heightScreen } = Dimensions.get('window');

const MainScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.title}>
                <View style={styles.indexTextHeader}>
                    <Text style={styles.textHeader}>Xin chào</Text>
                    <Text style={styles.textHeader}>Orlando Diggs.</Text>
                </View>
                <View>
                    <Image source={require('../../assets/avata2.png')} style={{ width: 50, height: 50 }}></Image>
                </View>
            </View>
            <View>
                <View style={styles.joinNow}>
                    <View>
                        <Text style={styles.textJoinNow}>50% off</Text>
                        <Text style={styles.textJoinNow}>take any courses</Text>
                        <TouchableOpacity style={styles.buttonJoinNow}>
                            <Text style={[styles.textJoinNow]}>
                                Join Now
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Image source={require('../../assets/people.png')} style={styles.imagePeople}></Image>
            </View>
            <ScrollView style={{height: heightScreen/1.8}}>
                <View>
                    <Text style={styles.textFindJob}>Find Your Job</Text>
                    <View style={styles.boxFindJob}>
                        <View style={styles.boxRemoteJob}>
                            <Image source={require('../../assets/headhunting.png')} style={{ width: '40%', height: '20%', marginBottom: 10 }} resizeMode='contain'></Image>
                            <Text style={styles.textBoxFindJob}> 44.5K</Text>
                            <Text> Remote Job</Text>
                        </View>

                        <View style={styles.boxOffJob}>
                            <View style={styles.boxFullTimeJob}>
                                <Text style={styles.textBoxFindJob}>66.8K</Text>
                                <Text>Full Time</Text>
                            </View>
                            <View style={styles.boxPtJob}>
                                <Text style={styles.textBoxFindJob}>38.9K</Text>
                                <Text>Part Time</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Text style={styles.textFindJob}>Rencent Job List</Text>
                {[...Array(3)].map((_, index) => (
                    <BoxJob></BoxJob>
                ))}
            </ScrollView>
            <Navbar></Navbar>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? 45 : 0,
        paddingHorizontal: 10,
        backgroundColor: '#F5F5F5',
        marginHorizontal: 10,
        paddingBottom: heightScreen / 15
    },

    title: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    heightScreens: {
        height: heightScreen + heightScreen / 18
    },

    indexTextHeader: {
        marginTop: heightScreen / 30
    },

    textHeader: {
        fontSize: 24,
        fontWeight: '500',
        color: '#0D0140',
    },

    joinNow: {
        marginTop: 30,
        height: heightScreen / 4.5,
        backgroundColor: '#130160',
        borderRadius: 8,
        justifyContent: 'center'
    },

    imagePeople: {
        width: '60%',
        height: '100%',
        position: 'absolute',
        right: 0,
        bottom: 0,
    },

    textJoinNow: {
        fontSize: 18,
        color: '#FFFFFF',
        marginHorizontal: 20,
    },

    buttonJoinNow: {
        backgroundColor: '#FF9228',
        width: '29%',
        marginTop: heightScreen / 35,
        marginLeft: heightScreen / 40,
        paddingVertical: 5,
        borderRadius: 6
    },

    textFindJob: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: heightScreen / 40,
        marginBottom: heightScreen / 30
    },

    boxFindJob: {
        width: '100%',
        height: heightScreen / 4,
        flexDirection: 'row'
    },

    boxRemoteJob: {
        width: '45%',
        height: '100%',
        backgroundColor: '#AFECFE',
        borderRadius: 6,
        marginRight: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    boxOffJob: {
        width: '50%',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    boxFullTimeJob: {
        width: '98%',
        height: '45%',
        backgroundColor: '#BEAFFE',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },

    boxPtJob: {
        width: '98%',
        height: '45%',
        backgroundColor: '#FFD6AD',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textBoxFindJob: {
        fontSize: 16,
        fontWeight: '600',
    }
})

export default MainScreen