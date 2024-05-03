import { Button, FlatList, Keyboard, Modal, StyleSheet, Switch, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import TimePicker from './TimePicker';
import { ExtendedAgendaEntry } from '../screens/ScheduleScreen';
import TakeOffModal from './TakeOffModal';
import debounce from 'lodash.debounce';
import scheduleService from '../services/ScheduleService';


const ItemsDetail = (props: any) => {
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<any>('Không có');
    const [showTakeOffModal, setShowTakeOffModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(props.reservationPick.title);
    const [notes, setNotes] = useState<string>(props.reservationPick.notes);
    const [isShowTakeOff, setIsShowTakeOff] = useState<boolean>(false);

    useEffect(() => {
        scheduleService.getCheckExistReason(props.reservationPick.id).then(res => {
            if (res.data === true) {
                setIsShowTakeOff(false)
            }
            else {
                setIsShowTakeOff(true)
            }
        }).catch(error => {
            console.error('Error check item:', error);
        });
    }, [])
    const options = {
        'Không có': false,
        'Vào lúc diễn ra sự kiện': 0,
        'Trước 30 phút': -30,
        'Trước 1 giờ': -60,
        'Trước 2 giờ': -120,
    };

    const handleShowTakeOffModal = () => {
        setShowTakeOffModal(true);
    };

    const handleHideTakeOffModal = () => {

        setShowTakeOffModal(false);
    };

    const handleTakeOff = (reason: string) => {
        const leave = {
            leaveReason: reason,
            itemId: props.reservationPick.id,
        }
        scheduleService.createLeave(leave).then(res => {
            console.log('Item added:', res.data);
        }).catch(error => {
            console.error('Error adding item:', error);
        });
        handleHideTakeOffModal();
    };

    const handleOptionSelect = (optionKey) => {
        setSelectedOption(optionKey);
        console.log(options[optionKey])
        // Gán giá trị tương ứng từ object options vào state hoặc biến để xử lý logic
        const optionValue = options[optionKey];
        // Lưu giá trị này để sử dụng trong logic ứng dụng của bạn
        // ...
        setShowOptions(false);
    };
    const debouncedOnChange = useCallback(
        debounce((key, value) => {
            props.setReservationPick((prev) => ({ ...prev, [key]: value }));
            props.setSubmit(false);
        }, 500),
        []
    );

    const onTitleChange = (value) => {
        debouncedOnChange('title', value);
    };

    const onNotesChange = (value) => {
        debouncedOnChange('notes', value);
    };
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.taskContainer}>
                <TextInput
                    style={styles.title}
                    placeholder="Enter your title"
                    value={title}

                    onChangeText={(value) => {
                        setTitle(value)
                        props.setSubmit(true)
                        onTitleChange(value)

                    }}
                    editable={props.reservationPick.type !== 'working'}
                />
                {/* <CustomTextInput
                    multiline={false}
                    style={styles.title}
                    placeholder="Enter your title"
                    value={props.reservationPick.title}
                    onChangeText={(value) => {
                        props.setReservationPick({ ...props.reservationPick, title: value });
                    }}
                    editable={props.reservationPick.type !== 'working'}
                /> */}
                <View style={styles.separator} />
                <View>
                    <Text
                        style={{
                            color: '#9CAAC4',
                            fontSize: 16,
                            fontWeight: '600'
                        }}
                    >
                        Times
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 3
                    }}>
                        <Text><TimePicker editable={props.reservationPick.type !== 'working'} timeStart={props.reservationPick.start} reservationPick={props.reservationPick} setTime={props.setReservationPick} /></Text>
                        <Text style={{
                            color: '#9CAAC4',
                            fontSize: 16,
                            fontWeight: '600'
                        }}>-</Text>
                        <Text><TimePicker editable={props.reservationPick.type !== 'working'} timeEnd={props.reservationPick.end} reservationPick={props.reservationPick} setTime={props.setReservationPick} /></Text>
                    </View>
                </View>
                <View style={styles.notesContent} />
                <View>
                    <Text
                        style={{
                            color: '#9CAAC4',
                            fontSize: 16,
                            fontWeight: '600'
                        }}
                    >
                        Notes
                    </Text>
                    <TextInput
                        style={styles.notesInput}
                        placeholder="Enter notes about the task."
                        value={notes}
                        onChangeText={(value) => {
                            setNotes(value)
                            props.setSubmit(true)
                            onNotesChange(value)

                        }}
                        editable={props.reservationPick.type !== 'working'}
                        multiline={true}
                    />
                </View>
                <View style={styles.separator} />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <View>
                        <Text
                            style={{
                                color: '#9CAAC4',
                                fontSize: 16,
                                fontWeight: '600'
                            }}
                        >
                            Notification
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => setShowOptions(true)}>
                        <Text style={styles.selectedOption}>{selectedOption}</Text>
                    </TouchableOpacity>
                    <Modal
                        visible={showOptions}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => setShowOptions(false)}
                    >
                        <TouchableWithoutFeedback onPress={() => setShowOptions(false)}>
                            <View style={styles.modalOverlay} />
                        </TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            <FlatList
                                data={Object.keys(options)}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.optionItem}
                                        onPress={() => handleOptionSelect(item)}
                                    >
                                        <Text style={styles.optionText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </Modal>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {props.reservationPick.type == 'working' && (
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <TouchableOpacity
                                disabled={!isShowTakeOff}
                                style={[
                                    styles.updateButton,
                                    { backgroundColor: isShowTakeOff ? '#60a3bc' : '#ccc' }
                                ]}
                                onPress={handleShowTakeOffModal}
                            >
                                <Text
                                    style={{
                                        fontSize: 18,
                                        textAlign: 'center',
                                        color: '#fff'
                                    }}
                                >
                                    TAKE OFF
                                </Text>
                            </TouchableOpacity>

                            <TakeOffModal
                                visible={showTakeOffModal}
                                onRequestClose={handleHideTakeOffModal}
                                onTakeOff={handleTakeOff}
                            />
                        </View>
                    )}

                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ItemsDetail

const styles = StyleSheet.create({
    taskListContent: {
        height: 100,
        width: 327,
        alignSelf: 'center',
        borderRadius: 10,
        shadowColor: '#2E66E7',
        backgroundColor: '#ffffff',
        marginTop: 10,
        marginBottom: 10,
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.2,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    viewTask: {
        position: 'absolute',
        bottom: 40,
        right: 17,
        height: 60,
        width: 60,
        backgroundColor: '#2E66E7',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#2E66E7',
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 30,
        shadowOpacity: 0.5,
        elevation: 5,
        zIndex: 999
    },
    deleteButton: {
        backgroundColor: '#ff6347',
        width: 100,
        height: 38,
        alignSelf: 'center',
        marginTop: 40,
        borderRadius: 5,
        justifyContent: 'center'
    },
    updateButton: {
        backgroundColor: '#50C7C7',
        width: 120,
        height: 38,
        alignSelf: 'center',
        marginTop: 40,
        justifyContent: 'center',
        marginRight: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
    },
    createTaskButton: {
        width: 230,
        height: 38,
        alignSelf: 'center',
        marginTop: 40,
        borderRadius: 5,
        justifyContent: 'center'
    },
    separator: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#979797',
        alignSelf: 'center',
        marginVertical: 20
    },
    notesContent: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#979797',
        alignSelf: 'center',
        marginVertical: 20
    },
    learn: {
        height: 23,
        width: 51,
        backgroundColor: '#F8D557',
        justifyContent: 'center',
        borderRadius: 5
    },
    design: {
        height: 23,
        width: 59,
        backgroundColor: '#62CCFB',
        justifyContent: 'center',
        borderRadius: 5,
        marginRight: 7
    },
    readBook: {
        height: 23,
        width: 83,
        backgroundColor: '#4CD565',
        justifyContent: 'center',
        borderRadius: 5,
        marginRight: 7
    },
    title: {
        height: 25,
        borderColor: '#5DD976',
        borderLeftWidth: 1,
        paddingLeft: 8,
        fontSize: 19,
        marginTop: 30,
    },
    taskContainer: {
        height: 475,
        width: 327,
        alignSelf: 'center',
        borderRadius: 20,
        shadowColor: '#2E66E7',
        backgroundColor: '#ffffff',
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowRadius: 20,
        shadowOpacity: 0.2,
        elevation: 5,
        padding: 22
    },
    selectedOption: {
        // fontFamily: 'mon-m',
        color: 'black',
        fontSize: 16,
        fontWeight: '600'
    },
    modalContent: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        paddingVertical: 10,
    },
    option: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        width: '100%',
        height: 150,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    optionItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
    },
    optionText: {
        // fontFamily: 'mon',
        fontSize: 18,
        color: '#333',
    },
    notesInput: {
        justifyContent: 'center',
        borderRadius: 5,
        padding: 10,
        height: 90,
        fontSize: 16,
        // fontFamily: 'mon',
    },
})