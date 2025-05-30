import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/user/ProfileScreen';
import NoteScreen from '../screens/note/NoteScreen';
import GlobalStyle from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CalendarStackNavigator from './CalendarStackNavigator';
import EditProfileScreen from '../screens/user/EditProfileScreen';
import ProfileStackNavigator from './ProfileStackNavigator';

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
        tabBarActiveBackgroundColor: GlobalStyle.colors.secondary.main,
        tabBarStyle: { backgroundColor: GlobalStyle.colors.secondary.main}
      }}
    >
      <Tab.Screen
        name='Calendar'
        component={CalendarStackNavigator}
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
        name='Tasks'
        component={NoteScreen}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <Ionicons
                name='checkbox-outline'
                size={24}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileStackNavigator}
        options={{
          headerShown: false,
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
