import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, Modal, FlatList, SafeAreaView, StatusBar, Image, Animated } from 'react-native';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';

const EmployeeListScreen = ({ navigation, route }) => {
    const [closeRequest, setCloseRequest] = useState<boolean>(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [leaveStatus, setLeaveStatus] = useState({});
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const handleGoBack = () => {
        navigation.goBack();
    }
    const employees = [
        { id: 1, name: 'Lê Mạnh Quyết', task: 'Working on A', position: 'Developer', department: 'IT', email: 'emp1@company.com' },
        { id: 2, name: 'Nguyễn Thế Thành', task: 'Designing UI/UX', position: 'Designer', department: 'Design', email: 'emp2@company.com' },
        { id: 3, name: 'Trương Quốc Việt', task: 'Market analysis', position: 'Analyst', department: 'Marketing', email: 'emp3@company.com' },
        { id: 4, name: 'Nguyễn Phúc Quân', task: null, leaveReason: 'Đi chơi', position: 'Sales', department: 'Sales', email: 'emp4@company.com' },
        { id: 5, name: 'Ngô Minh Quang', task: 'Customer support', position: 'Support', department: 'Customer Service', email: 'emp5@company.com' },
        { id: 6, name: 'Nguyễn Thế Thành', task: 'Designing UI/UX', position: 'Designer', department: 'Design', email: 'emp2@company.com' },
        { id: 7, name: 'Trương Quốc Việt', task: 'Market analysis', position: 'Analyst', department: 'Marketing', email: 'emp3@company.com' },
        { id: 8, name: 'Nguyễn Phúc Quân', task: null, leaveReason: 'Uống rượu mệt', position: 'Sales', department: 'Sales', email: 'emp4@company.com' },
        { id: 9, name: 'Ngô Minh Quang', task: 'Customer support', position: 'Support', department: 'Customer Service', email: 'emp5@company.com' },
    ];
    const employeesAtWork = employees.filter(employee => employee.task !== null).length;
    const handleAcceptLeave = (id) => {
        setLeaveStatus(prevStatus => ({ ...prevStatus, [id]: 'accepted' }));
    }

    const handleRejectLeave = (id) => {
        setLeaveStatus(prevStatus => ({ ...prevStatus, [id]: 'rejected' }));
    }
    const renderEmployee = ({ item, index }) => {
        const backgroundColor = item.task === null ? leaveStatus[item.id] === 'accepted' ? 'green' : leaveStatus[item.id] === 'rejected' ? 'red' : 'white' : 'white';
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
                    <Text style={{ fontSize: 22, fontWeight: '700' }}>{item.name}</Text>
                    {!leaveStatus[item.id] && item.leaveReason && <TouchableOpacity onPress={() => handleAcceptLeave(item.id)} >
                        <AntDesign name="check" size={24} color="green" />
                    </TouchableOpacity>}

                </View>
                <Text style={{ fontSize: 18, opacity: .7 }}>{item.position} - {item.department}</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
                >
                    <Text style={{ fontSize: 12, opacity: .8, color: '#0099cc' }}>{item.email}</Text>
                    {!leaveStatus[item.id] && item.leaveReason && <TouchableOpacity onPress={() => handleRejectLeave(item.id)}>
                        <Feather name="x" size={24} color="red" />
                    </TouchableOpacity>}
                </View>
                <Text style={{ fontSize: 16 }}>
                    {item.leaveReason && `Lý do: ${item.leaveReason}`}
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
                data={employees}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                keyExtractor={(item) => item.id.toString()}
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