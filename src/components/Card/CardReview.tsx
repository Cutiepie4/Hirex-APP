import { Icon } from "@rneui/base";
import React from "react";

import { View, Text, StyleSheet, Image, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import google_icon from '@assets/images/google_icon.png'
import { colors, fonts, sizes } from "@/theme";
import RootNavigation from "@/route/RootNavigation";
import { Ionicons } from '@expo/vector-icons';
import { Rating } from "react-native-ratings";

interface CardProps {
    title: string;
    updatedAt: string;
    overallRate: number;
    recommend: boolean;
    whatYouLike: string;
    feedback: string;
    salaryRate: number;
    trainingRate: number;
    managementRate: number;
    cultureRate: number;
    officeRate: number;

    onPress: () => void;
    color?: string;
    filled?: boolean;
    style?: StyleProp<ViewStyle>;
}


const CardReview = (props: CardProps) => {
    const card = cardStyle
    const filledBgColor = props.color || colors.primary;
    const outlinedColor = colors.white;
    const bgColor = props.filled ? filledBgColor : outlinedColor;

    return (
        <View style={{
            ...cardStyle.container,
            ...{ backgroundColor: bgColor },
            ...(props.style as object),
        }}>
            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <View style={{ marginLeft: 10, flex: 3 }}>
                    <Text style={card.card_text_1}>{props.title}</Text>
                    <Text style={card.card_text_2}>{props.updatedAt}</Text>
                </View>
            </View>
            <View style={{ marginTop: 15 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Rating readonly showReadOnlyText={false} imageSize={14} fractions={0} startingValue={props.overallRate} style={{ marginTop: 3 }} />
                        <Text style={card.card_text_3}>{props.overallRate}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        {props.recommend ?
                            <Ionicons name="happy-outline" size={17} color={'green'} style={{ marginRight: 3 }} /> :
                            <Ionicons name="sad-outline" size={17} color={'red'} style={{ marginRight: 3 }} />
                        }
                        <Text style={{ ...card.card_text_4, color: props.recommend ? 'green' : 'red' }}>{props.recommend ? 'Đề xuất' : 'Không đề xuất'}</Text>
                    </View>
                </View>
            </View>
            <View style={{ marginTop: 15 }}>
                <Text style={[card.card_text_6, { color: colors.primary, marginBottom: 5 }]}>Điều tôi thích</Text>
                <Text style={[card.card_text_7, { color: colors.primary }]}>{props.whatYouLike}</Text>
            </View>

            <View style={{ marginTop: 25 }}>
                <Text style={[card.card_text_6, { color: colors.primary, marginBottom: 5 }]}>Đề xuất cải thiện</Text>
                <Text style={[card.card_text_7, { color: colors.primary }]}>{props.feedback}</Text>
            </View>
        </View>
    )
}

export default CardReview;

const cardStyle = StyleSheet.create({
    container: {
        minHeight: 100,
        borderRadius: 25,
        backgroundColor: 'white',
        padding: 20,
        width: '100%'
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
        marginLeft: 3,
        fontFamily: fonts.openSan.semiBold,
        fontSize: sizes.h14,
        color: colors.primary
    },
    card_text_4: {
        fontFamily: fonts.openSan.regular,
        fontSize: sizes.h14,
    },
    card_text_5: {
        fontSize: sizes.h10,
        fontFamily: fonts.dMSans.regular,
        color: colors.primary
    },
    card_text_6: {
        fontFamily: fonts.dMSans.bold,
        fontSize: sizes.h12
    },
    card_text_7: {
        fontFamily: fonts.dMSans.regular,
        fontSize: sizes.h12
    },
})