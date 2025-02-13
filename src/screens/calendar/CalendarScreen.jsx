import React, {useEffect, useMemo, useState} from 'react';
import {Alert, SafeAreaView, StyleSheet, View} from 'react-native';
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
import {db} from '../../../firebaseConfig';
import {collection, query, where, orderBy, onSnapshot} from 'firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import useAuthStore from '../../store/useAuthStore';

// Temporary remove defaultProps error
ExpandableCalendar.defaultProps = undefined;

const CalendarHomeScreen = ({navigation}) => {
  const currentDate = moment().format(Constants.dateFormat);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [events, setEvents] = useState([]);
  const isFocused = useIsFocused();
  const {user} = useAuthStore(state => state)

  useEffect(() => {
    if (!isFocused) return;

    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, where('uid', '==', user.uid), orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const allEvents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setEvents(allEvents);
      },
      (error) => {
        Alert.alert('Oops!', 'An error occurred while fetching data.');
        console.error(error);
      }
    );

    return () => unsubscribe();
  }, [selectedDate, isFocused]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => event.date === selectedDate);
  }, [events, selectedDate]);

  const formattedEvents = useMemo(() => {
    const formatted = _.map(filteredEvents, (event) => ({
      id: event.id,
      date: event.date,
      title: event.content.title ?? '',
      notes: event.content.notes ?? '',
      time: event.content.time ?? null,
    }));

    return _.groupBy(formatted, 'date');
  }, [filteredEvents]);

  const dateSections = useMemo(() => {
    return Object.keys(formattedEvents).map((date) => ({
      title: date,
      data: formattedEvents[date],
    }));
  }, [formattedEvents]);

  const markedDates = useMemo(() => {
    const groupedEvents = _.groupBy(events, 'date');
    const marked = {};

    Object.keys(groupedEvents).forEach((date) => {
      marked[date] = {
        marked: true,
        selected: date === selectedDate,
        selectedColor: GlobalStyle.colors.secondary.main,
        selectedTextColor: GlobalStyle.colors.text.light,
        dotColor: date != selectedDate ? GlobalStyle.colors.secondary.main : '',
      };
    });
    return marked;
  }, [events, selectedDate]);

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
      <SafeAreaView style={{flex: 1}}>
        {!isEmpty(formattedEvents) ? (
          <AgendaList
            keyExtractor={(item) => item.id}
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
      </SafeAreaView>
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
