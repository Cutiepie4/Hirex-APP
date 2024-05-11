import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, Platform, Image, TouchableOpacity, Dimensions } from "react-native";
import { Entypo, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RootNavigation from "@/route/RootNavigation";


const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;
const SaveJob = () => {

    const listJob = ['Design', 'Full time', 'Senior designer']

    const navigation = useNavigation();

    const [data, setData] = useState([
        {
            image: require('../../assets/job1.png'),
            name: 'UI/UX Designer',
            location: 'Hà Đông, Hà Nội',
            time: '25 phút trước',
            wage: 20,
        },

        {
            image: require('../../assets/job2.png'),
            name: 'Lead Designer',
            location: 'Dribbble, Hà Nội',
            time: '20 phút trước',
            wage: 25,
        },
    ])

    const [dotThree, setDotThree] = useState(-1)
    const handleDotThree = (index: any) => {
        setDotThree(index === dotThree ? -1 : index);
        
    }

    const exitDotThree = () => {
        setDotThree(-1)
    }

    const deleteItem = () => {
        const newData = data.filter((item, index) => index !== dotThree);
        setData(newData); 
        setDotThree(-1)
    }

    return (
        <View style={{ height: '100%' }}>
            <ScrollView style={styles.container}>
                <View style={{ alignItems: 'center', rowGap: 20 }}>
                    <Text style={{ color: '#150B3D', fontSize: 22, fontWeight: '600' }}>Save Job</Text>
                    <TouchableOpacity style={{ position: 'absolute', right: 30, top: 5 }} onPress={() => RootNavigation.navigate('NoSave')}>
                        <Text style={{ color: '#FF9228' }}>Delete all</Text>
                    </TouchableOpacity>

                    {data.map((job, index) => (
                        <View style={styles.boxJob} key={index}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
                                <Image source={job.image} style={styles.image}></Image>
                                <TouchableOpacity onPress={() => handleDotThree(index)}>
                                    <Entypo name="dots-three-vertical" size={20} color="#524B6B" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ rowGap: 10 }}>
                                <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#003B40' }}>{job.name}</Text>
                                    <Text>{job.location}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', columnGap: 20, marginHorizontal: 10 }}>
                                    {listJob.map((job, index) => (
                                        <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 5, backgroundColor: '#f2f1ed', borderRadius: 10 }} key={index}>
                                            <Text style={{ color: '#003B40' }}>{job}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <View style={{ marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ color: '#AAA6B9', fontSize: 10, fontStyle: 'italic' }}>
                                        {job.time}
                                    </Text>

                                    <Text>${job.wage}k/Tháng</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {dotThree !== -1 && (
                <View style={styles.box}>
                    <TouchableOpacity style={{ height: 5, width: 65, backgroundColor: '#9B9B9B', alignSelf: 'center', borderRadius: 6 }} onPress={exitDotThree}></TouchableOpacity>
                    <View style={{ flexDirection: 'row', margin: 10 }}>
                        <Image source={data[dotThree].image} style={{ width: 60, height: 60, borderRadius: 50 }}></Image>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#003B40', alignSelf: 'center', marginLeft: 5 }}>{data[dotThree].name}</Text>
                    </View>
                    <View style={styles.blurLine}></View>
                    <TouchableOpacity style={styles.buttonDot} onPress={deleteItem} >
                        <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50, marginRight: 5 }}>
                            <Entypo name="trash" size={20} color="black" />
                        </View>
                        <View>
                            <Text style={{ fontWeight: '600' }}>Xoá</Text>
                            <Text style={{ color: '#AAA6B9' }}>Gỡ khỏi lịch sử lưu công việc</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonDot}>
                        <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50, marginRight: 5 }}>
                            <AntDesign name="checkcircleo" size={24} color="black" />
                        </View>
                        <View>
                            <Text style={{ fontWeight: '600' }}>Áp dụng</Text>
                            <Text style={{ color: '#AAA6B9' }}>Xác nhận tham gia công việc</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? 45 : 0,
        // marginHorizontal: 16,
        // height: heightScreen,
        // paddingBottom: 10s
    },

    boxJob: {
        width: '90%',
        backgroundColor: '#ffffff',
        borderRadius: 15,
        paddingBottom: 10
    },

    box: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: widthScreen,
        backgroundColor: 'white',
        elevation: 5,
    },

    image: {
        width: 60,
        height: 60,
        borderRadius: 50
    },

    blurLine: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#9B9B9B',
    },

    buttonDot: {
        flexDirection: 'row',
        alignContent: 'center',
        width: '95%',
        alignSelf: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        // backgroundColor: '#130160' 
    }
})

export default SaveJob