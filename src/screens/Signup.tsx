import { View, Text, Image, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';


const Signup = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const nav = useNavigation();


    const handleSigupPress = () => {
        console.log('Login');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                        <TouchableOpacity onPress={() => nav.goBack()}>
                            <Ionicons name="arrow-back" size={24} color="black" style={{ marginRight: 10 }} />
                        </TouchableOpacity>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: 'bold',
                            marginVertical: 12,
                            textAlign: 'center',
                            color: COLORS.black
                        }}>
                            Create An Account
                        </Text>

                        <Text style={{
                            fontSize: 16,
                            color: COLORS.black
                        }}> Fill your details or continue with social media</Text>
                    </View>

                    <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                        <Text style={{ fontSize: 12, color: COLORS.black, marginBottom: 8, fontWeight: '900' }}>
                            Phone Number
                        </Text>
                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}>
                            <TextInput
                                placeholder='Phone Number'
                                placeholderTextColor={COLORS.black}
                                keyboardType='email-address'
                                style={{
                                    width: "100%"
                                }}
                            />
                        </View>
                    </View>

                    <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                        <Text style={{ fontSize: 12, color: COLORS.black, marginBottom: 8, fontWeight: '900' }}>
                            Password
                        </Text>
                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}>
                            <TextInput
                                placeholder='Password'
                                placeholderTextColor={COLORS.black}
                                secureTextEntry={isPasswordShown}
                                style={{
                                    width: "100%"
                                }}
                            />

                            <TouchableOpacity
                                onPress={() => setIsPasswordShown(!isPasswordShown)}
                                style={{
                                    position: "absolute",
                                    right: 12
                                }}
                            >
                                {
                                    isPasswordShown == true ? (
                                        <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                    ) : (
                                        <Ionicons name="eye" size={24} color={COLORS.black} />
                                    )
                                }

                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginBottom: 12, paddingLeft: 15, paddingRight: 15 }}>
                        <Text style={{ fontSize: 12, color: COLORS.black, marginBottom: 8, fontWeight: '900' }}>
                            Retype Password
                        </Text>
                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}>
                            <TextInput
                                placeholder='Retype Password'
                                placeholderTextColor={COLORS.black}
                                keyboardType='email-address'
                                style={{
                                    width: "100%"
                                }}
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
                                borderColor: COLORS.grey,
                                marginRight: 4,
                                borderRadius: 10,
                                backgroundColor: COLORS.lavendar,
                                alignSelf: 'center'
                            }}
                        >
                            <Image
                                source={require('../assets/google.png')}
                                style={{ height: 30, width: 30, marginRight: 8 }}
                                resizeMode="contain"
                            />
                            <Text style={{ fontSize: 15, fontWeight: '900', marginVertical: 12, color: COLORS.black }}>SIGN IN WITH GOOGLE</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginVertical: 22
                    }}>
                        <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account ?</Text>
                        <Pressable
                            onPress={() => navigation.navigate("Login")}
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

export default Signup