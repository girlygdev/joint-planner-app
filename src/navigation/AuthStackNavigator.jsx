import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/auth/RegisterScreen';
import LoginScreen from '../screens/auth/LoginScreen';

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='Register'
        component={RegisterScreen}
      />

      <Stack.Screen
        name='Login'
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
