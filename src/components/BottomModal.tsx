import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ReactNode } from 'react'
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
            animationType="slide"
            visible={showBottomModal}
            statusBarTranslucent
            transparent
        >
            <TouchableOpacity
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}
                onPress={() => setShowBottomModal(false)}
            >
                <View style={{
                    backgroundColor: 'white',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
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
            </TouchableOpacity>
        </Modal>
    )
}

export default BottomModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});