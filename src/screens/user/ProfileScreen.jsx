import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useAuth} from '../../hooks/auth/useAuth';
import Button from '../../components/UI/Button';

const ProfileScreen = () => {
  const {user, logout} = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={logout}
        text='logout'
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    }
  })