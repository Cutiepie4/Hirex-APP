import React from "react";
import { Image, View, Dimensions, ScrollView, Platform, StyleSheet, Text, SafeAreaView } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

const Profile = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: widthScreen, height: heightScreen / 5 }}>
                <Image source={require('../../assets/b.png')} style={{ width: '100%', height: '100%' }}></Image>
                <View style={{ width: widthScreen, position: 'absolute', top: 10 }}>
                    <View style={{ width: widthScreen / 4, margin: 30, alignItems: 'center' }}>
                        <View >
                            <View style={{ borderRadius: 50, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
                                <FontAwesome name="user-circle" size={80} color="" />
                            </View>
                            <FontAwesome name="camera-retro" size={24} color="black" style={{ position: 'absolute', bottom: 0, right: 0 }} />

                        </View>
                        <Text style={styles.name}>Orlando Diggs</Text>
                        <Text>Applicant</Text>
                    </View>
                </View>
            </View>
            <ScrollView >

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        // paddingTop: Platform.OS === 'android' ? 45 : 0,
        // marginHorizontal: 16,
        // paddingBottom: 10s
    },

    name: {
        fontSize: 18,
        color: '#ffffff'
    }
})

export default Profile