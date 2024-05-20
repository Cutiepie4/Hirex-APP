import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import { colors, fonts, sizes } from "@/theme";
import profile from '@assets/images/profile.png'
import woman from '@assets/images/woman2.png'
import job from '@assets/images/job.png'
import Card from '@/components/Card/CardCompany'
import Container from "@/components/Container";
import RootNavigation from "@/route/RootNavigation";
import { BASE_API } from "@/services/BaseApi";
import { toastResponse } from "@/utils/toastResponse";



export const Company = () => {
    const company = companyStyle
    const [companies, setCompanies] = React.useState([])
    const [refreshing, setRefreshing] = React.useState(false);

    // const onRefresh = React.useCallback(() => {
    //   setRefreshing(true);
    //   setTimeout(() => {
    //     setRefreshing(false);
    //   }, 2000);
    // }, []);
  
    const fetchData = async () => {
        setRefreshing(true);
        setCompanies([])
        const res = await BASE_API.get('/companies');
        setCompanies(res.data)
        setRefreshing(false);
    };
    React.useEffect(() => {

        fetchData()
            .catch((err) => {
                toastResponse({ type: 'error', content: err.response.data || err.message })
            });
    }, [])

    return (
        <Container>
            <View style={company.container}>
                <View style={{ position: 'absolute', right: 25, marginTop: '5%' }}>
                    <View style={{ height: 45, width: 45, borderRadius: 50, position: 'relative' }}>
                        <Image style={{ height: 45, width: 45 }} source={profile} />
                    </View>
                </View>
                <View>
                    <Text style={company.company_text_1}>Hello {"\n"}</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
                    }
                >
                    <View style={{ marginTop: 20 }}>
                        <Text style={company.company_text_3}>Best Company</Text>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        {companies.map((item, i) => {
                            return (<View key={i} style={{ marginTop: 5, marginBottom: 5 }}>
                                <Card
                                    name={item.name}
                                    img={item?.imageBase64}
                                    avgOverallRate={item?.avgOverallRate}
                                    recommendPercent={item?.recommendPercent}
                                    onPress={() => { RootNavigation.navigate('CompanyDescription', { companyId: item.id }) }}
                                />
                            </View>)
                        })}
                    </View>
                </ScrollView>
            </View>
        </Container>
    )
}

export default Company;


const companyStyle = StyleSheet.create({
    container: {
        backgroundColor: colors.background_2,
        display: 'flex',
        position: 'relative',
        height: '100%',
        paddingTop: '10%',
        paddingLeft: 25,
        paddingRight: 25
    },
    company_text_1: {
        fontFamily: fonts.dMSans.bold,
        fontSize: sizes.h22,
        color: colors.primary,
    },
    company_text_2: {
        fontFamily: fonts.dMSans.regular,
        fontSize: sizes.h18,
        color: "white"
    },
    company_banner: {
        height: 160,
        backgroundColor: colors.primary,
        borderRadius: 6,
        display: 'flex',
        justifyContent: 'center',
        padding: 20
    },
    company_banner_button: {
        height: 35,
        width: 120,
        backgroundColor: colors.ultra,
        marginTop: 15, borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    company_banner_button_text: {
        fontFamily: fonts.dMSans.semiBold,
        fontSize: sizes.h13,
        color: 'white'
    },
    company_text_3: {
        fontSize: sizes.h16,
        fontFamily: fonts.dMSans.bold,
        color: colors.primary
    },
    company_text_4: {
        fontSize: sizes.h14,
        fontFamily: fonts.dMSans.regular,
        color: colors.primary
    }
})