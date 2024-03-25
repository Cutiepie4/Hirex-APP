import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { SplashScreen } from 'expo-router';
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen/HomeScreen5';
import MessageScreen from '../screens/MessageScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from 'expo-font';
import Faq from '../screens/Faq';
import Description from '../screens/Home/DescriptionScreen/DescriptionScreen';
import Description2 from '../screens/Home/DescriptionScreen/DescriptionScreen2';
import UploadCV from '../screens/Home/UploadCv/UploadCV';
import UploadCVSuccess from '../screens/Home/UploadCVSuccess/UploadCVSuccess';
import MainSearch from '../screens/Search/MainSearch/MainSearch';
import Specialization from '../screens/Search/Specialization/Specialization';

const listScreens = [
    {
        'name': 'Home',
        'component': HomeScreen,
        'icon': 'home-outline'
    },
    {
        'name': 'Message',
        'component': Faq,
        'icon': 'chatbox-ellipses-outline'
    },
    {
        'name': 'Schedule',
        'component': ScheduleScreen,
        'icon': 'calendar-outline'
    },
    {
        'name': 'Profile',
        'component': ProfileScreen,
        'icon': 'person-circle-outline'
    },
    {
        'name': 'Setting',
        'component': SettingScreen,
        'icon': 'settings'
    },
]

const StackNavigator = () => {
    const [loaded, error] = useFonts({
        'DMRegular': require('../../assets/fonts/Montserrat-Regular.ttf'),
        'DMMedium': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
        'DMBold': require('../../assets/fonts/Montserrat-Bold.ttf'),
        'DMSansRegular': require('../assets/fonts/DMSans-Regular.ttf'),
        'DMSansBold': require('../assets/fonts/DMSans-Bold.ttf'),
        'DMSansMedium': require('../assets/fonts/DMSans-Medium.ttf'),
        'OpenSansBold': require('../assets/fonts/OpenSansBold.ttf'),
        'OpenSansSemiBold': require('../assets/fonts/OpenSansSemiBold.ttf'),
        'OpenSansRegular': require('../assets/fonts/OpenSansRegular.ttf'),
    });
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    function BottomTabs() {
        return (
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarHideOnKeyboard: true,
                    tabBarStyle: { 
                        height: 70
                    }
                }}
            >
                {listScreens.map(screen => (
                    tabScreen(screen.name, screen.icon, screen.component)
                ))}

            </Tab.Navigator>
        );
    }

    const tabScreen = (name, iconName, component) => {
        return (
            <Tab.Screen
                key={name}
                name={name}
                component={component}
                options={{
                    tabBarLabelStyle: { color: 'black' },
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name={iconName} size={size} color={color} />
                    ),
                }}
            />
        );
    };
    return (
        <NavigationContainer>
            <StatusBar />
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: "white",
                // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
            }}>
                    <Stack.Navigator>
                        <Stack.Group screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="Main" component={BottomTabs} />
                            <Stack.Screen name="Login" component={HomeScreen} />
                            <Stack.Screen name="Register" component={MessageScreen} />
                            <Stack.Screen name="Description" component={Description} />
                            <Stack.Screen name="Description2" component={Description2} />
                            <Stack.Screen name="UploadCV" component={UploadCV} />
                            <Stack.Screen name="UploadCVSuccess" component={UploadCVSuccess} />
                            <Stack.Screen name="MainSearch" component={MainSearch} />
                            <Stack.Screen name="Specialization" component={Specialization} />
                        </Stack.Group>
                    </Stack.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})