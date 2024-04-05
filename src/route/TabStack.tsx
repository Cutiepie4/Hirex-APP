import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome';
import Banner from '../screens/Banner';
import { useSelector } from 'react-redux';
import { RootReducer } from '../redux/store/reducer';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import Setting from '../screens/Setting';
import { Profile, AboutMeScreen, Experience, Education, Certification, Skill } from '../screens'; 

const homeScreenStack = {
    HomeScreen: HomeScreen,

}

const chatScreenStack = {
    ChatScreen: ChatScreen,
}

const pofileScreenStack = {
    Profile,
    AboutMeScreen,
    Experience,
    Education,
    Certification,
    Skill
}

const settingScreenStack = {
    Setting: Setting,
}

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {Object.entries(homeScreenStack).map(([name, component]) => (
                <Stack.Screen key={name} name={name} component={component} />
            ))}
        </Stack.Navigator>
    );
};

const ChatStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {Object.entries(chatScreenStack).map(([name, component]) => (
                <Stack.Screen key={name} name={name} component={component} />
            ))}
        </Stack.Navigator>
    );

};

const ProfileStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {Object.entries(pofileScreenStack).map(([name, component]) => (
                <Stack.Screen key={name} name={name} component={component} />
            ))}
        </Stack.Navigator>
    );
};

const SettingStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {Object.entries(settingScreenStack).map(([name, component]) => (
                <Stack.Screen key={name} name={name} component={component} />
            ))}
        </Stack.Navigator>
    );
};
export { HomeStack, ChatStack, ProfileStack, SettingStack }