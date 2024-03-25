import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TabViewExample from "./TabViewExample";
import { Image, Text, View } from "react-native";
import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from "./company.style";
import { icons } from "../constants";
import HomeScreen from "./HomeScreen";

const Tab = createMaterialTopTabNavigator();
const Faq = ({ companyLogo, jobTitle, companyName, location }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.logoBox}>
          {/* <Image
            source={{
              uri: checkImageURL(companyLogo)
                ? companyLogo
                : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
            }}
            style={styles.logoImage}
          /> */}
        </View>

        <View style={styles.jobTitleBox}>
          <Text style={styles.jobTitle}>UI Design Lead</Text>
        </View>

        <View style={styles.companyInfoBox}>
          <Text style={styles.companyName}>Spotify </Text>
          <View style={{ height: 1, width: 10, backgroundColor: 'black' }} />
          <View style={styles.locationBox}>
            <Image
              source={icons.location}
              resizeMode='contain'
              style={styles.locationImage}
            />
            <Text style={styles.locationName}>Torano Canada</Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', paddingRight: 50 }}>
          <MaterialCommunityIcons name="clock-time-four-outline" size={24} color="black" />
          <Text> Full Time</Text>
        </View>
        <Text style={{ paddingLeft: 50 }}>$1200/m</Text>
      </View>
      <Tab.Navigator

        screenOptions={{
          tabBarScrollEnabled: true, tabBarIndicatorStyle: {
            backgroundColor: "blue",
            height: 8,

          }
        }}
        sceneContainerStyle={{ backgroundColor: "white" }}

      >
        <Tab.Screen name="haha" component={HomeScreen} />
        <Tab.Screen name="hehe" component={HomeScreen} />

      </Tab.Navigator>
    </>
  );
};

export default Faq;