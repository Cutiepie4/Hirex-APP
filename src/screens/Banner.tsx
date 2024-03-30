import { View, Text, Image } from 'react-native'
import { useEffect } from 'react'
import Container from '../components/Container'
import COLORS from '../constants/colors'
import { deepPurple } from '../styles/styles'
import BANNER from '../assets/images/banner.png'
import { useNavigation } from '@react-navigation/native';
import RootNavigation from '../config/RootNavigation'


const Banner = () => {

    useEffect(() => {
        const timer = setTimeout(() => {
            RootNavigation.navigate('Welcome');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);


    return (
        <Container statusBarColor={deepPurple} statusBarContentColor='light'>
            <View style={{
                flex: 1,
                backgroundColor: deepPurple,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Image
                        source={BANNER}
                        style={{ height: 50, width: 50 }}
                        resizeMode="contain"
                    />
                </View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{ color: 'white', fontSize: 21.34 }}>Hirex</Text>
                </View>
            </View>
        </Container>

    )
}

export default Banner