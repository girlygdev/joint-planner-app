import React from 'react';
import {Text, View} from 'react-native';
import { useAuth } from '../../hooks/auth/useAuth';
import Button from '../../components/UI/Button';

const CalendarHomeScreen = () => {
  const { user, logout } = useAuth()

  return (
    <View>
      <Text>CalendarHomeScreen</Text>
      <Button onPress={logout} text='logout' />
    </View>
  );
};

export default CalendarHomeScreen;
