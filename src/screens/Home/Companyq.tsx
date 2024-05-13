import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, Platform, Dimensions, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import { Ionicons, EvilIcons, Feather } from '@expo/vector-icons';
import Search from "../../components/Search";
import { useNavigation } from '@react-navigation/native';
import RootNavigation from "@/route/RootNavigation";

const heightScreen = Dimensions.get('window').height;

const Companyq = (props) => {
    const navigation = useNavigation();
    const [searchValue, setSearchValue] = useState('');

    const handleClearText = () => {
        setSearchValue('');
    };
    
    const companys = [
        { title: "UI/UX Designer", subtitle: "Google inc . Carlifonia, USA", icon: require('../../assets/job1.png') },
        { title: "Lead Designer", subtitle: "Dribble inc . Carlifonia, USA", icon: require('../../assets/job2.png') },
        { title: "UI/UX Designer", subtitle: "Google inc . Carlifonia, USA", icon: require('../../assets/job3.png') },
        { title: "Apple", subtitle: "Dribble inc . Carlifonia, USA", icon: require('../../assets/job4.png') },
        { title: "UI/UX Designer", subtitle: "Google inc . Carlifonia, USA", icon: require('../../assets/job5.png') },
        { title: "Lead Designer", subtitle: "Dribble inc . Carlifonia, USA", icon: require('../../assets/job2.png') },
        { title: "UI/UX Designer", subtitle: "Google inc . Carlifonia, USA", icon: require('../../assets/job1.png') },
        { title: "Adobe", subtitle: "Company inc . Computer software", icon: require('../../assets/job5.png') },
    ];

    // const addJob = () => {
    //     RootNavigation.navigate('AddJob', {
    //         idEmployer: idEmployer
    //     });
    // };

    const filteredCompanies = companys.filter(company => {
        return company.title.toLowerCase().includes(searchValue.toLowerCase());
    });

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{ color: '#150B3D', fontSize: 22, fontWeight: '600', textAlign: 'center', width: '100%' }}>Company</Text>
            </View>
            <View style={styles.search}>
                <EvilIcons name="search" size={26} color="gray" style={{ marginLeft: 6 }} />
                <Search
                    text={'Tìm kiếm'}
                    button={''}
                    width={'80%'}
                    onChangeText={setSearchValue} 
                />
                <TouchableOpacity onPress={handleClearText}>
                    <Feather name="x" size={20} color="gray" style={{ marginRight: 6 }} />
                </TouchableOpacity>
            </View>

            <View>
                <ScrollView>
                    <View style={{ rowGap: 15 }}>
                        {filteredCompanies.map((company, index) => (
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }} key={index} onPress={() => RootNavigation.navigate('AddJob', {companyId: index})}>
                                <View key={index}>
                                    <Image source={company.icon} style={{ width: 50, height: 50 }}></Image>
                                </View>
                                <View style={{ rowGap: 5 }}>
                                    <Text>{company.title}</Text>
                                    <Text style={{ color: '#AAA6B9' }}>{company.subtitle}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'android' ? 45 : 0,
        height: heightScreen,
        marginHorizontal: 15,
        rowGap: 40
    },

    search: {
        flexDirection: 'row',
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
})

export default Companyq;
