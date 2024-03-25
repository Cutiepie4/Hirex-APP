import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { colors, fonts, sizes } from "../../../constant";
import profile from '../../../assets/images/profile.png'
import Card from '../../../utils/CardComponent/Card3'
import google from '../../../assets/images/google.png'
import dribble from '../../../assets/images/dribbble.png'

const opportunity=[
    {title:"UI/UX Designer",subtitle:"Google inc . Carlifonia, USA",icon:google,color:colors.grey_light,amount:15},
    {title:"Lead Designer",subtitle:"Dribble inc . Carlifonia, USA",icon:dribble,color:colors.pinky,amount:20},
    {title:"UI/UX Designer",subtitle:"Google inc . Carlifonia, USA",icon:google,color:colors.grey_light,amount:15},
    {title:"Lead Designer",subtitle:"Dribble inc . Carlifonia, USA",icon:dribble,color:colors.pinky,amount:20},
    {title:"UI/UX Designer",subtitle:"Google inc . Carlifonia, USA",icon:google,color:colors.grey_light,amount:15},
    {title:"Lead Designer",subtitle:"Dribble inc . Carlifonia, USA",icon:dribble,color:colors.pinky,amount:20},
    {title:"UI/UX Designer",subtitle:"Google inc . Carlifonia, USA",icon:google,color:colors.grey_light,amount:15},
    {title:"Lead Designer",subtitle:"Dribble inc . Carlifonia, USA",icon:dribble,color:colors.pinky,amount:20},
]
function Home({ navigation }) {
    const home = homeStyle
    React.useEffect(() => {

    }
        , [navigation]
    )
    return (
        <View style={home.container}>
            <View style={{ position: 'absolute', right: 25, marginTop: '5%' }}>
                <View style={{ height: 45, width: 45, borderRadius: 50, position: 'relative' }}>
                    <Image style={{ height: 45, width: 45 }} source={profile} />
                </View>
            </View>
            <View>
                <Text style={home.home_text_1}>Hello {"\n"}Orlando Diggs.</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }}>
                <View style={{ marginTop: 20 }}>
                    <Text style={home.home_text_3}>My Job List</Text>
                </View>
                <View style={{marginTop:20}}>
                    {opportunity.map((item,i)=>{
                        return (<Card icon={item.icon} title={item.title} subtitle={item.subtitle} color={item.color} key={i} amount={item.amount} />)
                    })}
                </View>
            </ScrollView>



        </View>
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
    }
})