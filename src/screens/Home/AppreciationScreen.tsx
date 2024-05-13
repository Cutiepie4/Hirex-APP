import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { colors, fonts, sizes } from '@/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BASE_API } from '@/services/BaseApi';
import Toast from 'react-native-toast-message';
import { toastResponse } from '@/utils/toastResponse';

type AppreciationProps = {
    id: number
    award: string
    achievement: string
    endDate: string
    description: string
}

export const Appreciation = ({ route }) => {
    let employeeId = route.params.employeeId || null;
    let workId = route.params.workId || null;
    const appre = appreStyle
    const [appreciation, setAppreciation] = React.useState<AppreciationProps>(null)

    React.useEffect(() => {
        BASE_API.get(`/appreciations?employeeId=${employeeId}&workId=${workId}`)
            .then((res) => {
                setAppreciation(res.data)
            }).catch((err) => {
                toastResponse({type: 'error', content: err.message})
            })
    }, [])
    
    const handleChangeAprreciation = (name, value) => {
        setAppreciation({ ...appreciation, [name]: value })
    }

    const saveAprreciation = async () => {
        await BASE_API.post("appreciations", {
            ...appreciation,
            employeeId: employeeId,
            workId: workId,
        })
            .then(res => {
                toastResponse({type: 'success', content: 'Lưu thành công'})
            })
            .catch(err => {
                toastResponse({type: 'error', content: err.message})
            })
    }

    return (
        <View style={appre.container}>
            <KeyboardAwareScrollView>
                <View>
                    <Text style={appre.appre_text_1}>Đánh giá</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }}>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[appre.label_input_text_1, { color: colors.primary }]}>
                            Award name
                        </Text>
                        <TextInput style={{
                                marginTop: 10,
                                backgroundColor: 'white',
                                borderRadius: 10,
                                fontSize: sizes.h12,
                                fontFamily: fonts.dMSans.regular,
                                color: colors.primary,
                                paddingLeft: 25,
                                paddingTop: 20,
                                paddingBottom: 10,
                                paddingRight: 25,
                                display: 'flex'
                            }} textAlignVertical="top" multiline
                            value={appreciation?.award}
                            onChangeText={text => { handleChangeAprreciation("award", text) }}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[appre.label_input_text_1, { color: colors.primary }]}>
                            Category/Achievement achieved
                        </Text>
                        <TextInput style={{
                                marginTop: 10,
                                backgroundColor: 'white',
                                borderRadius: 10,
                                fontSize: sizes.h12,
                                fontFamily: fonts.dMSans.regular,
                                color: colors.primary,
                                paddingLeft: 25,
                                paddingTop: 20,
                                paddingBottom: 10,
                                paddingRight: 25,
                                display: 'flex'
                            }} textAlignVertical="top" multiline 
                            value={appreciation?.achievement}
                            onChangeText={text => { handleChangeAprreciation("achievement", text) }}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[appre.label_input_text_1, { color: colors.primary }]}>
                            End date
                        </Text>
                        <TextInput style={{
                            marginTop: 10,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            fontSize: sizes.h12,
                            fontFamily: fonts.dMSans.regular,
                            color: colors.primary,
                            paddingLeft: 25,
                            paddingTop: 20,
                            paddingBottom: 10,
                            paddingRight: 25,
                            display: 'flex'
                        }} textAlignVertical="top" multiline 
                            value={appreciation?.endDate}
                            onChangeText={text => { handleChangeAprreciation("endDate", text) }}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[appre.label_input_text_1, { color: colors.primary }]}>
                            Description
                        </Text>
                        <TextInput style={{
                                marginTop: 10,
                                height: 160,
                                backgroundColor: 'white',
                                borderRadius: 10,
                                fontSize: sizes.h12,
                                fontFamily: fonts.dMSans.regular,
                                color: colors.primary,
                                padding: 25, display: 'flex'
                            }} textAlignVertical="top" placeholder={`Write additional information here`} multiline 
                            value={appreciation?.description}
                            onChangeText={text => { handleChangeAprreciation("description", text) }}
                        />
                    </View>
                    <View style={{ marginTop: 20, marginBottom: 20, width: '100%', height: 70, backgroundColor: colors.background_2, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        {/* Bottom button */}

                        <TouchableOpacity onPress={() => {
                            saveAprreciation()
                        }} style={{ height: 50, width: '80%', backgroundColor: colors.primary, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 6 }} activeOpacity={0.8}>
                            <Text style={[appre.label_input_text_1, { color: 'white' }]}>SAVE</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Appreciation;


const appreStyle = StyleSheet.create({
    container: {
        backgroundColor: colors.background_2,
        display: 'flex',
        position: 'relative',
        height: '100%',
        paddingTop: '25%',
        paddingLeft: 25,
        paddingRight: 25
    },
    appre_text_1: {
        fontFamily: fonts.dMSans.bold,
        fontSize: sizes.h22,
        color: colors.primary,
    },
    appre_text_2: {
        fontFamily: fonts.dMSans.regular,
        fontSize: sizes.h18,
        color: "white"
    },
    appre_banner: {
        height: 160,
        backgroundColor: colors.primary,
        borderRadius: 6,
        display: 'flex',
        justifyContent: 'center',
        padding: 20
    },
    appre_banner_button: {
        height: 35,
        width: 120,
        backgroundColor: colors.ultra,
        marginTop: 15, borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    appre_banner_button_text: {
        fontFamily: fonts.dMSans.semiBold,
        fontSize: sizes.h13,
        color: 'white'
    },
    appre_text_3: {
        fontSize: sizes.h16,
        fontFamily: fonts.dMSans.bold,
        color: colors.primary
    },
    appre_text_4: {
        fontSize: sizes.h14,
        fontFamily: fonts.dMSans.regular,
        color: colors.primary
    },
    label_input_text_1: {
        fontFamily: fonts.dMSans.bold,
        fontSize: sizes.h14
    }
})