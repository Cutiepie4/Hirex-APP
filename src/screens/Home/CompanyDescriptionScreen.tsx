import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import { colors, fonts, sizes } from '@/theme';
import { BASE_API } from '@/services/BaseApi';
import RootNavigation from '@/route/RootNavigation';
import { toastResponse } from '@/utils/toastResponse';
import Card from '@/components/Card/CardJobEmployee';
import CardReview from '@/components/Card/CardReview';
import { Rating } from 'react-native-ratings';
import Modal from "react-native-modal";
import * as Progress from 'react-native-progress';
import { formatRemainingTime } from '@/utils/formatRemainingTime';
import Collapsible from 'react-native-collapsible';
import { Ionicons } from '@expo/vector-icons';

export const CompanyDescription = ({ route }) => {
    let companyId = route.params.companyId || null
    const [info, setInfo] = React.useState(1)
    const desc = descStyle
    const card = cardStyle
    const [company, setCompany] = React.useState(null)
    const [showBottomModal, setShowBottomModal] = React.useState<boolean>(false)
    const [refreshing, setRefreshing] = React.useState(false);
    const [closeCollapsible, setCloseCollapsible] = React.useState(true);


    const fetchData = async () => {
        const res = await BASE_API.get(`companies/${companyId}/detail`);
        setCompany(res.data)
    };
    React.useEffect(() => {
        fetchData()
            .catch((err) => {
                toastResponse({ type: 'error', content: err.response.data || err.message })
            });
    }, [])

    return (
        <View style={desc.container}>
            <View style={desc.logoContainer}>
                <View style={desc.logo}>
                    <Image style={{ width: 70, height: 70, resizeMode: 'cover', borderRadius: 90 }} source={{ uri: `data:image;base64,${company?.imageBase64}` }} />
                </View>
            </View>

            <View style={desc.header_container}>

                <Text style={desc.desc_text_1}>{company?.name}</Text>
                <Text style={desc.desc_text_2}>{company?.shortName}    <Text style={{ fontSize: 10, textAlignVertical: 'center' }}>{'\u2B24'}</Text>   {company?.works.length} jobs</Text>
            </View>

            <View style={{ paddingLeft: 25, paddingRight: 25, marginTop: 10 }}>
                <View style={{ display: 'flex', flexDirection: 'row', height: 40 }}>
                    <TouchableOpacity onPress={() => { setInfo(1) }} activeOpacity={0.8} style={[desc.tab_button, { backgroundColor: info == 1 ? colors.primary : colors.tertiary_deep }]}>
                        <Text style={[desc.desc_text_3, { color: info == 1 ? 'white' : colors.primary }]}>Thông tin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { setInfo(2) }} style={[desc.tab_button, { backgroundColor: info == 2 ? colors.primary : colors.tertiary_deep }]}>
                        <Text style={[desc.desc_text_3, { color: info == 2 ? 'white' : colors.primary }]}>Jobs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { setInfo(3) }} style={[desc.tab_button, { backgroundColor: info == 3 ? colors.primary : colors.tertiary_deep }]}>
                        <Text style={[desc.desc_text_3, { color: info == 3 ? 'white' : colors.primary }]}>Reviews</Text>
                    </TouchableOpacity>
                </View>

                <View>

                    {info == 1 ? (
                        <View style={{ marginTop: 20 }}>
                            {/* Company miniscreen */}
                            <ScrollView showsVerticalScrollIndicator={false} style={{ height: 390 }}>
                                <View>
                                    <Text style={[desc.desc_text_3, { color: colors.primary }]}>Giới thiệu công ty</Text>
                                    <Text style={desc.desc_text_4}>{company?.description}</Text>
                                </View>

                                <View style={{ marginTop: 30 }}>
                                    <Text style={[desc.desc_text_3, { color: colors.primary }]}>Website</Text>
                                    <Text style={[desc.desc_text_4, { color: colors.tertiary_deep }]}>{company?.website}</Text>

                                </View>
                                <View style={{ marginTop: 30 }}>
                                    <Text style={[desc.desc_text_3, { color: colors.primary }]}>Industry</Text>
                                    <Text style={[desc.desc_text_4]}>{company?.industry}</Text>

                                </View>
                                <View style={{ marginTop: 30 }}>
                                    <Text style={[desc.desc_text_3, { color: colors.primary }]}>Quy mô</Text>
                                    <Text style={[desc.desc_text_4]}>{company?.employeeSize} Nhân viên</Text>

                                </View>
                                <View style={{ marginTop: 30 }}>
                                    <Text style={[desc.desc_text_3, { color: colors.primary }]}>Trụ sở</Text>
                                    <Text style={[desc.desc_text_4]}>{company?.headOffice}</Text>

                                </View>
                            </ScrollView>
                        </View>
                    ) : (info == 2 ? (<View style={{ marginTop: 20 }}>
                        {/* Resume miniscreen */}

                        <ScrollView showsVerticalScrollIndicator={false} style={{ height: 470 }}>
                            {company?.works?.map((item, i) => {
                                return (<View key={i} style={{ marginTop: 5, marginBottom: 5 }}>
                                    <Card
                                        name={item.name}
                                        address={item?.address}
                                        img={company?.imageBase64}
                                        salary={`${item?.wage}tr VND`}
                                        onPress={() => { RootNavigation.navigate('Description', { workId: item?.id }) }}
                                    />
                                </View>)
                            })}
                        </ScrollView>

                    </View>) : (<View style={{ marginTop: 20 }}>
                        {/* Resume miniscreen */}

                        <ScrollView showsVerticalScrollIndicator={false} style={{ height: 420 }}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
                            }
                        >
                            <View style={card.container}>
                                <Text style={card.card_text_1}>Overall Rating</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                    <View style={{ marginLeft: 10 }}>
                                        <TouchableOpacity onPress={() => { setShowBottomModal(true) }}>
                                            <Rating showRating readonly showReadOnlyText={false} imageSize={14} fractions={1} startingValue={company?.avgOverallRate} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginTop: 20, marginLeft: 20 }}>
                                        <Text style={{ ...card.card_text_1, color: company?.recommendPercent >= 50 ? 'green' : 'red' }}>{company?.recommendPercent}% </Text>
                                    </View>
                                    <View style={{ marginTop: 15 }}>
                                        <Text style={card.card_text_1}>Người đề xuất{'\n'}làm việc tại đây</Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Collapsible collapsed={closeCollapsible}>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                                                <View style={{ flex: 1, alignSelf: 'stretch' }}>
                                                    <Text style={card.card_text_1}>Lương & phúc lợi</Text>
                                                    <Text style={card.card_text_1}>Đào tạo & học tập</Text>
                                                    <Text style={card.card_text_1}>Quản lý nhân viên</Text>
                                                    <Text style={card.card_text_1}>Văn hóa & giải trí</Text>
                                                    <Text style={card.card_text_1}>Môi trường làm việc</Text>
                                                </View>
                                                <View style={{ flex: 1, alignSelf: 'stretch' }}>
                                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <Rating
                                                            readonly
                                                            showReadOnlyText={false}
                                                            imageSize={17} fractions={1}
                                                            startingValue={company?.avgSalaryRate}
                                                        />
                                                        <Text style={card.card_text_1}> {company?.avgSalaryRate}</Text>
                                                    </View>
                                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <Rating
                                                            readonly
                                                            showReadOnlyText={false}
                                                            imageSize={17} fractions={1}
                                                            startingValue={company?.avgTrainingRate}
                                                        />
                                                        <Text style={card.card_text_1}> {company?.avgTrainingRate}</Text>
                                                    </View>
                                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <Rating
                                                            readonly
                                                            showReadOnlyText={false}
                                                            imageSize={17} fractions={1}
                                                            startingValue={company?.avgManagementRate}
                                                        />
                                                        <Text style={card.card_text_1}> {company?.avgManagementRate}</Text>
                                                    </View>
                                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <Rating
                                                            readonly
                                                            showReadOnlyText={false}
                                                            imageSize={17} fractions={1}
                                                            startingValue={company?.avgCultureRate}
                                                        />
                                                        <Text style={card.card_text_1}> {company?.avgCultureRate}</Text>
                                                    </View>
                                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <Rating
                                                            readonly
                                                            showReadOnlyText={false}
                                                            imageSize={17} fractions={1}
                                                            startingValue={company?.avgOfficeRate}
                                                        />
                                                        <Text style={card.card_text_1}> {company?.avgOfficeRate}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </Collapsible>
                                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }} onPress={() => setCloseCollapsible(!closeCollapsible)}>
                                        <Ionicons name={closeCollapsible ? 'chevron-down' : 'chevron-up' } size={15} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ marginBottom: 5 }} />
                            {company?.reviews?.map((item, i) => {
                                return (<View key={i} style={{ marginTop: 5, marginBottom: 5 }}>
                                    <CardReview
                                        title={item.title}
                                        updatedAt={formatRemainingTime(item?.updatedAt)}
                                        overallRate={item.overallRate}
                                        recommend={item.recommend}
                                        whatYouLike={item.whatYouLike}
                                        feedback={item.feedback}
                                        onPress={() => { }}
                                    />
                                </View>)
                            })}
                        </ScrollView>

                    </View>)
                    )}
                </View>
            </View>
            <View style={{ position: 'absolute', width: '100%', height: 60, backgroundColor: colors.background, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                {/* Bottom button */}

                <TouchableOpacity onPress={() => {
                    RootNavigation.navigate('Review', { companyId: company?.id })
                }} style={{ height: 40, width: '60%', backgroundColor: colors.primary, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 6 }} activeOpacity={0.8}>
                    <Text style={[desc.desc_text_3, { color: 'white' }]}>Viết đánh giá</Text>
                </TouchableOpacity>

            </View>
            <Modal
                isVisible={showBottomModal}
                onSwipeComplete={() => setShowBottomModal(false)}
                onBackdropPress={() => setShowBottomModal(false)}
                swipeDirection={['down']}
                statusBarTranslucent
                animationIn="slideInUp"
                animationOut="fadeOut"
                backdropTransitionOutTiming={0}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    marginHorizontal: 0,
                    bottom: 0
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        borderRadius: 20,
                        padding: 16 * 1.5,
                    }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ fontFamily: fonts.openSan.bold }}>5</Text>
                            <Rating readonly imageSize={17} fractions={0} ratingCount={1} startingValue={1} />
                            <View style={{ marginTop: 6, marginLeft: 10, marginRight: 10 }}>
                                <Progress.Bar progress={company?.fiveOverallRate / 100} borderRadius={90} color={colors.star} />
                            </View>
                            <Text style={{ fontFamily: fonts.openSan.bold }}>{company?.fiveOverallRate}%</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ fontFamily: fonts.openSan.bold }}>4</Text>
                            <Rating readonly imageSize={17} fractions={0} ratingCount={1} startingValue={1} />
                            <View style={{ marginTop: 6, marginLeft: 10, marginRight: 10 }}>
                                <Progress.Bar progress={company?.fourOverallRate / 100} borderRadius={90} color={colors.star} />
                            </View>
                            <Text style={{ fontFamily: fonts.openSan.bold }}>{company?.fourOverallRate}%</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ fontFamily: fonts.openSan.bold }}>3</Text>
                            <Rating readonly imageSize={17} fractions={0} ratingCount={1} startingValue={1} />
                            <View style={{ marginTop: 6, marginLeft: 10, marginRight: 10 }}>
                                <Progress.Bar progress={company?.threeOverallRate / 100} borderRadius={90} color={colors.star} />
                            </View>
                            <Text style={{ fontFamily: fonts.openSan.bold }}>{company?.threeOverallRate}%</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ fontFamily: fonts.openSan.bold }}>2</Text>
                            <Rating readonly imageSize={17} fractions={0} ratingCount={1} startingValue={1} />
                            <View style={{ marginTop: 6, marginLeft: 10, marginRight: 10 }}>
                                <Progress.Bar progress={company?.twoOverallRate / 100} borderRadius={90} color={colors.star} />
                            </View>
                            <Text style={{ fontFamily: fonts.openSan.bold }}>{company?.twoOverallRate}%</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ fontFamily: fonts.openSan.bold }}>1</Text>
                            <Rating readonly imageSize={17} fractions={0} ratingCount={1} startingValue={1} />
                            <View style={{ marginTop: 6, marginLeft: 10, marginRight: 10 }}>
                                <Progress.Bar progress={company?.oneOverallRate / 100} borderRadius={90} color={colors.star} />
                            </View>
                            <Text style={{ fontFamily: fonts.openSan.bold }}>{company?.oneOverallRate}%</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default CompanyDescription;

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

const cardStyle = StyleSheet.create({
    container: {
        minHeight: 120,
        borderRadius: 25,
        backgroundColor: colors.white,
        padding: 20,
        width: '100%',
    },
    card_text_1: {
        fontFamily: fonts.dMSans.bold,
        fontSize: sizes.h14,
        color: colors.primary
    },
    card_text_2: {
        fontFamily: fonts.dMSans.regular,
        fontSize: sizes.h12,
        color: colors.primary
    },
    card_text_3: {
        fontFamily: fonts.openSan.semiBold,
        fontSize: sizes.h14,
        color: colors.primary
    },
    card_text_4: {
        fontFamily: fonts.openSan.regular,
        fontSize: sizes.h14,
        color: 'grey'
    },
    card_text_5: {
        fontSize: sizes.h10,
        fontFamily: fonts.dMSans.regular,
        color: colors.primary
    }
})