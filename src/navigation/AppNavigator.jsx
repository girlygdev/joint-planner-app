import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/user/ProfileScreen';
import NoteScreen from '../screens/note/NoteScreen';
import GlobalStyle from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CalendarNavigator from './CalendarNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: GlobalStyle.colors.primary.main},
        headerTintColor: GlobalStyle.colors.text.light,
        headerTitleStyle: {
          fontFamily: 'poppins',
        },
        tabBarActiveTintColor: GlobalStyle.colors.secondary.contrast,
        tabBarActiveBackgroundColor: GlobalStyle.colors.secondary.main
      }}
    >
      <Tab.Screen
        name='Calendar'
        component={CalendarNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => {
            return (
              <Ionicons
                name='calendar'
                size={24}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name='Note'
        component={NoteScreen}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <Ionicons
                name='albums-outline'
                size={24}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <Ionicons
                name='person-circle-outline'
                size={24}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
