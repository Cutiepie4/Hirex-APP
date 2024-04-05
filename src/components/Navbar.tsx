import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome, AntDesign, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import RootNavigation from "../config/RootNavigation";
import { useSelector } from 'react-redux';
import { RootReducer } from '../redux/store/reducer';

enum ChosenScreen {
    HOME = 0,
    PROFILE = 1,
    ADD = 2,
    SUGGEST = 3,
    SAVE = 4,
}

const heightScreen = Dimensions.get('window').height;

const Navbar = () => {
    const [selectedButtonNav, setSelectedButtonNav] = useState<ChosenScreen>(ChosenScreen.HOME);
    const role = useSelector((state: RootReducer) => state.authReducer.role);


    const handleButtonPress = (index: any) => {
        setSelectedButtonNav(index);

        if (index === ChosenScreen.HOME) {
            RootNavigation.navigate('HomeScreen')
        }
        if (index === ChosenScreen.PROFILE) {
            if (role === 'user') {
                RootNavigation.navigate('Profile')
            } else {
                RootNavigation.navigate('AddCompany');
            }
        }
        if (index === ChosenScreen.SAVE) {
            RootNavigation.navigate('Setting')
        }
    };

    return (
        <View style={styles.navbar}>
            <TouchableOpacity
                style={[styles.navbarItem, selectedButtonNav === ChosenScreen.HOME && styles.selectedButton2]}
                onPress={() => handleButtonPress(ChosenScreen.HOME)}
            >
                <SimpleLineIcons name="home" size={26} color={selectedButtonNav == ChosenScreen.HOME ? "#0D0140" : "#003B40"} />
                {selectedButtonNav == ChosenScreen.HOME ?
                    <View style={styles.indicator} />
                    : <Text style={styles.navbarItemText}>Trang chủ</Text>}
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.navbarItem, selectedButtonNav === ChosenScreen.PROFILE && styles.selectedButton2]}
                onPress={() => handleButtonPress(ChosenScreen.PROFILE)}
            >
                <View style={{ alignItems: 'center' }}>
                    <AntDesign name="idcard" size={26} color={selectedButtonNav == ChosenScreen.PROFILE ? "#0D0140" : "#003B40"} />
                    {selectedButtonNav == ChosenScreen.PROFILE ?
                        <View style={styles.indicator} />
                        : <Text style={styles.navbarItemText}>Hồ sơ</Text>}
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.navbarItem]}
                onPress={() => handleButtonPress(2)}
            >
                <View style={{ alignItems: 'center', backgroundColor: '#130160', padding: 10, borderRadius: 50 }}>
                    <Ionicons name="add-sharp" size={26} color="#ffffff" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.navbarItem, selectedButtonNav === ChosenScreen.SUGGEST && styles.selectedButton2]}
                onPress={() => handleButtonPress(3)}
            >
                <View style={{ alignItems: 'center' }}>
                    <Ionicons name="chatbox-outline" size={26} color={selectedButtonNav == ChosenScreen.SUGGEST ? "#0D0140" : "#003B40"} />
                    {selectedButtonNav == ChosenScreen.SUGGEST ?
                        <View style={styles.indicator} />
                        : <Text style={styles.navbarItemText}>Tin nhắn</Text>}
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.navbarItem, selectedButtonNav === 3 && styles.selectedButton2]}
                onPress={() => handleButtonPress(4)}
            >
                <View style={{ alignItems: 'center' }}>
                    <FontAwesome name="user-o" size={26} color={selectedButtonNav == ChosenScreen.SAVE ? "#0D0140" : "#003B40"} />
                    {selectedButtonNav == ChosenScreen.SAVE ?
                        <View style={styles.indicator} />
                        : <Text style={styles.navbarItemText}>Tài khoản</Text>}
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: heightScreen / 14,
        borderTopWidth: 0,
        borderTopColor: '#ccc',
        // shadowColor: 'black',
        // shadowOffset: {
        //     width: 0,
        //     height: -20,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 20,
        // elevation: 10,
    },

    navbarItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    navbarItemText: {
        fontSize: 10,
        color: '#003B40'
    },

    selectedButton2: {
        position: 'relative',
    },

    indicator: {
        width: 6,
        height: 6,
        backgroundColor: '#0D0140',
        borderRadius: 10,
        marginTop: 4,
    },
})

export default Navbar