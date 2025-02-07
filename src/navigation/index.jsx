import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useAuthStore from '../store/useAuthStore';
import AuthStackNavigator from './AuthStackNavigator';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {user} = useAuthStore((state) => state);

  

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
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
