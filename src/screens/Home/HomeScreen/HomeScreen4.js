import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import { colors, fonts, sizes } from "../../../constant";
import profile from '../../../assets/images/profile.png'
import woman from '../../../assets/images/woman2.png'
import Background from '../../../assets/images/Background.png'
import Card from '../../../utils/CardComponent/Card4'
import { useNavigation } from "@react-navigation/core";


const jobs = [1, 2, 3, 4, 5]

function Home({ navigation }) {
    const home = homeStyle
    React.useEffect(() => {

    }
        , [navigation]
    )
    return (
        <View style={{ flex: 1, flexDirection: 'column', }}>
            <View style={home.home_banner}>
                <View style={{ position: 'absolute', right: 25, marginTop: '5%' }}>
                    <View style={{ height: 45, width: 45, borderRadius: 50, position: 'relative' }}>
                        <Image style={{ height: 45, width: 45 }} source={profile} />
                    </View>
                </View>
            </View>
            <View style={home.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }}>
                    <View style={{ marginTop: 20 }}>
                        {jobs.map((item, i) => {
                            return (<View key={i} style={{ marginTop: 5, marginBottom: 5 }}>
                                <Card />
                            </View>)
                        })}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default Home;


const homeStyle = StyleSheet.create({
    container: {
        backgroundColor: colors.background_2,
        display: 'flex',
        position: 'relative',
        height: '80%',
        paddingLeft: 25,
        paddingRight: 25
    },
    home_text_1: {
        fontFamily: fonts.DmSans_Bold,
        fontSize: sizes.h22,
        color: colors.infi,
    },
    home_text_2: {
        fontFamily: fonts.DmSans_Regular,
        fontSize: sizes.h18,
        color: "white"
    },
    home_banner: {
        height: 160,
        backgroundColor: colors.primary,
        paddingLeft: 25,
        paddingRight: 25,
        marginTop: -20,
        // padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    home_banner_button: {
        height: 35,
        width: 120,
        backgroundColor: colors.ultra,
        marginTop: 15, borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    home_banner_button_text: {
        fontFamily: fonts.DmSans_Medium,
        fontSize: sizes.h13,
        color: 'white'
    },
    home_text_3: {
        fontSize: sizes.h16,
        fontFamily: fonts.DmSans_Bold,
        color: colors.primary
    },
    home_text_4: {
        fontSize: sizes.h14,
        fontFamily: fonts.DmSans_Regular,
        color: colors.primary
    }
})