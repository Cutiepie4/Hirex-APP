import { Button, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import moment from 'moment';
import TimePicker from './TimePicker';


const ItemsDetail = () => {

    return (
        <View style={styles.taskContainer}>
            <TextInput
                style={styles.title}
                placeholder="What do you need to do?"
            />
            <Text
                style={{
                    fontSize: 14,
                    color: '#BDC6D8',
                    marginVertical: 10
                }}
            >
                Suggestion
            </Text>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.readBook}>
                    <Text style={{ textAlign: 'center', fontSize: 14 }}>
                        Read book
                    </Text>
                </View>
                <View style={styles.design}>
                    <Text style={{ textAlign: 'center', fontSize: 14 }}>
                        Design
                    </Text>
                </View>
                <View style={styles.learn}>
                    <Text style={{ textAlign: 'center', fontSize: 14 }}>Learn</Text>
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
                    style={{
                        height: 25,
                        fontSize: 19,
                        marginTop: 3
                    }}
                    placeholder="Enter notes about the task."
                />
            </View>
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
                    alignItems: 'center'
                }}>
                    <Text><TimePicker /></Text>
                    <Text style={{
                        color: '#9CAAC4',
                        fontSize: 16,
                        fontWeight: '600'
                    }}>-</Text>
                    <Text><TimePicker /></Text>
                </View>
                {/* <TouchableOpacity
                    style={{
                        height: 25,
                        marginTop: 3
                    }}
                >
                    <Text style={{ fontSize: 19 }}>
                    </Text>
                </TouchableOpacity> */}
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
                        Alarm
                    </Text>
                    <View
                        style={{
                            height: 25,
                            marginTop: 3
                        }}
                    >
                        <Text style={{ fontSize: 19 }}>
                        </Text>
                    </View>
                </View>
                <Switch
                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <TouchableOpacity
                    style={styles.updateButton}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            textAlign: 'center',
                            color: '#fff'
                        }}
                    >
                        UPDATE
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            textAlign: 'center',
                            color: '#fff'
                        }}
                    >
                        DELETE
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
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
        backgroundColor: '#2E66E7',
        width: 100,
        height: 38,
        alignSelf: 'center',
        marginTop: 40,
        borderRadius: 5,
        justifyContent: 'center',
        marginRight: 20
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
        fontSize: 19
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
    }
})