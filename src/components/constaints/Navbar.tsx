import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome, AntDesign, Ionicons, SimpleLineIcons } from '@expo/vector-icons';


enum ChosenScreen {
    HOME = 0,
    LIKE = 1,
    ADD = 2,
    SUGGEST = 3,
    SAVE = 4,

}

const heightScreen = Dimensions.get('window').height;

const Navbar = () => {
    const [selectedButtonNav, setSelectedButtonNav] = useState<ChosenScreen>(ChosenScreen.HOME);

    const handleButtonPress = (index: any) => {
        setSelectedButtonNav(index);
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
                style={[styles.navbarItem, selectedButtonNav === ChosenScreen.LIKE && styles.selectedButton2]}
                onPress={() => handleButtonPress(ChosenScreen.LIKE)}
            >
                <View style={{ alignItems: 'center' }}>
                    <AntDesign name="hearto" size={26} color={selectedButtonNav == ChosenScreen.LIKE ? "#0D0140" : "#003B40"} />
                    {selectedButtonNav == ChosenScreen.LIKE ?
                        <View style={styles.indicator} />
                        : <Text style={styles.navbarItemText}>Yêu thích</Text>}
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
                    <FontAwesome name="bookmark-o" size={26} color={selectedButtonNav == ChosenScreen.SAVE ? "#0D0140" : "#003B40"} />
                    {selectedButtonNav == ChosenScreen.SAVE ?
                        <View style={styles.indicator} />
                        : <Text style={styles.navbarItemText}>Lưu trữ</Text>}
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