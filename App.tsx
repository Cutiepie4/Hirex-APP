import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/config/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/components/trashes/HomeScreen';
import GetStart from './src/components/trashes/GetStart';
import ListJob from './src/components/trashes/ListJob';
import AllListJob from './src/components/trashes/AllListJob';
import Main from './src/components/coffee/Main';
import AddReview from './src/components/coffee/AddReview';
import { AppRegistry } from 'react-native';
import Review from './src/components/coffee/Review';
import AllReview from './src/components/coffee/AllReview';
import SearchScreen from './src/components/coffee/SearchScreen';
import ViewImage from './src/components/coffee/ViewImage';
import MainScreen from './src/components/MainScreen';
import AddJobDetail from './src/components/AddJobDetail';
import BoxList from './src/components/constaints/BoxList';
import Search from './src/components/constaints/Search';
import AddJob from './src/components/AddJob';
import Profile from './src/components/Profile';
import JobPosition from './src/components/JobPosition';
import SaveJob from './src/components/SaveJob';
import NoSave from './src/components/NoSave';
import NoFind from './src/components/NoFind';
import SearchJob from './src/components/SearchJob';
import Navbar from './src/components/constaints/Navbar';


const listScreens = {
    // GetStart: GetStart,
    // HomeScreen: HomeScreen,
    // ListJob: ListJob,
    // AllListJob: AllListJob,
    // Main : Main,
    // SearchScreen: SearchScreen,
    // AddReview: AddReview,
    // Review : Review,
    // AllReview : AllReview,
    // ViewImage: ViewImage,
    // MainScreen: MainScreen,
    // AddJobDetail: AddJobDetail,
    // BoxList: BoxList
    // Search: Search,
    // AddJob: AddJob,
    // Profile: Profile,
    // JobPosition: JobPosition
    // SaveJob: SaveJob
    // NoSave: NoSave
    // NoFind: NoFind
    // SearchJob: SearchJob
    Navbar: Navbar
}

const App = () => {
    const Stack = createStackNavigator();

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        {Object.entries(listScreens).map(([name, component]) => (
                            <Stack.Screen key={name} name={name} component={component} />
                        ))}
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}
export default App;