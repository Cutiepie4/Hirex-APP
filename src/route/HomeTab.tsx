import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ChatStack, HomeStack, ProfileStack, SettingStack } from './TabStack';
import { Entypo } from '@expo/vector-icons';
import { orange, placeholderTextColor } from '../styles/styles';
import { Feather } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const HomeTab = () => {

    const iconSize = 22;

    const screenOptions = {
        tabBarStyle: {
            height: 60,
        },
    };

    const TabItems = [
        {
            name: 'Tab1',
            component: HomeStack,
            icon: <Entypo name="home" size={iconSize} />,
        },
        {
            name: 'Tab2',
            component: ProfileStack,
            icon: <FontAwesome6 name="address-card" size={iconSize} />,
        },
        {
            name: 'Tab3',
            component: ChatStack,
            icon: <Ionicons name="chatbox-outline" size={iconSize} />,
        },
        {
            name: 'Tab4',
            component: SettingStack,
            icon: <Feather name="user" size={iconSize} />,
        },

    ];

    return (
        <Tab.Navigator {...{ screenOptions }} >
            {TabItems.map((item) => (
                <Tab.Screen
                    key={item.name}
                    name={item.name}
                    component={item.component}
                    options={({ route }) => ({
                        headerShown: false,
                        tabBarIcon: ({ color, size, focused }) => {
                            return React.cloneElement(item.icon, {
                                color: focused ? orange : placeholderTextColor,
                            });
                        },
                        tabBarLabel: () => null,
                    })}
                />
            ))}
        </Tab.Navigator>
    );
};

export default HomeTab;
