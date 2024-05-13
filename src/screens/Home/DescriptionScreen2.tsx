import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { colors, fonts, sizes } from '@/theme';
import google from '@assets/images/google.png'
import profile from '@assets/images/profile.png'
import { Icon } from '@rneui/base';
import { BASE_API } from '@/services/BaseApi';
import { formatRemainingTime } from '@/utils/formatRemainingTime';
import moment from 'moment';
import { Feather } from '@expo/vector-icons';
import RootNavigation from '@/route/RootNavigation';

export const Description2 = () => {
    const [info, setInfo] = React.useState(false)
    const desc = descStyle
    const [work, setWork] = React.useState(null)

    React.useEffect(() => {
        BASE_API.get(`works/1?employer`).then((res) => {
            setWork(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const decideStatusResumeWork = async (resumeWorkId: number, resumeWorkStatus: string) => {
        await BASE_API.post(`resume_works/hire`, {
            'id': resumeWorkId,
            'status': resumeWorkStatus
        }).then((res) => {
            let updatedResumeWorks = work?.resumeWorks?.map(resumeWork => resumeWork.id !== resumeWorkId ? resumeWork : {
                ...work?.resumeWorks,
                status: resumeWorkStatus
            })
            setWork(work => ({ ...work, resumeWorks: updatedResumeWorks }));
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <View style={desc.container}>
            <View style={desc.logoContainer}>
                <View style={desc.logo}>
                    <Image source={google} />
                </View>
            </View>

            <View style={desc.header_container}>

                <Text style={desc.desc_text_1}>{work?.name}</Text>
                <Text style={desc.desc_text_2}>Google    <Text style={{ fontSize: 10, textAlignVertical: 'center' }}>{'\u2B24'}</Text>   {work?.address}   <Text style={{ fontSize: 10, textAlignVertical: 'center' }}>{'\u2B24'}</Text>   {formatRemainingTime(work?.createOn)}</Text>
            </View>

            <View style={{ paddingLeft: 25, paddingRight: 25, marginTop: 10 }}>
                <View style={{ display: 'flex', flexDirection: 'row', height: 40 }}>
                    <TouchableOpacity onPress={() => { setInfo(false) }} activeOpacity={0.8} style={[desc.tab_button, { backgroundColor: info == false ? colors.primary : colors.tertiary_deep }]}>
                        <Text style={[desc.desc_text_3, { color: info == false ? 'white' : colors.primary }]}>Nhân viên</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { setInfo(true) }} style={[desc.tab_button, { backgroundColor: info == true ? colors.primary : colors.tertiary_deep }]}>
                        <Text style={[desc.desc_text_3, { color: info == true ? 'white' : colors.primary }]}>Đơn ứng tuyển</Text>
                    </TouchableOpacity>
                </View>

                <View>

                    {info == false ? (

                        <View style={{ marginTop: 20 }}>
                            {/* Employee miniscreen */}
                            <ScrollView showsVerticalScrollIndicator={false} style={{ height: 470 }}>
                            {work?.employees?.map((employee, key) => {
                                return <View key={key} style={{ minHeight: 100, marginBottom: 20, backgroundColor: colors.tertiary_light, borderColor: colors.primary, borderWidth: 0, borderRadius: 25 }}>
                                    <View style={{ margin: 20, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Image style={{ height: 50, width: 50, marginRight: 10 }} source={profile} />
                                        <View style={{ flex: 1 }}>
                                            <Text numberOfLines={1} style={[desc.desc_text_8]}>{employee?.user?.fullname}</Text>
                                            <Text style={desc.desc_text_9}>{employee?.user?.phone_number}</Text>
                                        </View>
                                        <View>
                                            <Feather name="info" size={24} color="black" style={{marginBottom:6}} />
                                            <Feather name="award" size={24} color="black" onPress={() => {
                                                RootNavigation.navigate('Appreciation', { employeeId: employee?.id, companyId: work?.company?.id })
                                            }} />
                                        </View>
                                    </View>
                                </View>})
                            }
                        </ScrollView>

                        </View>
                    ) : (<View style={{ marginTop: 20 }}>
                        {/* Resume miniscreen */}

                        <ScrollView showsVerticalScrollIndicator={false} style={{ height: 470 }}>
                            {work?.resumeWorks?.map((resumeWork, key) => {
                                return <View key={key} style={{ minHeight: 100, marginBottom: 20, backgroundColor: colors.tertiary_light, borderColor: colors.primary, borderWidth: 0, borderRadius: 25 }}>
                                    <View style={{ margin: 20, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Image style={{ height: 50, width: 50, marginRight: 10 }} source={profile} />
                                        <View style={{ flex: 1 }}>
                                            <Text numberOfLines={1} style={[desc.desc_text_8]}>{resumeWork?.resume?.nameFile}</Text>
                                            <Text style={desc.desc_text_9}>{moment(resumeWork?.updatedAt).format("D MMM YYYY [at] hh:mm a")}</Text>
                                        </View>
                                        <View  >
                                            <Feather name="info" size={24} color="black" style={{marginBottom:6}} />
                                        </View>
                                    </View>
                                    {resumeWork?.status === "PENDING" ? 
                                        (<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginRight: 20, marginTop: 0, marginBottom: 20 }} onPress={() => decideStatusResumeWork(resumeWork?.id, "REJECTED")}>
                                                <Icon color={'red'} name="delete" size={30} />
                                                <Text style={[desc.desc_text_9, { color: 'red' }]}>Reject</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginRight: 20, marginTop: 0, marginBottom: 20 }} onPress={() => decideStatusResumeWork(resumeWork?.id, "ACCEPTED")}>
                                                <Icon color={'green'} name="check" size={30} />
                                                <Text style={[desc.desc_text_9, { color: 'green' }]}>Accept</Text>
                                            </TouchableOpacity>
                                        </View>) : 
                                        (<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                            <Text style={[desc.desc_text_9, { color: resumeWork?.status === "ACCEPTED" ? 'green' : 'red', marginBottom: 20 }]}>{resumeWork?.status}</Text>
                                        </View>)
                                    }
                                </View>
                            })}
                        </ScrollView>

                    </View>)}
                </View>
            </View>
        </View>
    )
}

export default Description2;

const descStyle = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        display: 'flex',
        position: 'relative',
        height: '100%',
        paddingTop: '15%',
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 25,
        paddingRight: 25,
        zIndex: 2
    },
    logo: {
        height: 70,
        width: 70,
        backgroundColor: colors.incognito,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    header_container: {
        height: 130,
        backgroundColor: colors.grey,
        paddingLeft: 25,
        paddingRight: 25,
        marginTop: -20,
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tab_button: {
        height: 40, borderRadius: 6, flex: 1, marginRight: 5, justifyContent: 'center', display: 'flex', alignItems: 'center'
    },
    desc_text_1: {
        fontFamily: fonts.dMSans.bold,
        fontSize: sizes.h16,
        color: colors.primary
    },
    desc_text_2: {
        fontFamily: fonts.dMSans.regular,
        fontSize: sizes.h16,
        color: colors.primary,
        marginTop: 15
    },
    desc_text_3: {
        fontFamily: fonts.dMSans.bold,
        fontSize: sizes.h14
    },
    desc_text_4: {
        fontFamily: fonts.dMSans.regular,
        fontSize: sizes.h12,
        marginTop: 10
    },
    desc_text_5: {
        fontFamily: fonts.openSan.regular,
        fontSize: sizes.h12,
        color: colors.primary
    },
    desc_text_6: {
        fontFamily: fonts.dMSans.bold,
        fontSize: sizes.h12
    },
    desc_text_7: {
        fontFamily: fonts.dMSans.regular,
        fontSize: sizes.h12
    },
    desc_text_8: {
        fontFamily: fonts.dMSans.regular,
        fontSize: sizes.h12,
        color: colors.primary

    },
    desc_text_9: {
        fontFamily: fonts.dMSans.regular,
        fontSize: sizes.h12,
        color: colors.nega
    },
})