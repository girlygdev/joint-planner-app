import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
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
import {isEmpty} from 'lodash';
import Text from '../../components/UI/Text';

// Temporary remove defaultProps error
ExpandableCalendar.defaultProps = undefined;

const CalendarHomeScreen = ({ navigation }) => {
  const currentDate = moment().format(Constants.dateFormat);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const [items, setItems] = useState({
    '2025-02-11': [{name: 'Meeting with Client', time: '10:00 AM'}],
    '2025-02-12': [{name: 'Doctor Appointment', time: '3:00 PM'}],
    '2025-02-14': [
      {name: 'Valentine’s Dinner', time: '7:00 PM'},
      {name: 'Market Dinner'},
    ],
  });

  const dateEvents = useMemo(() => {
    return items[selectedDate] ? {[selectedDate]: items[selectedDate]} : {};
  }, [selectedDate, items]);

  const dateSections = useMemo(() => {
    return dateEvents
      ? Object.keys(dateEvents).map((date) => ({
          title: date,
          data: items[date],
        }))
      : [];
  }, [dateEvents]);

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
      date: selectedDate
    })
  }

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

      {!isEmpty(dateEvents) ? (
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
