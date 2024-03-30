import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import BANNERTITLE from '../assets/images/banner_title.png'
import BANNERWELCOM1 from '../assets/images/banner_welcome1.png'
import BANNERWELCOM from '../assets/images/banner_welcome.png'
import NEXT from '../assets/images/next.png'
import RootNavigation from '../config/RootNavigation'



const Welcome = () => {

    const handlePressNext = () => {
        RootNavigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', width: '100%', marginTop: '50%' }}>
                <Image style={{ marginHorizontal: 24 }}
                    source={BANNERWELCOM}
                />
            </View>
            <View style={{ flexDirection: 'row', width: '100%', marginTop: '20%' }}>
                <Image
                    style={{ marginHorizontal: 24 }}
                    source={BANNERTITLE}
                />
            </View>
            <View style={{ flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                <Image
                    style={{ marginHorizontal: 24 }}
                    source={BANNERWELCOM1}
                />
            </View>
            <View style={{ flexDirection: 'row', width: '100%' }}>
                <TouchableOpacity onPress={handlePressNext}>
                    <Image
                        style={{ marginLeft: '85%', marginTop: '20%' }}
                        source={NEXT}
                    />
                </TouchableOpacity>
            </View>

        </View >
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
})