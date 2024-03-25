import { Icon } from "@rneui/base";
import React from "react";

import {View,Text,StyleSheet,Image, TouchableOpacity} from 'react-native'
import google_icon from '../../assets/images/google_icon.png'
import { colors, fonts, sizes } from "../../constant";

import { useNavigation } from '@react-navigation/native';
import { Divider } from '@rneui/themed';

function Card(){
    const navigation = useNavigation(); 
    const card=cardStyle
    return (
        <View style={card.container}>
            <View style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
                <View style={{marginBottom:5}}>
                    <Icon size={30} name="bookmark-border" />
                </View>
                <View style={{marginTop:5, marginLeft:10,flex:3}}>
                    <Text style={card.card_text_1}>Work Experience</Text>
                </View>
            </View>
            <Divider />
            <View style={{marginTop:15}}>
                <Text style={card.card_text_3}>Manager</Text>
            </View>
            <View style={{marginTop:15}}>
                <Text style={card.card_text_4}>Amazon Inc</Text>
            </View>
            <View style={{marginTop:5}}>
                <Text style={card.card_text_4}>Jan 2015 - Feb 2022 {'\u2022'} 5 years</Text>
            </View>
        </View>
    )
}

export default Card;

const cardStyle=StyleSheet.create({
    container:{
        minHeight:80,
        borderRadius:25,
        backgroundColor:'white',
        padding:20,
        width:'100%'
    },
    card_text_1:{
        fontFamily:fonts.DmSans_Bold,
        fontSize:sizes.h14,
        color:colors.primary
    },
    card_text_2:{
        fontFamily:fonts.DmSans_Regular,
        fontSize:sizes.h12,
        color:colors.primary
    },
    card_text_3:{
        fontFamily:fonts.OpenSans_SemiBold,
        fontSize:sizes.h14,
        color:colors.primary
    },
    card_text_4:{
        fontFamily:fonts.OpenSans_Regular,
        fontSize:sizes.h14,
        color:'grey'
    },
    card_text_5:{
        fontSize:sizes.h10,
        fontFamily:fonts.DmSans_Regular,
        color:colors.primary
    }
})