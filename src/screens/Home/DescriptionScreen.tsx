import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { colors, fonts, sizes } from '@/theme';
import { Icon } from '@rneui/base';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import RootNavigation from '@/route/RootNavigation';
import { BASE_API } from '@/services/BaseApi';
import { RootReducer } from '@/redux/store/reducer';
import { useSelector } from 'react-redux';
import { ParseConversationId } from '@/utils/utils';
import firestore from '@react-native-firebase/firestore'
import { formatRemainingTime } from '@/utils/formatRemainingTime';
import { toastResponse } from '@/utils/toastResponse';

type Expert = {
    id: number
    name: string
}

type User = {
    id: number
    phoneNumber: string
}

type Employer = {
    id: number
    user: User
}

type Company = {
    id: number
    name: string
    shortName: string
    description: string
    employeeSize: number
    headOffice: string
    industry: string
    website: string
    imageBase64: string
    employer: Employer
}

type Work = {
    id: number
    name: string
    address: string
    description: string
    startTime: string
    endTime: string
    startDate: string
    endDate: string
    expert: Expert
    company: Company
    createOn: string
    jobPosition: string
    typeWork: string
    typeJob: string
    wage: number
}

export const Description = ({ route }) => {
    let workId = route.params.workId || null
    const [info, setInfo] = React.useState(false)
    const [work, setWork] = React.useState<Work>(null)
    const desc = descStyle
    const { role } = useSelector((state: RootReducer) => state.authReducer)

    React.useEffect(() => {
        const fetchData = async () => {
            const res = await BASE_API.get(`works/${workId}`);
            setWork(res.data)
        };

        fetchData()
            .catch((err) => {
                toastResponse({ type: 'error', content: err.response.data || err.message })
            });
    }, [])
    

    const { phoneNumber } = useSelector((state: RootReducer) => state.authReducer);

    const addConversation = async (chatFriend) => {
        try {
            const participants = [phoneNumber, chatFriend];
            const conversationId = ParseConversationId(participants);
            await firestore()
                .collection('conversations_col')
                .doc(conversationId)
                .set({
                    participants,
                    messages: []
                }, {
                    merge: true
                });
            RootNavigation.navigate('ChatScreen', { data: { chatFriendPhone: chatFriend, participants, messages: [] } });
        } catch (error) {
            console.error('Error adding document: ', error);
        } 
    };

    return (
        <View style={desc.container}>
            <View style={desc.logoContainer}>
                <View style={desc.logo}>
                    <Image style={{ width: 70, height: 70, resizeMode: 'cover', borderRadius: 90 }} source={{ uri: `data:image;base64,${work?.company?.imageBase64}`}} />
                </View>
            </View>

            <View style={desc.header_container}>
                <Text style={desc.desc_text_1}>{work?.name}</Text>
                <Text style={desc.desc_text_2}>{work?.company?.shortName}{'    '}<Text style={{ fontSize: 10, textAlignVertical: 'center' }}>{'\u2B24'}</Text>{'   '}{work?.address}{'   '}<Text style={{ fontSize: 10, textAlignVertical: 'center' }}>{'\u2B24'}</Text>{'   '}{formatRemainingTime(work?.createOn)}</Text>
            </View>

            <View style={{ paddingLeft: 25, paddingRight: 25, marginTop: 10 }}>
                <View style={{ display: 'flex', flexDirection: 'row', height: 40 }}>
                    <TouchableOpacity onPress={() => { setInfo(false) }} activeOpacity={0.8} style={[desc.tab_button, { backgroundColor: info == false ? colors.primary : colors.tertiary_deep }]}>
                        <Text style={[desc.desc_text_3, { color: info == false ? 'white' : colors.primary }]}>Mô tả</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { setInfo(true) }} style={[desc.tab_button, { backgroundColor: info == true ? colors.primary : colors.tertiary_deep }]}>
                        <Text style={[desc.desc_text_3, { color: info == true ? 'white' : colors.primary }]}>Công ty</Text>
                    </TouchableOpacity>
                </View>




                <View>

                    {info == false ? (

                        <View style={{ marginTop: 20 }}>
                            {/* Description miniscreen */}
                            <ScrollView showsVerticalScrollIndicator={false} style={{ height: 390 }}>
                                <View>
                                    <Text style={[desc.desc_text_3, { color: colors.primary }]}>Mô tả công việc</Text>
                                    <Text style={desc.desc_text_4}>{work?.description}</Text>

                                    {/* <TouchableOpacity activeOpacity={0.8} style={{ height: 40, width: 120, backgroundColor: colors.tertiary_deep, marginTop: 10, borderRadius: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={desc.desc_text_5}>Read more</Text>
                                    </TouchableOpacity> */}
                                </View>

                                {/* <View style={{ marginTop: 30 }}>
                                    <Text style={[desc.desc_text_3, { color: colors.primary }]}>Yêu cầu</Text>
                                    <Text style={desc.desc_text_4}><Text style={{ fontSize: 8, textAlignVertical: 'center' }}>{'\u2B24'}</Text>   Sed ut perspiciatis unde omnis iste natus error sit.</Text>
                                    <Text style={desc.desc_text_4}><Text style={{ fontSize: 8, textAlignVertical: 'center' }}>{'\u2B24'}</Text>   Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur & adipisci velit.</Text>

                                    <Text style={desc.desc_text_4}><Text style={{ fontSize: 8, textAlignVertical: 'center' }}>{'\u2B24'}</Text>   Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</Text>

                                    <Text style={desc.desc_text_4}><Text style={{ fontSize: 8, textAlignVertical: 'center' }}>{'\u2B24'}</Text>   Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur</Text>


                                </View> */}
                                <View style={{ marginTop: 30 }}>
                                    <Text style={[desc.desc_text_3, { color: colors.primary, marginBottom: 20 }]}>Thông tin</Text>
                                    <View>
                                        <Text style={[desc.desc_text_6, { color: colors.primary, marginBottom: 5 }]}>Vị trí</Text>
                                        <Text style={[desc.desc_text_7, { color: colors.primary }]}>{work?.jobPosition}</Text>
                                    </View>

                                    <View style={{ marginTop: 25 }}>
                                        <Text style={[desc.desc_text_6, { color: colors.primary, marginBottom: 5 }]}>Kinh nghiệm</Text>
                                        <Text style={[desc.desc_text_7, { color: colors.primary }]}>3 Năm</Text>
                                    </View>

                                    <View style={{ marginTop: 25 }}>
                                        <Text style={[desc.desc_text_6, { color: colors.primary, marginBottom: 5 }]}>Loại hình công việc</Text>
                                        <Text style={[desc.desc_text_7, { color: colors.primary }]}>{work?.typeJob}</Text>
                                    </View>

                                    <View style={{ marginTop: 25 }}>
                                        <Text style={[desc.desc_text_6, { color: colors.primary, marginBottom: 5 }]}>Hình thức làm việc</Text>
                                        <Text style={[desc.desc_text_7, { color: colors.primary }]}>{work?.typeWork}</Text>
                                    </View>

                                    <View style={{ marginTop: 25 }}>
                                        <Text style={[desc.desc_text_6, { color: colors.primary, marginBottom: 5 }]}>Vị trí cụ thể</Text>
                                        <Text style={[desc.desc_text_7, { color: colors.primary }]}>Design</Text>
                                    </View>
                                </View>

                                {/* <View style={{ marginTop: 30, marginBottom: 80 }}>
                                    <Text style={[desc.desc_text_3, { color: colors.primary }]}>Khác</Text>
                                    <Text style={desc.desc_text_4}><Text style={{ fontSize: 8, textAlignVertical: 'center' }}>{'\u2B24'}</Text>   Medical.</Text>

                                    <Text style={desc.desc_text_4}><Text style={{ fontSize: 8, textAlignVertical: 'center' }}>{'\u2B24'}</Text>   Dental.</Text>

                                    <Text style={desc.desc_text_4}><Text style={{ fontSize: 8, textAlignVertical: 'center' }}>{'\u2B24'}</Text>   Technical Certification.</Text>
                                    <Text style={desc.desc_text_4}><Text style={{ fontSize: 8, textAlignVertical: 'center' }}>{'\u2B24'}</Text>   Regular Hours.</Text>
                                    <Text style={desc.desc_text_4}><Text style={{ fontSize: 8, textAlignVertical: 'center' }}>{'\u2B24'}</Text>   Meal Allowance.</Text>
                                    <Text style={desc.desc_text_4}><Text style={{ fontSize: 8, textAlignVertical: 'center' }}>{'\u2B24'}</Text>   Transport Allowance.</Text>
                                    <Text style={desc.desc_text_4}><Text style={{ fontSize: 8, textAlignVertical: 'center' }}>{'\u2B24'}</Text>   Monday - Friday.</Text>
                                </View> */}

                            </ScrollView>

                        </View>
                    ) : (<View style={{ marginTop: 20 }}>
                        {/* Company miniscreen */}

                        <ScrollView showsVerticalScrollIndicator={false} style={{ height: 390 }}>
                            <View>
                                <Text style={[desc.desc_text_3, { color: colors.primary }]}>Giới thiệu công ty</Text>
                                <Text style={desc.desc_text_4}>{work?.company?.description}</Text>
                            </View>

                            <View style={{ marginTop: 30 }}>
                                <Text style={[desc.desc_text_3, { color: colors.primary }]}>Website</Text>
                                <Text style={[desc.desc_text_4, { color: colors.tertiary_deep }]}>{work?.company?.website}</Text>

                            </View>
                            <View style={{ marginTop: 30 }}>
                                <Text style={[desc.desc_text_3, { color: colors.primary }]}>Industry</Text>
                                <Text style={[desc.desc_text_4]}>{work?.company?.industry}</Text>

                            </View>
                            <View style={{ marginTop: 30 }}>
                                <Text style={[desc.desc_text_3, { color: colors.primary }]}>Quy mô</Text>
                                <Text style={[desc.desc_text_4]}>{work?.company?.employeeSize} Nhân viên</Text>

                            </View>
                            <View style={{ marginTop: 30 }}>
                                <Text style={[desc.desc_text_3, { color: colors.primary }]}>Trụ sở</Text>
                                <Text style={[desc.desc_text_4]}>{work?.company?.headOffice}</Text>

                            </View>

                        </ScrollView>


                    </View>)}




                </View>
            </View>


            {role.toLowerCase() == 'USER'.toLowerCase() && (
                <View style={{ position: 'absolute', width: '100%', height: 70, backgroundColor: colors.background, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    {/* Bottom button */}
                    {/* <Icon name="bookmark-border" color={colors.ultra} style={{ marginRight: 20 }} onPress={() => {}} /> */}
                    <TouchableOpacity onPress={() => { RootNavigation.navigate('UploadCV', { work: work, workId: work?.id }) }} style={{ height: 50, width: '70%', backgroundColor: colors.primary, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 6 }} activeOpacity={0.8}>
                        <Text style={[desc.desc_text_3, { color: 'white' }]}>ỨNG TUYỂN NGAY</Text>
                    </TouchableOpacity>
                    <Icon name="link" color={work?.company?.employer?.user?.phoneNumber ? colors.ultra : colors.grey} style={{ marginLeft: 20 }} onPress={() => {if (work?.company?.employer?.user?.phoneNumber) { addConversation(work?.company?.employer?.user?.phoneNumber) }}}/>
                </View>
            )}

        </View>
    )
}

export default Description;

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
})