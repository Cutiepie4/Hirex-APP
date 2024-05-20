import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { colors, fonts, sizes } from "@/theme";
import profile from '@assets/images/profile.png'
import job from '@assets/images/job.png'
import Card from '@/components/Card/CardJobEmployer'
import Container from "@/components/Container";
import RootNavigation from "@/route/RootNavigation";
import { BASE_API } from "@/services/BaseApi";
import { toastResponse } from "@/utils/toastResponse";


export const Home2 = () => {
    const home = homeStyle
    const [jobs, setJobs] = React.useState([])

    React.useEffect(() => {
        const fetchData = async () => {
            const res = await BASE_API.get('/works');
            setJobs(res.data)
        };

        fetchData()
            .catch((err) => {
                toastResponse({ type: 'error', content: err.response.data || err.message })
            });
    }, [])

    return (
        <Container>
            <View style={home.container}>
                <View style={{ position: 'absolute', right: 25, marginTop: '5%' }}>
                    <View style={{ height: 45, width: 45, borderRadius: 50, position: 'relative' }}>
                        <Image style={{ height: 45, width: 45 }} source={profile} />
                    </View>
                </View>
                <View>
                    <Text style={home.home_text_1}>Hello {"\n"}</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }}>
                    <View style={{ marginTop: 20 }}>
                        <Text style={home.home_text_3}>My Job List</Text>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        {jobs.map((item, i) => {
                            return (<View key={i} style={{ marginTop: 5, marginBottom: 5 }}>
                                <Card
                                    name={item.name}
                                    address={item?.address}
                                    salary={`${item?.wage}tr VND`}
                                    onPress={() => { RootNavigation.navigate('Description', { workId: item?.id }) }}
                                    onPress2={() => { RootNavigation.navigate('Description2', { workId: item?.id }) }}
                                />
                            </View>)
                        })}
                    </View>
                </ScrollView>
            </View>
        </Container>
    )
}

export default Home2;


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
        fontFamily: fonts.dMSans.bold,
        fontSize: sizes.h22,
        color: colors.primary,
    },
    home_text_2: {
        fontFamily: fonts.dMSans.regular,
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
        fontFamily: fonts.dMSans.semiBold,
        fontSize: sizes.h13,
        color: 'white'
    },
    home_text_3: {
        fontSize: sizes.h16,
        fontFamily: fonts.dMSans.bold,
        color: colors.primary
    },
    home_text_4: {
        fontSize: sizes.h14,
        fontFamily: fonts.dMSans.regular,
        color: colors.primary
    }
})