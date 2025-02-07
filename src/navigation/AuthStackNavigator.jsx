import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/auth/RegisterScreen';

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

      {/* <Stack.Screen
        name='Login'
        component={Login}
      /> */}
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
