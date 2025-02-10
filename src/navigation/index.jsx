import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStackNavigator from './AuthStackNavigator';
import CalendarHomeScreen from '../screens/calendar/CalendarHomeScreen';
import { useAuth } from '../hooks/auth/useAuth';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { user } = useAuth()

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>

        {!user && (
          <Stack.Screen
            name='Auth'
            component={AuthStackNavigator}
          />
        )}

        {user && (
          <Stack.Screen
            name='Calendar'
            component={CalendarHomeScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
