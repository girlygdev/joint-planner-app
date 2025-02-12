import React, {useEffect, useMemo, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import moment from 'moment';
import {Constants} from '../../constants/constants';
import GlobalStyle from '../../constants/colors';
import {
  AgendaList,
  CalendarProvider,
  ExpandableCalendar,
} from 'react-native-calendars';
import AgendaListItemComponent from '../../components/calendar/AgendaListItemComponent';
import IconButton from '../../components/UI/IconButton';
import EmptyAgendaComponent from '../../components/calendar/EmptyAgendaComponent';
import _, {isEmpty, map} from 'lodash';
import Text from '../../components/UI/Text';
import { db } from '../../../firebaseConfig';
import {collection, getDocs, query, where, orderBy} from 'firebase/firestore';
import { useIsFocused } from '@react-navigation/native';


// Temporary remove defaultProps error
ExpandableCalendar.defaultProps = undefined;

const CalendarHomeScreen = ({navigation}) => {
  const currentDate = moment().format(Constants.dateFormat);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const isFocused = useIsFocused()

  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (isFocused) {
      getEventsByDate()
    }
  }, [selectedDate, isFocused])

  const formatData = (data) => {
    const events = _.chain(data).map((event) => {
      return ({
        id: event.id,
        date: event.date,
        title: event.content.title ?? '',
        notes: event.content.notes ?? '',
        time: event.content.time ?? null,
      })
    })
    .groupBy('date')
    .value()

    return events
  }

  const getEventsByDate = async () => {
    try {
      const eventsRef = collection(db, 'events');
      const q = query(
        eventsRef,
        where("date", "==", selectedDate), // Filter by exact date
        orderBy("timestamp", "desc") // Sort by most recent first
      );

      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setEvents(posts)
      formatData(posts)
      
    } catch (error) {
      Alert.alert('Oops!', 'An error occurred while fetching data.');
      console.log(error);
      
    }
  };

  const formattedEvents = useMemo(() => {
    return formatData(events)
  }, [events])

  const dateSections = useMemo(() => {
    return formattedEvents
      ? Object.keys(formattedEvents).map((date) => ({
          title: date,
          data: formattedEvents[date],
        }))
      : [];
  }, [formattedEvents]);

  const markedDates = useMemo(
    () => ({
      [selectedDate]: {
        selected: true,
        selectedColor: GlobalStyle.colors.secondary.main,
        selectedTextColor: GlobalStyle.colors.text.light,
      },
    }),
    [selectedDate]
  );

  const addPlanHandler = () => {
    navigation.navigate('AddAgenda', {
      date: selectedDate,
    });
  };

  return (
    <CalendarProvider
      date={selectedDate}
      style={styles.container}
    >
      <ExpandableCalendar
        initialPosition='closed'
        markedDates={markedDates}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        theme={{
          todayTextColor: GlobalStyle.colors.primary.main,
          selectedDayBackgroundColor: GlobalStyle.colors.secondary.main,
          selectedDayTextColor: GlobalStyle.colors.text.light,
          textDayFontFamily: 'poppins',
          textDayHeaderFontFamily: 'poppins',
          textMonthFontFamily: 'poppins',
          arrowColor: GlobalStyle.colors.secondary.main,
        }}
      />

      {!isEmpty(formattedEvents) ? (
        <AgendaList
          sections={dateSections}
          renderItem={({item, section}) => (
            <AgendaListItemComponent
              date={section.title}
              agenda={item}
            />
          )}
          renderSectionHeader={(info) => {
            return (
              <View style={styles.sectionContainer}>
                <Text
                  color='primary'
                  dark
                  sm
                >
                  {info === currentDate ? 'Today, ' : ''}
                  {moment(info).format(Constants.sectionFormat)}
                </Text>
              </View>
            );
          }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <EmptyAgendaComponent />
        </View>
      )}

      <IconButton
        icon='add'
        onPress={addPlanHandler}
        outlined
        style={styles.addButton}
      />
    </CalendarProvider>
  );
};

export default CalendarHomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyle.colors.light.light,
  },
  sectionContainer: {
    paddingTop: 20,
    paddingBottom: 12,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
