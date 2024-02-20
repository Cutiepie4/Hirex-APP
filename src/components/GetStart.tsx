import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Colors } from 'react-native-ui-lib'


const GetStart = () => {
    const navigation = useNavigation();

    const handleNavigateToLogin = () => {
        navigation.navigate('HomeScreen');
    };

    return (
        <View style={{flex: 100}}>
            <View style={{flex: 60}}>

            </View>
            <View style={styles.container}>
                <Text style={{fontWeight: 600, fontSize: 40}}>Find a Perfact </Text>
                <Text style={{fontWeight: 600, fontSize: 40}}>Job Match</Text>
                <Text style={{ color: 'gray', fontSize: 18,}}> Finding your dream job is more easire</Text>
                <Text style={{ color: 'gray', fontSize: 18,}}> and faster with JobHub</Text>
                <Button marginT-30 style={{ width: '80%', height: 50 }} borderRadius={10} backgroundColor={Colors.blue40} label="Let's Get Started ->" onPress={handleNavigateToLogin} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 40,
        paddingHorizontal: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default GetStart;
