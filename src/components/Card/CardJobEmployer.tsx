import { Icon } from "@rneui/base";
import React from "react";

import { View, Text, StyleSheet, Image, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import { colors, fonts, sizes } from "@/theme";

interface CardProps {
    name: string;
    address: string;
    salary: string;
    img: string;

    onPress: () => void;
    onPress2: () => void;
    color?: string;
    filled?: boolean;
    style?: StyleProp<ViewStyle>;
}


const Card2 = (props: CardProps) => {
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
                <View style={{ height: 45, width: 45, backgroundColor: colors.tertiary_deep, borderRadius: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ height: 45, width: 45, resizeMode: 'cover', borderRadius: 90 }} source={{ uri: `data:image;base64,${props.img}` }} />
                </View>
                <View style={{ marginLeft: 10, flex: 3 }}>
                    <Text style={card.card_text_1}>{props.name}</Text>
                    <Text style={card.card_text_2}>Hivelab Vina . {props.address}</Text>
                </View>
                {/* <View>
                    <Icon size={30} name="bookmark-border" />
                </View> */}
            </View>
            <View style={{ marginTop: 15 }}>
                <Text style={card.card_text_3}>{props.salary}<Text style={card.card_text_4}>/Th</Text></Text>
            </View>
            <View style={{ marginTop: 15 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <TouchableOpacity onPress={props.onPress} style={{ height: 35, width: 80, backgroundColor: colors.infi, borderRadius: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={card.card_text_5}>Xem chi tiết</Text>
                        </TouchableOpacity>
                    </View>


                    <View>
                        <TouchableOpacity onPress={props.onPress2} style={{ height: 35, width: 80, backgroundColor: colors.infi, borderRadius: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={card.card_text_5}>TT nhân viên</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Card2;

const cardStyle = StyleSheet.create({
    container: {
        minHeight: 160,
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