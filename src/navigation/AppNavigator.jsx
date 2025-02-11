import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CalendarScreen from '../screens/calendar/CalendarScreen';
import ProfileScreen from '../screens/user/ProfileScreen';
import ListScreen from '../screens/list/ListScreen';
import GlobalStyle from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
        component={CalendarScreen}
        options={{
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
        name='List'
        component={ListScreen}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <Ionicons
                name='list'
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
