import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { colors, fonts, sizes } from '@/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BASE_API } from '@/services/BaseApi';
import { toastResponse } from '@/utils/toastResponse';
import { CheckBox } from '@rneui/base';
import StarRating from 'react-native-star-rating';
import { backgroundColor } from '@/styles/styles';
import RootNavigation from '@/route/RootNavigation';

type ReviewProps = {
    id: number
    title: string
    whatYouLike: string
    feedback: string
    overallRate: number
    salaryRate: number
    trainingRate: number
    managementRate: number
    cultureRate: number
    officeRate: number
    companyId: number
    recommend: boolean
}

export const Review = ({ route }) => {
    let companyId = route.params.companyId || null;
    const appre = appreStyle
    const [review, setReview] = React.useState<ReviewProps>(null)
    const [isNew, setIsNew] = React.useState(true)

    const fetchData = async () => {
        await BASE_API.get(`/reviews?companyId=${companyId}`)
            .then((res) => {
                setIsNew(true)
                setReview(res.data)
            })
    }

    React.useEffect(() => {
        fetchData()
            .catch((err) => {
                if (err?.response?.status == 400) {
                    setIsNew(true)
                } else {
                    setIsNew(false)
                    toastResponse({ type: 'error', content: err.response.data || err.message })
                }
            });
    }, [])

    const handleChangeReview = (name: string, value: string | number | boolean) => {
        setReview({ ...review, [name]: value })
    }

    const submitReview = async () => {
        await BASE_API.post('/reviews', { ...review, companyId: companyId })
            .then(() => {
                RootNavigation.pop()
            }).catch(err => {
                toastResponse({ type: 'error', content: err.response.data || err.message })
            })
    }

    return (
        <View style={appre.container}>
            <KeyboardAwareScrollView>
                <View>
                    <Text style={appre.appre_text_1}>{isNew == true ? 'Viết đánh giá' : 'Sửa đánh giá'}</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }}>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[appre.label_input_text_1, { color: colors.primary }]}>
                            Đánh giá tổng thể
                        </Text>
                        <View style={{ width: 50 }}>
                            <StarRating
                                disabled={false}
                                emptyStar={'ios-star-outline'}
                                fullStar={'ios-star'}
                                starStyle={{ marginRight: 15, marginTop: 5, marginBottom: 3 }}
                                fullStarColor={colors.star}
                                iconSet={'Ionicons'}
                                maxStars={5}
                                starSize={14}
                                rating={review?.overallRate}
                                selectedStar={(rating) => handleChangeReview("overallRate", rating)}
                            />
                        </View>
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
                        }} textAlignVertical="top" multiline placeholder={`Tổng thể`}
                            value={review?.title}
                            onChangeText={text => { handleChangeReview("title", text) }}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[appre.label_input_text_1, { color: colors.primary }]}>
                            Điều gì khiến bạn thích làm việc ở đây
                        </Text>
                        <TextInput style={{
                            marginTop: 10,
                            height: 100,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            fontSize: sizes.h12,
                            fontFamily: fonts.dMSans.regular,
                            color: colors.primary,
                            padding: 25, display: 'flex'
                        }} textAlignVertical="top" placeholder={`Nêu cảm nhận của bạn`} multiline
                            value={review?.whatYouLike}
                            onChangeText={text => { handleChangeReview("whatYouLike", text) }}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[appre.label_input_text_1, { color: colors.primary }]}>
                            Đề xuất cải thiện
                        </Text>
                        <TextInput style={{
                            marginTop: 10,
                            height: 100,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            fontSize: sizes.h12,
                            fontFamily: fonts.dMSans.regular,
                            color: colors.primary,
                            padding: 25, display: 'flex'
                        }} textAlignVertical="top" placeholder={`Viết gợi ý của bạn`} multiline
                            value={review?.feedback}
                            onChangeText={text => { handleChangeReview("feedback", text) }}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[appre.label_input_text_1, { color: colors.primary }]}>
                            Chi tiêt đánh giá
                        </Text>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                                <View style={{ flex: 1, alignSelf: 'stretch' }}>
                                    <Text style={appre.input_text_1}>Lương & phúc lợi</Text>
                                    <Text style={appre.input_text_1}>Đào tạo & học tập</Text>
                                    <Text style={appre.input_text_1}>Quản lý nhân viên</Text>
                                    <Text style={appre.input_text_1}>Văn hóa & giải trí</Text>
                                    <Text style={appre.input_text_1}>Môi trường làm việc</Text>
                                </View>
                                <View style={{ flex: 1, alignSelf: 'stretch' }}>
                                    <View style={{ width: 40 }}>
                                        <StarRating
                                            disabled={false}
                                            emptyStar={'ios-star-outline'}
                                            fullStar={'ios-star'}
                                            starStyle={{ marginRight: 15, marginTop: 5, marginBottom: 3 }}
                                            fullStarColor={colors.star}
                                            iconSet={'Ionicons'}
                                            maxStars={5}
                                            starSize={14}
                                            rating={review?.salaryRate}
                                            selectedStar={(rating) => handleChangeReview("salaryRate", rating)}
                                        />
                                    </View>
                                    <View style={{ width: 40 }}>
                                        <StarRating
                                            disabled={false}
                                            emptyStar={'ios-star-outline'}
                                            fullStar={'ios-star'}
                                            starStyle={{ marginRight: 15, marginTop: 5, marginBottom: 3 }}
                                            fullStarColor={colors.star}
                                            iconSet={'Ionicons'}
                                            maxStars={5}
                                            starSize={14}
                                            rating={review?.trainingRate}
                                            selectedStar={(rating) => handleChangeReview("trainingRate", rating)}
                                        />
                                    </View>
                                    <View style={{ width: 40 }}>
                                        <StarRating
                                            disabled={false}
                                            emptyStar={'ios-star-outline'}
                                            fullStar={'ios-star'}
                                            starStyle={{ marginRight: 15, marginTop: 5, marginBottom: 3 }}
                                            fullStarColor={colors.star}
                                            iconSet={'Ionicons'}
                                            maxStars={5}
                                            starSize={14}
                                            rating={review?.managementRate}
                                            selectedStar={(rating) => handleChangeReview("managementRate", rating)}
                                        />
                                    </View>
                                    <View style={{ width: 40 }}>
                                        <StarRating
                                            disabled={false}
                                            emptyStar={'ios-star-outline'}
                                            fullStar={'ios-star'}
                                            starStyle={{ marginRight: 15, marginTop: 5, marginBottom: 3 }}
                                            fullStarColor={colors.star}
                                            iconSet={'Ionicons'}
                                            maxStars={5}
                                            starSize={14}
                                            rating={review?.cultureRate}
                                            selectedStar={(rating) => handleChangeReview("cultureRate", rating)}
                                        />
                                    </View>
                                    <View style={{ width: 40 }}>
                                        <StarRating
                                            disabled={false}
                                            emptyStar={'ios-star-outline'}
                                            fullStar={'ios-star'}
                                            starStyle={{ marginRight: 15, marginTop: 5, marginBottom: 3 }}
                                            fullStarColor={colors.star}
                                            iconSet={'Ionicons'}
                                            maxStars={5}
                                            starSize={14}
                                            rating={review?.officeRate}
                                            selectedStar={(rating) => handleChangeReview("officeRate", rating)}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[appre.label_input_text_1, { color: colors.primary }]}>
                            Bạn có muốn đề xuất công ty này tới mọi người?
                        </Text>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                                <View style={{ flex: 1, alignSelf: 'stretch' }}>
                                    <CheckBox
                                        checked={review?.recommend === true}
                                        onPress={() => handleChangeReview("recommend", true)}
                                        iconType="material-community"
                                        checkedIcon="radiobox-marked"
                                        uncheckedIcon="radiobox-blank"
                                        title={'Có'}
                                    />
                                </View>
                                <View style={{ flex: 1, alignSelf: 'stretch' }}>
                                    <CheckBox
                                        checked={review?.recommend === false}
                                        onPress={() => handleChangeReview("recommend", false)}
                                        iconType="material-community"
                                        checkedIcon="radiobox-marked"
                                        uncheckedIcon="radiobox-blank"
                                        title={'Không'}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 20, marginBottom: 20, width: '100%', height: 70, backgroundColor: colors.background_2, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        {/* Bottom button */}

                        <TouchableOpacity onPress={submitReview} style={{ height: 50, width: '80%', backgroundColor: colors.primary, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 6 }} activeOpacity={0.8}>
                            <Text style={[appre.label_input_text_1, { color: 'white' }]}>Gửi</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Review;


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
    },
    input_text_1: {
        marginTop: 5,
        paddingLeft: 20,
        fontFamily: fonts.dMSans.regular,
        fontSize: sizes.h14
    }
})