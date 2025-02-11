import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import moment from 'moment';
import {Constants} from '../../constants/constants';
import GlobalStyle from '../../constants/colors';
import {
  AgendaList,
  CalendarProvider,
  ExpandableCalendar,
} from 'react-native-calendars';
import AgendaListItem from '../../components/calendar/AgendaListItem';
import IconButton from '../../components/UI/IconButton';

const CalendarHomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(
    moment().format(Constants.dateFormat)
  );

  const [items, setItems] = useState({
    '2025-02-11': [{name: 'Meeting with Client', time: '10:00 AM'}],
    '2025-02-12': [{name: 'Doctor Appointment', time: '3:00 PM'}],
    '2025-02-14': [{name: 'Valentine’s Dinner', time: '7:00 PM'}],
    '2025-02-14': [{name: 'Market Dinner'}],
  });

  return (
    <CalendarProvider
      date={selectedDate}
      style={styles.container}
    >
      <ExpandableCalendar
        initialPosition='closed'
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: GlobalStyle.colors.secondary.main,
            selectedTextColor: GlobalStyle.colors.text.light,
          },
        }}
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

      <AgendaList
        sections={Object.keys(items).map((date) => ({
          title: date,
          data: items[date],
        }))}
        renderItem={({item, section}) => (
          <AgendaListItem
            date={section.title}
            agenda={item}
          />
        )}
        sectionStyle={styles.section}
      />

      <IconButton
        icon='add'
        onPress={() => console.log()}
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
  section: {
    backgroundColor: 'transparent',
  },
  sectionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    padding: 0,
    margin: 0,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
