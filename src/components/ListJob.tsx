import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, Image, FlatList, TextInput, SafeAreaView, Platform, View, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-ui-lib'
import { EvilIcons, AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';

enum ChosenScreen {
    HOME = 0,
    MESSENGER = 1,
    NOTIFICATIONS = 2,
    SETTING = 3
}

const ListJob = () => {
    const [selectedButton, setSelectedButton] = useState<ChosenScreen>(ChosenScreen.HOME);
    const [showAll, setShowAll] = useState(false);

    const handleButtonPress = (index) => {
        setSelectedButton(index);
    };

    const data = [
        { key: '1', title: 'Google', position: 'Lead Product Manager' },
        { key: '2', title: 'Item 2', position: 'Lead Product Manager' },
        { key: '3', title: 'Item 3', position: 'Lead Product Manager' },
        { key: '4', title: 'Item 4', position: 'Lead Product Manager' },
        { key: '5', title: 'Item 5', position: 'Lead Product Manager' },
        { key: '6', title: 'Item 6', position: 'Lead Product Manager' },
        { key: '7', title: 'Item 6', position: 'Lead Product Manager' },
        { key: '8', title: 'Item 6', position: 'Lead Product Manager' },
        { key: '9', title: 'Item 6', position: 'Lead Product Manager' },
        { key: '10', title: 'Item 6', position: 'Lead Product Manager' },
    ];

    const renderItem1 = ({ item }) => {
        return (
            <TouchableOpacity style={styles.item1}>
                <View style={{ marginHorizontal: 10, marginVertical: 15 }}>
                    <Image source={require('../../assets/google.png')} style={{ width: 40, height: 40 }}></Image>
                    <Text style={{ color: 'gray' }}>{item.title}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 15 }}>{item.position}</Text>
                    <View style={{ marginTop: 5, flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold', marginRight: 8 }}>$2500/m</Text>
                        <Text style={{ color: 'gray' }}>Toronto, Canada</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderItem2 = ({ item }) => {
        return (
            <TouchableOpacity style={styles.item2}>
                <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                    <View style={{ marginHorizontal: 20 }}>
                        <Image source={require('../../assets/facebook.png')} style={{ width: 50, height: 50 }}></Image>
                    </View>
                    <View style={{ justifyContent: 'center', width: '55%' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>UI/UX Designer</Text>
                        <Text style={{ color: 'gray' }}>Full time</Text>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ color: 'gray' }}>$4500/m</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'flex-end', marginVertical: '2%' }}>
                <ImageBackground 
                    source={require('../../assets/kitty.png')} 
                    resizeMode='cover'
                    style={{
                        width: 40,
                        aspectRatio: 1, 
                        borderRadius: 60, 
                        marginRight: '5%',  
                        backgroundColor: '#ccc',
                        overflow: 'hidden'
                    }}>
                </ImageBackground>
            </View>  
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

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: 10 }}>Popular Job</Text>
                <TouchableOpacity onPress={() => setShowAll(!showAll)}>
                    <Text style={{ color: 'gray', marginRight: 10 }}>Show all</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 15 }}>
                <FlatList
                    data={showAll ? data : data.slice(0, 2)}
                    renderItem={renderItem1}
                    keyExtractor={(item) => item.key}
                    horizontal={true}
                    style={{ margin: 10 }}
                />
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: 10 }}>Recent Post</Text>
                <TouchableOpacity onPress={() => setShowAll(!showAll)}>
                    <Text style={{ color: 'gray', marginRight: 10 }}>Show all</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={showAll ? data : data.slice(0, 4)}
                renderItem={renderItem2}
                keyExtractor={(item) => item.key}
            />

            <View style={styles.navbar}>
                <TouchableOpacity
                    style={[styles.navbarItem, selectedButton === ChosenScreen.HOME && styles.selectedButton]}
                    onPress={() => handleButtonPress(ChosenScreen.HOME)}
                >
                    <Ionicons name="home" size={24} color={selectedButton == ChosenScreen.HOME ? "#03DAC6" : "black"} />
                    {selectedButton == ChosenScreen.HOME ?
                        <View style={styles.indicator} />
                        : <Text style={styles.navbarItemText}>Home</Text>}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.navbarItem, selectedButton === ChosenScreen.MESSENGER && styles.selectedButton]}
                    onPress={() => handleButtonPress(ChosenScreen.MESSENGER)}
                >
                    <View style={{ alignItems: 'center' }}>
                        <Ionicons name="chatbubble-ellipses" size={24} color={selectedButton == ChosenScreen.MESSENGER ? "#03DAC6" : "black"} />
                        {selectedButton == ChosenScreen.MESSENGER ?
                            <View style={styles.indicator} />
                            : <Text style={styles.navbarItemText}>Messenger</Text>}
                    </View>

                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.navbarItem, selectedButton === ChosenScreen.NOTIFICATIONS && styles.selectedButton]}
                    onPress={() => handleButtonPress(2)}
                >
                    <View style={{ alignItems: 'center' }}>
                        <MaterialIcons name="notifications" size={24} color={selectedButton == ChosenScreen.NOTIFICATIONS ? "#03DAC6" : "black"} />
                        {selectedButton == ChosenScreen.NOTIFICATIONS ?
                            <View style={styles.indicator} />
                            : <Text style={styles.navbarItemText}>Notification</Text>}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.navbarItem, selectedButton === 3 && styles.selectedButton]}
                    onPress={() => handleButtonPress(3)}
                >
                    <View style={{ alignItems: 'center' }}>
                        <Ionicons name="settings" size={24} color={selectedButton == ChosenScreen.SETTING ? "#03DAC6" : "black"} />
                        {selectedButton == ChosenScreen.SETTING ?
                            <View style={styles.indicator} />
                            : <Text style={styles.navbarItemText}>Setting</Text>}
                    </View>
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

    inputContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        height: 50,
        width: '100%',
        backgroundColor: 'red',

    },

    item1: {
        width: 280,
        height: 150,
        backgroundColor: 'white',
        margin: 10,
        // justifyContent: 'center',
        // alignItems: 'center',
        borderRadius: 20,
        shadowColor: 'black',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.1,
        elevation: 6,
    },

    item2: {
        width: '90%',
        height: 100,
        backgroundColor: 'white',
        margin: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        shadowColor: 'black',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.1,
        elevation: 6,
    },

    navbar: {
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        // right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 60,
        borderTopWidth: 0,
        borderTopColor: '#ccc',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: -10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 10,
        overflow: 'hidden',
    },
    navbarItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navbarItemText: {
        fontSize: 10,
    },
    selectedButton: {
        position: 'relative',
    },
    indicator: {
        width: 6,
        height: 6,
        backgroundColor: '#03DAC6',
        borderRadius: 10,
        marginTop: 4
        // borderTopLeftRadius: 6,
        // borderTopRightRadius: 6,
        // transform: [{ scaleY: 2 }]
    },
});

export default ListJob