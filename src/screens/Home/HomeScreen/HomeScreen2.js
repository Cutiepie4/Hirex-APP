import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { colors, fonts, sizes } from "../../../constant";
import profile from '../../../assets/images/profile.png'
import woman from '../../../assets/images/woman2.png'
import job from '../../../assets/images/job.png'
import Card from '../../../utils/CardComponent/Card'
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Description from '../DescriptionScreen/DescriptionScreen';



const jobs = [1, 2, 3, 4, 5]

function Home({ navigation }) {
    const home = homeStyle
    const navigation2 = useNavigation()
    React.useEffect(() => {

    }
        , [navigation]
    )
    return (
        <KeyboardAwareScrollView>
            <View style={home.container}>
                <View>
                    <Text style={home.home_text_1}>Add Appreciation</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }}>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[home.label_input_text_1, { color: colors.primary }]}>
                            Award name
                        </Text>
                        <TextInput style={{
                            marginTop: 10,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            fontSize: sizes.h12,
                            fontFamily: fonts.DmSans_Regular,
                            color: colors.primary,
                            paddingLeft: 25, 
                            paddingTop: 20, 
                            paddingBottom: 10, 
                            paddingRight: 25, 
                            display: 'flex'
                        }} textAlignVertical="top" multiline />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[home.label_input_text_1, { color: colors.primary }]}>
                            Category/Achievement achieved
                        </Text>
                        <TextInput style={{
                            marginTop: 10,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            fontSize: sizes.h12,
                            fontFamily: fonts.DmSans_Regular,
                            color: colors.primary,
                            paddingLeft: 25, 
                            paddingTop: 20, 
                            paddingBottom: 10, 
                            paddingRight: 25, 
                            display: 'flex'
                        }} textAlignVertical="top" multiline />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[home.label_input_text_1, { color: colors.primary }]}>
                            End date
                        </Text>
                        <TextInput style={{
                            marginTop: 10,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            fontSize: sizes.h12,
                            fontFamily: fonts.DmSans_Regular,
                            color: colors.primary,
                            paddingLeft: 25, 
                            paddingTop: 20, 
                            paddingBottom: 10, 
                            paddingRight: 25, 
                            display: 'flex'
                        }} textAlignVertical="top" multiline />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[home.label_input_text_1, { color: colors.primary }]}>
                            Description
                        </Text>
                        <TextInput style={{
                            marginTop: 10,
                            height: 160,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            fontSize: sizes.h12,
                            fontFamily: fonts.DmSans_Regular,
                            color: colors.primary,
                            padding: 25, display: 'flex'
                        }} textAlignVertical="top" placeholder={`Write additional information here`} multiline />
                    </View>
                    <View style={{ marginTop: 20, marginBottom: 20, width: '100%', height: 70, backgroundColor: colors.background, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        {/* Bottom button */}

                        <TouchableOpacity onPress={() => {
                        }} style={{ height: 50, width: '80%', backgroundColor: colors.primary, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 6 }} activeOpacity={0.8}>
                            <Text style={[home.label_input_text_1, { color: 'white' }]}>SAVE</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default Home;


const homeStyle = StyleSheet.create({
    container: {
        backgroundColor: colors.background_2,
        display: 'flex',
        position: 'relative',
        height: '100%',
        paddingTop: '10%',
        paddingLeft: 25,
        paddingRight: 25
    },
    home_text_1: {
        fontFamily: fonts.DmSans_Bold,
        fontSize: sizes.h22,
        color: colors.primary,
    },
    home_text_2: {
        fontFamily: fonts.DmSans_Regular,
        fontSize: sizes.h18,
        color: "white"
    },
    home_banner: {
        height: 160,
        backgroundColor: colors.primary,
        borderRadius: 6,
        display: 'flex',
        justifyContent: 'center',
        padding: 20
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
    },
    label_input_text_1: {
        fontFamily: fonts.DmSans_Bold,
        fontSize: sizes.h14
    }
})