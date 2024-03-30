import React from 'react';
import 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store/store';
import { Provider, } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import { navigationRef } from './src/config/RootNavigation';
import { Login, Signup } from './src/screens';
import Banner from './src/screens/Banner';
import Welcome from './src/screens/Welcome';
import ChooseRole from './src/screens/ChooseRole';
import Information from './src/screens/Information';
import Profile from './src/screens/Profile';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import AboutMeScreen from './src/screens/AboutMeScreen';
import Experience from './src/screens/Experience';
import Education from './src/screens/Education';
import Skill from './src/screens/Skill';
import Certification from './src/screens/Certification';
import Account from './src/screens/Account';
import Setting from './src/screens/Setting';
import UpdatePassword from './src/screens/UpdatePassword';
import { LogBox } from 'react-native';
import Navbar from './src/components/Navbar';
import HomeTabs from './src/screens/HomeTabs';
import Company from './src/screens/Company';

const listScreens = {
  // HomeScreen: HomeScreen,
  Banner: Banner,
  Login: Login,
  Signup: Signup,
  ChatScreen: ChatScreen,
  Welcome: Welcome,
  ChooseRole: ChooseRole,
  Information: Information,
  // Profile: Profile,
  Experience: Experience,
  AboutMeScreen: AboutMeScreen,
  Education: Education,
  Skill: Skill,
  Certification: Certification,
  Account: Account,
  // Setting: Setting,
  UpdatePassword: UpdatePassword,
  Company: Company

}

const App = () => {
  const Stack = createStackNavigator();
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  return (
    <ActionSheetProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {/* <Stack.Screen name="HomeTabs" component={HomeTabs} /> */}
              {/* {Object.entries(listScreens).map(([name, component]) => (
                <Stack.Screen key={name} name={name} component={component} />
              ))} */}
              <Stack.Screen name="Banner" component={Banner} />
              <Stack.Screen name="HomeTabs" component={HomeTabs} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="ChooseRole" component={ChooseRole} />
              <Stack.Screen name="Information" component={Information} />
              <Stack.Screen name="Account" component={Account} />
              <Stack.Screen name="AboutMeScreen" component={AboutMeScreen} />
              <Stack.Screen name="Experience" component={Experience} />
              <Stack.Screen name="Education" component={Education} />
              <Stack.Screen name="Skill" component={Skill} />
              <Stack.Screen name="Certification" component={Certification} />
              <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
              <Stack.Screen name="Company" component={Company} />
              <Stack.Screen name="Signup" component={Signup} />


            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </ActionSheetProvider>

  );
}

export default App;