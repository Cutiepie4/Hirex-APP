import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, Modal, Button, SafeAreaView, Animated, I18nManager } from 'react-native';
import { Agenda, DateData, AgendaEntry, AgendaSchedule } from 'react-native-calendars';
import { GestureHandlerRootView, RectButton, Swipeable } from 'react-native-gesture-handler';
import { Ionicons, EvilIcons, AntDesign } from '@expo/vector-icons';
import ModalItems from '../components/ModalItems';
import moment from 'moment';

export type ExtendedAgendaEntry = AgendaEntry & {
  notes: string,
  start: string;
  end: string;
  title: string;
  type: string;
};
const generateRandomId = () => `newId_${Math.random().toString(36).substring(2, 9)}`;

const timeToString = (time: number) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};
const AgendaScreen: React.FC = () => {
  const [items, setItems] = useState<AgendaSchedule | undefined>(undefined);
  const [showItemsDetail, setShowItemsDetail] = useState<boolean>(false);
  const [dayPick, setDayPick] = useState<any>(moment().format('YYYY-MM-DD'));
  const [isNew, setIsNew] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [reservationPick, setReservationPick] = useState<ExtendedAgendaEntry>(undefined);
  useEffect(() => {
    // console.log(items)
  }, [items])

  const handleDeleteItem = useCallback((reservation: ExtendedAgendaEntry) => {
    setItems(prevItems => {
      const updatedItems = { ...prevItems };
      if (updatedItems[reservation.day]) {
        updatedItems[reservation.day] = updatedItems[reservation.day].filter(item => item.name !== reservation.name);
      }
      return updatedItems;
    });
    setRefreshing(false);
  }, []);

  const loadItems = (day: DateData) => {
    const tempItems = items || {};

    setTimeout(() => {
      for (let i = 0; i < 6; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!tempItems[strTime]) {
          tempItems[strTime] = [];
          const type = Math.random() < 0.5 ? 'personal' : 'working';
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            tempItems[strTime].push({
              notes: 'Item for ' + strTime + ' #' + j,
              name: generateRandomId(),
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime,
              start: '08:00',
              end: '10:00',
              title: 'Meeting',
              type: type,
            } as ExtendedAgendaEntry);
          }
        }
      }

      const newItems: AgendaSchedule = {};
      Object.keys(tempItems).forEach(key => {
        newItems[key] = tempItems[key];
      });
      setItems(newItems);
    }, 1000);
  };
  const handleSetValue = useCallback((isShow: boolean, isNew: boolean, day: string, reservation: ExtendedAgendaEntry) => {
    setReservationPick({ ...reservation })
    setDayPick(day)
    setShowItemsDetail(isShow);
    setIsNew(isNew)
  }, []);
  const renderItem = useCallback((reservation: ExtendedAgendaEntry, isFirst: boolean) => {
    // const inputRange = [-1, 0, 60 * index, 60 * (index + 0.5)];
    // const opacityInputRange = [-1, 0, 60 * index, 60 * (index + 1)];
    // const scale = scrolly.interpolate({
    //   inputRange,
    //   outputRange: [1, 1, 1, 0]
    // });
    // const opacity = scrolly.interpolate({
    //   opacityInputRange,
    //   outputRange: [1, 1, 1, 0]
    // });
    const height = new Animated.Value(70)
    const animatedDelete = () => {
      Animated.timing(height, {
        toValue: 0,
        duration: 350,
        useNativeDriver: false
      }).start()
    }
    const renderRightActions = (progress, dragX) => {
      const translateX = dragX.interpolate({
        inputRange: [-64, 0],
        outputRange: [0, 64],
        extrapolate: 'clamp',
      });
      return (
        <View
          style={{
            width: 64,
            flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
          }}>
          <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
            <RectButton
              style={[styles.rightAction, { backgroundColor: 'red' }]}
              onPress={() => handleDeleteItem(reservation)}>
              {/* <Ionicons name="trash-outline" size={30} color="white" /> */}
              <Animated.View style={[styles.actionIcon,]} >
                <Ionicons name="trash-outline" size={30} color="white" />
              </Animated.View>
            </RectButton>
          </Animated.View>
        </View>
      );
    };

    return (
      <Swipeable
        friction={2}
        enableTrackpadTwoFingerGesture
        leftThreshold={30}
        rightThreshold={40}
        renderRightActions={renderRightActions}
        overshootRight={false}
        onSwipeableOpen={animatedDelete}>
        <View>
          <TouchableOpacity
            style={[styles.item]}
            onPress={() => handleSetValue(true, false, reservation.day, reservation)}
          // onPress={() => navigation.navigate('EmployeeList')}
          >
            <View style={styles.textContainer}>
              <Text style={[styles.timeText]}>
                {reservation.start} - {reservation.end}
              </Text>
              <Text style={[styles.titleText]}>
                {reservation.title}
              </Text>
              <Text style={[styles.nameText]}>
                {reservation.notes}
              </Text>
            </View>
            <View style={styles.coloredBar} />
            <View
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
              }}
            >
              <Text style={{
                fontFamily: 'mon',
                color: reservation.type === 'personal' ? '#a45eff' : '#00c94d',
                backgroundColor: reservation.type === 'personal' ? 'rgba(128,128,128,0.1)' : 'rgba(128,128,128,0.1)',
                padding: 5,
              }}>
                {reservation.type}
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
              }}
            >
              <Ionicons name="notifications-outline" size={24} color="black" />
            </View>
          </TouchableOpacity>

        </View>
      </Swipeable>
    );
  }, [reservationPick]);

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    console.log(r1.name + ':' + r2.name)
    return r1.name !== r2.name;
  };


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Agenda
          items={items}
          loadItemsForMonth={loadItems}
          renderItem={renderItem}
          renderEmptyDate={renderEmptyDate}
          // rowHasChanged={rowHasChanged}
          showClosingKnob={true}
          // minDate={'2024-03-20'}
          // maxDate={'2024-03-28'}
          onRefresh={() => {
            console.log('refresh')
          }}
          onDayChange={day => {
            setDayPick(day.dateString);
          }}
          onDayPress={day => {
            setDayPick(day.dateString);
          }}
          refreshing={refreshing}
        // markedDates={{
        //   '2024-02-06': {marked: true, dotColor: 'red' },
        // }}
        />

        <TouchableOpacity
          style={styles.viewTask}
          onPress={() => handleSetValue(true, true, dayPick, {
            notes: '',
            name: generateRandomId(),
            height: Math.max(50, Math.floor(Math.random() * 150)),
            day: dayPick,
            start: '08:00',
            end: '10:00',
            title: '',
            type: 'personal',
          })}
        >
          <Ionicons name="add-circle-outline" size={60} color="#50C7C7" />
        </TouchableOpacity>
        <ModalItems
          reservationPick={reservationPick}
          setReservationPick={setReservationPick}
          isNew={isNew}
          isShow={showItemsDetail}
          setIsShow={setShowItemsDetail}
          dayPick={dayPick}
          items={items}
          setItems={setItems}
          setRefreshing={setRefreshing}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 10,
    padding: 10,
    // marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  customDay: {
    margin: 10,
    fontSize: 24,
    color: 'green'
  },
  dayItem: {
    marginLeft: 34
  },
  viewTask: {
    position: 'absolute',
    bottom: 40,
    right: 17,
    height: 60,
    width: 60,
    // backgroundColor: '#2E66E7',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2
  },
  textContainer: {
    flex: 1,
  },
  timeText: {
    fontSize: 16,
    fontFamily: 'mon-b',
    marginBottom: 5,
  },
  titleText: {
    fontSize: 16,
    fontFamily: 'mon-sb',
    // fontWeight: 'bold',
    marginBottom: 5,
  },
  nameText: {
    fontSize: 14,
    fontFamily: 'mon',
    // fontStyle: 'italic',
  },
  coloredBar: {
    position: 'absolute',
    height: '100%',
    width: 5,
    backgroundColor: '#50C7C7',
    borderRadius: 5,
    right: 0,
    top: 10,
    alignSelf: 'stretch',
  },
  deleteAction: {
    backgroundColor: 'red',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 17,
    borderRadius: 10,
  },
  actionIcon: {
    // width: 30,
    marginHorizontal: 10,
    // backgroundColor: 'plum',
    // height: 30,
  },
  // deleteButton: {
  //   flex: 1,
  //   backgroundColor: 'red',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginTop: 17,
  //   width: 60,
  //   height: 100,
  //   borderRadius: 25,
  // },
});

export default React.memo(AgendaScreen);
