import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import React, { ReactNode, useEffect, useState } from 'react'
import { deepPurple, regularPadding } from '@/styles/styles';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
export interface BottomModalOptions {
    icon?: ReactNode;
    title: string;
    onPressOption: () => void;
};

const BottomModal = (props: { showBottomModal: boolean, setShowBottomModal: (show) => void, options: BottomModalOptions[] }) => {
    const { showBottomModal, setShowBottomModal, options } = props;

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                key={index}
                style={{
                    paddingHorizontal: regularPadding * 2,
                    paddingVertical: regularPadding,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
                onPress={item.onPressOption}
            >
                {item.icon}
                <Text style={{
                    marginLeft: 20
                }}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <Modal
            isVisible={showBottomModal}
            onSwipeComplete={() => setShowBottomModal(false)}
            onBackdropPress={() => setShowBottomModal(false)}
            swipeDirection={['down']}
            statusBarTranslucent
            animationIn="slideInUp"
            animationOut="fadeOut"
            backdropTransitionOutTiming={0}
        >
            <View style={{
                flex: 1,
                justifyContent: 'flex-end',
                marginHorizontal: 0,
                bottom: 0
            }}>
                <View style={{
                    backgroundColor: 'white',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    paddingBottom: regularPadding * 1.5,
                }}>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <FontAwesome5 name="grip-lines" size={24} color={deepPurple} />
                    </View>
                    <FlatList
                        data={options}
                        renderItem={renderItem}
                    />
                </View>
            </View>
        </Modal>

    )
}

export default BottomModal;