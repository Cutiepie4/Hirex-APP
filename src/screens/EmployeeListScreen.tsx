import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, Modal, FlatList, SafeAreaView, StatusBar, Image, Animated } from 'react-native';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import scheduleService from '../service/ScheduleService';

const EmployeeListScreen = ({ navigation, route }) => {
    const reservation = route.params?.reservation;
    const [leaveList, setLeaveList] = useState();
    const [leaveStatus, setLeaveStatus] = useState({});
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const handleGoBack = () => {
        navigation.goBack();
    }
    useEffect(() => {
        scheduleService.getLeaveReasonByItem(route.params?.reservation?.id)
            .then((response) => {
                // Assuming the response contains the array directly
                setLeaveList(response);
            }).catch((error) => {
                console.error('Error fetching leave reasons:', error);
                Alert.alert('Error', 'Unable to fetch leave reasons');
            });
    }, [route.params?.reservation]);
    // const employeesAtWork = employees.filter(employee => employee.task !== null).length;
    const handleAcceptLeave = (id) => {
        setLeaveStatus(prevStatus => ({ ...prevStatus, [id]: 'accepted' }));
    }

    const handleRejectLeave = (id) => {
        setLeaveStatus(prevStatus => ({ ...prevStatus, [id]: 'rejected' }));
    }
    const renderEmployee = ({ item, index }) => {
        const backgroundColor = item.isAccept === null ? leaveStatus[item.id] === 'true' ? 'green' : leaveStatus[item.id] === 'false' ? 'red' : 'white' : 'white';
        const inputRange = [-1, 0, 150 * index, 150 * (index + 2)]
        const opacityInputRange = [-1, 0, 150 * index, 150 * (index + 1)]
        const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0]
        })
        const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0]
        })
        return (
            <Animated.View style={{
                // top: 20,
                height: 130,
                padding: 20,
                marginBottom: 20,
                backgroundColor: backgroundColor,
                borderRadius: 15,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 10
                },
                shadowOpacity: .3,
                shadowRadius: 10,
                opacity,
                transform: [{ scale }]
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
                >
                    <Text style={{ fontSize: 22, fontWeight: '700' }}>{item.employee.firstName} {item.employee.lastName}</Text>
                    {!leaveStatus[item.id] && item.reason && <TouchableOpacity onPress={() => handleAcceptLeave(item.id)} >
                        <AntDesign name="check" size={24} color="green" />
                    </TouchableOpacity>}

                </View>
                <Text style={{ fontSize: 18, opacity: .7 }}>Địa chỉ: {item.employee.address}</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
                >
                    <Text style={{ fontSize: 12, opacity: .8, color: '#0099cc' }}>{item.employee.email}</Text>
                    {!leaveStatus[item.id] && item.reason && <TouchableOpacity onPress={() => handleRejectLeave(item.id)}>
                        <Feather name="x" size={24} color="red" />
                    </TouchableOpacity>}
                </View>
                <Text style={{ fontSize: 16 }}>
                    {item.reason && `Lý do: ${item.reason}`}
                </Text>
            </Animated.View>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            {/* <Text style={styles.summary}>Number of Employees at Work: {employeesAtWork}</Text> */}
            {/* <Image
                source={require('../../assets/STRAY KIDS REACTION.jpeg')}
                style={{ position: 'absolute', }}
                blurRadius={80}
            /> */}

            <Animated.FlatList
                data={leaveList}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                keyExtractor={(leave) => leave.id.toString()}
                renderItem={renderEmployee}
                contentContainerStyle={{
                    padding: 20,
                    paddingTop: StatusBar.currentHeight || 42
                }}
                showsVerticalScrollIndicator={false}
            />
            <TouchableOpacity style={[styles.backButton, { flexDirection: 'row' }]} onPress={handleGoBack}>
                <Ionicons name="chevron-back" size={24} color="#007BFF" />
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    item: {
        top: 20,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
    },
    summary: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    leaveReason: {
        fontSize: 14,
        color: '#888',
    },
    modalClose: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    modalCloseText: {
        fontSize: 18,
        color: '#1e90ff',
    },
    button: {
        backgroundColor: '#ff6347',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 16,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 10,
    },
    backButtonText: {
        color: '#007BFF',
        fontSize: 16,
    },
});

export default EmployeeListScreen;