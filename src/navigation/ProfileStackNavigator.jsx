import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/user/ProfileScreen';
import EditProfileScreen from '../screens/user/EditProfileScreen';
import GlobalStyle from '../constants/colors';

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='ProfileHome'
      screenOptions={{
        headerTintColor: GlobalStyle.colors.text.light,
        headerTitleStyle: {
          fontFamily: 'poppins',
        },
      }}
    >
      <Stack.Screen
        name='ProfileHome'
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerStyle: {backgroundColor: GlobalStyle.colors.primary.main},
        }}
      />

      <Stack.Screen
        name='EditProfile'
        component={EditProfileScreen}
        options={{
          title: 'Update Profile',
          presentation: 'modal',
          headerStyle: {backgroundColor: GlobalStyle.colors.primary.main},
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
