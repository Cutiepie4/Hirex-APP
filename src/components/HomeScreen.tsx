import { Button, Colors } from 'react-native-ui-lib'
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <View style={styles.container}>
            <View style={styles.welcome}>
                <Text style={styles.welcomeText}>Welcome back</Text>
                <Text style={styles.infoText}>Fill your details or continue</Text>
                <Text style={styles.infoText}>with social media</Text>
            </View>
            <View style={styles.login}>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/mail.png')} style={{ width: 20, height: 20, marginTop: 14, marginHorizontal: 5 }}></Image>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={{width: '90%'}}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/locked.png')} style={{ width: 21, height: 21, marginTop: 14, marginHorizontal: 5 }}></Image>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Password"
                        secureTextEntry={!showPassword}
                        style={{width: '80%'}}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{position: 'absolute', right: 10 }}>
                        <Image source={require('../../assets/hidden.png')} style={{ width: 16, height: 16, marginTop: 16, position: 'absolute', right: 10 }}></Image>
                    </TouchableOpacity>

                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </View>

                <View style={{ width: '100%', marginTop: 40 }}>
                    <Button label={'LOG IN'} borderRadius={10} style={{ height: 50 }} backgroundColor={Colors.blue40} />
                </View>

                <View style={{ marginTop: 35 }}>
                    <Text style={styles.infoText}>--Or Continue with --</Text>
                </View>

                <View style={{ marginTop: 35, flexDirection: 'row' }}>
                    <Image source={require('../../assets/google.png')} style={{ width: 55, height: 55, marginRight: 15 }}></Image>
                    <Image source={require('../../assets/facebook.png')} style={{ width: 55, height: 55 }}></Image>
                </View>

                <View style={{marginTop: 35,flexDirection: 'row'}}>
                    <Text>New User?</Text>
                    <Text style={{ fontWeight: 'bold' }}> Create Account</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },

    welcome: {
        marginVertical: '20%',
        justifyContent: 'center',
    },

    login: {
        alignItems: 'center',
    },

    welcomeText: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    infoText: {
        fontSize: 16,
        textAlign: 'left',
        color: 'gray'
    },

    inputContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        height: 50,
        marginBottom: 10,
        width: '100%'
    },

    input: {
        paddingLeft: 10,
    },

    forgotPassword: {
        marginTop: 10,
        color: 'gray',
        right: 5,
        bottom: -20,
        position: 'absolute',
        // backgroundColor: 'red'
        textDecorationLine: 'underline',
    },
});

export default HomeScreen;
