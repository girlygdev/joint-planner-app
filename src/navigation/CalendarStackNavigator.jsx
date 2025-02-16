import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CalendarHomeScreen from '../screens/calendar/CalendarScreen';
import AddAgendaScreen from '../screens/calendar/agenda/AddAgendaScreen';
import GlobalStyle from '../constants/colors';
import EditAgendaScreen from '../screens/calendar/agenda/EditAgendaScreen';

const Stack = createNativeStackNavigator();

const CalendarStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='CalendarHome' screenOptions={{
      headerTintColor: GlobalStyle.colors.text.light,
      headerTitleStyle: {
        fontFamily: 'poppins',
      },
    }}>
      <Stack.Screen
        name='CalendarHome'
        component={CalendarHomeScreen}
        options={{
          title: 'Calendar',
          headerStyle: {backgroundColor: GlobalStyle.colors.primary.main},
        }}
      />

      <Stack.Screen
        name='AddAgenda'
        component={AddAgendaScreen}
        options={{
          presentation: 'modal',
          title: 'New Plan',
          headerStyle: {backgroundColor: GlobalStyle.colors.secondary.main},
        }}
      />

      <Stack.Screen
        name='EditAgenda'
        component={EditAgendaScreen}
        options={{
          presentation: 'modal',
          title: 'Edit Plan',
          headerStyle: {backgroundColor: GlobalStyle.colors.secondary.main},
        }}
      />
    </Stack.Navigator>
  );
};

export default CalendarStackNavigator;
