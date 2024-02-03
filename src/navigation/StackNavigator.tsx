import { StyleSheet, Text, View } from 'react-native'
import { SplashScreen} from 'expo-router';
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../components/HomeScreen';
import MessageScreen from '../screens/MessageScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from 'expo-font';

const StackNavigator = () => {
    const [loaded, error] = useFonts({
        'mon': require('../../assets/fonts/Montserrat-Regular.ttf'),
        'mon-sb': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
        'mon-b': require('../../assets/fonts/Montserrat-Bold.ttf'),
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
                    tabBarActiveTintColor: "#50C7C7",
                    tabBarLabelStyle: { fontFamily: 'mon-sb' },
                }}
            >
                {tabScreen("Home", "home-outline", HomeScreen)}
                {tabScreen("Message", "chatbox-ellipses-outline", MessageScreen)}
                {tabScreen("Schedule", "calendar-outline", ScheduleScreen)}
                {tabScreen("Profile", "person-circle-outline", ProfileScreen)}
                {tabScreen("Setting", "settings", SettingScreen)}
            </Tab.Navigator>
        );
    }

    const tabScreen = (name, iconName, component) => {
        return (
            <Tab.Screen
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
            <Stack.Navigator>
                <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={MessageScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})