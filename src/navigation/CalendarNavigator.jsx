import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CalendarHomeScreen from '../screens/calendar/CalendarScreen';
import AddAgendaScreen from '../screens/calendar/agenda/AddAgendaScreen';
import GlobalStyle from '../constants/colors';

const Stack = createNativeStackNavigator();

const CalendarNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='CalendarHome'>
      <Stack.Screen
        name='CalendarHome'
        component={CalendarHomeScreen}
        options={{
          title: 'Calendar',
          headerStyle: {backgroundColor: GlobalStyle.colors.primary.main},
          headerTintColor: GlobalStyle.colors.text.light,
          headerTitleStyle: {
            fontFamily: 'poppins',
          },
        }}
      />

      <Stack.Screen
        name='AddAgenda'
        component={AddAgendaScreen}
        options={{
          presentation: 'modal',
          title: 'New Plan',
          headerStyle: {backgroundColor: GlobalStyle.colors.secondary.main},
          headerTintColor: GlobalStyle.colors.text.light,
          headerTitleStyle: {
            fontFamily: 'poppins',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default CalendarNavigator;
