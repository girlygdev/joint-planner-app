import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStackNavigator from './AuthStackNavigator';
import AppNavigator from './AppNavigator';
import useAuthStore from '../store/useAuthStore';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { user } = useAuthStore(state => state)

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
            name='App'
            component={AppNavigator}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
