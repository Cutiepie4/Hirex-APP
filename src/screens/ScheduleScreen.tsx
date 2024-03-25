import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, Modal, Button } from 'react-native';
import { Agenda, DateData, AgendaEntry, AgendaSchedule } from 'react-native-calendars';
import ItemsDetail from '../components/ItemsDetail';
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import { colors, fonts, sizes } from '../constant';

export type ExtendedAgendaEntry = AgendaEntry & {
  start: string;
  end: string;
  title: string;
};

const AgendaScreen: React.FC = () => {
  const [items, setItems] = useState<AgendaSchedule | undefined>(undefined);
  const [showItemsDetail, setShowItemsDetail] = useState<boolean>(false);

  const loadItems = (day: DateData) => {
    const tempItems = items || {};

    setTimeout(() => {
      for (let i = 0; i < 6; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!tempItems[strTime]) {
          tempItems[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            tempItems[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime,
              start: '08:00',
              end: '10:00',
              title: 'Meeting'
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

  const renderItem = (reservation: ExtendedAgendaEntry, isFirst: boolean) => {
    const fontSize = 16;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <View>
        <TouchableOpacity
          style={[styles.item]}
          onPress={() => Alert.alert(reservation.name)}
        >
          <View style={styles.textContainer}>
            <Text style={[styles.timeText]}>
              {reservation.start} - {reservation.end}
            </Text>
            <Text style={[styles.titleText]}>
              {reservation.title}
            </Text>
            <Text style={[styles.nameText]}>
              {reservation.name}
            </Text>
          </View>
          <View
            style={styles.coloredBar}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  const timeToString = (time: number) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        // selected={'2017-05-16'}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob={true}
      // markedDates={{
      //   '2024-02-06': {marked: true, dotColor: 'red' },
      // }}
      />

      {/* Icon hiển thị ItemsDetail và khi nhấn vào sẽ hiển thị ItemsDetail */}
      <TouchableOpacity
        style={styles.viewTask}
        onPress={() => setShowItemsDetail(true)}
      >
        <Ionicons name="add-circle-outline" size={60} color="#50C7C7" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showItemsDetail}
        onRequestClose={() => setShowItemsDetail(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ItemsDetail />
            <TouchableOpacity onPress={() => setShowItemsDetail(false)} style={styles.closeButton}>
            <EvilIcons name="close-o" size={30} color="black" />
          </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
    marginRight: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderRadius: 10,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
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
    shadowColor: '#2E66E7',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 30,
    shadowOpacity: 0.5,
    // elevation: 5,
    zIndex: 2
  },
  textContainer: {
    flex: 1,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  titleText: {
    fontFamily: fonts.DmBold,
    fontSize: 16,
    // fontWeight: 'bold',
    marginBottom: 5,
  },
  nameText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  coloredBar: {
    position: 'absolute',
    height: '100%',
    width: 5,
    backgroundColor: '#e32970',
    borderRadius: 5,
    right: 0,
    top: 10,
    alignSelf: 'stretch',
  },
});

export default AgendaScreen;
