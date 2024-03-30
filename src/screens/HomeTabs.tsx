import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/Profile';
import Setting from '../screens/Setting';
import Navbar from '../components/Navbar'; // Sử dụng Navbar của bạn như một custom tab bar (nếu cần)
import AddCompany from '../screens/AddCompany';
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator 
      tabBar={props => <Navbar />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Setting" component={Setting} />
      <Tab.Screen name="AddCompany" component={AddCompany} />

    </Tab.Navigator>
  );
}
export default HomeTabs