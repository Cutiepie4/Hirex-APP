import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from '../config/RootNavigation';

const Header = (props: {
    title: string,
    leftHeader?: boolean,
    rightHeaderComponent?: ReactNode,
    rightHeaderCallback?: () => void,
    style?: ViewStyle
}) => {

    const {
        title,
        leftHeader,
        rightHeaderComponent,
        style,
        rightHeaderCallback
    } = props;

    return (
        <View style={[styles.container, style]}>
            <View style={{
                width: '30%',
            }}>
                {leftHeader &&
                    <TouchableOpacity
                        onPress={() => RootNavigation.pop()}
                    >
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                }
            </View>
            <View style={{
                width: '40%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={styles.titleFontStyle}>
                    {title}
                </Text>
            </View>
            <View style={{
                width: '30%',
                alignItems: 'flex-end'
            }}>
                {rightHeaderComponent &&
                    <TouchableOpacity
                        onPress={rightHeaderCallback}
                    >
                        {rightHeaderComponent}
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 12
    },
    titleFontStyle: {
        fontWeight: '600',
        fontSize: 16
    }
})