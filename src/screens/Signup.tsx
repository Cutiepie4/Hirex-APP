import { StyleSheet, View, Text, Image, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from '@/theme';
import { Ionicons } from "@expo/vector-icons";
import Button from '../components/Button';
import RootNavigation from '../route/RootNavigation'
import Input from '../components/Input';


const Signup = () => {
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [retryPassword, setRetryPassword] = useState('');


    const handleSigupPress = () => {
        RootNavigation.navigate('ChooseRole', {
            password: password,
            phoneNumber: phoneNumber,
            retryPassword: retryPassword,
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <TouchableOpacity onPress={() => RootNavigation.pop()}>
                        <Ionicons name="arrow-back" size={24} color="black" style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        textAlign: 'center',
                        color: colors.black
                    }}>
                        Create An Account
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: colors.black
                    }}> Fill your details or continue with social media</Text>
                </View>

                <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                    <Text style={{ fontSize: 12, color: colors.black, marginBottom: 8, fontWeight: '900' }}>
                        Phone Number
                    </Text>
                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: colors.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <Input placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} />

                    </View>
                </View>

                <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                    <Text style={{ fontSize: 16, color: colors.black, fontWeight: 'bold', marginBottom: 8 }}>
                        Password
                    </Text>
                    <View style={{
                        height: 48,
                        borderColor: colors.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={isPasswordShown} />
                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{ position: 'absolute', right: 12 }}
                        >
                            {isPasswordShown ? (
                                <Ionicons name="eye-off" size={24} color={colors.black} />
                            ) : (
                                <Ionicons name="eye" size={24} color={colors.black} />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.container}>
                    <Text style={styles.label}>
                        Retype Password
                    </Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Retype Password"
                            onChangeText={setRetryPassword}
                            value={retryPassword}
                        />
                    </View>
                </View>

                <Button
                    title="SIGN UP"
                    filled
                    onPress={handleSigupPress}
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                        height: 52,
                        width: 250,
                        alignSelf: 'center'
                    }}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => console.log('Pressed')}
                        style={{
                            marginTop: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            width: 250,
                            borderWidth: 1,
                            borderColor: colors.grey,
                            marginRight: 4,
                            borderRadius: 10,
                            backgroundColor: colors.lavendar,
                            alignSelf: 'center'
                        }}
                    >
                        <Image
                            source={require('../assets/google.png')}
                            style={{ height: 30, width: 30, marginRight: 8 }}
                            resizeMode="contain"
                        />
                        <Text style={{ fontSize: 15, fontWeight: '900', marginVertical: 12, color: colors.black }}>SIGN IN WITH GOOGLE</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: colors.black }}>Already have an account ?</Text>
                    <Pressable
                        onPress={() => RootNavigation.navigate("Login")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: '#FF9228',
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Sign in</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
        paddingLeft: 15,
        paddingRight: 15,
    },
    label: {
        fontSize: 12,
        color: colors.black,
        marginBottom: 8,
        fontWeight: '900'
    },
    inputContainer: {
        width: '100%',
        height: 48,
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 22
    },
    input: {
        width: '100%'
    }
});
export default Signup