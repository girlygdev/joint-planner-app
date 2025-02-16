import React, {useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {useAuth} from '../../hooks/auth/useAuth';
import Button from '../../components/UI/Button';
import AvatarSm from '../../../assets/avatar/avatar_500.png';
import GlobalStyle from '../../constants/colors';
import Text from '../../components/UI/Text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import {auth, db} from '../../../firebaseConfig';
import {deleteUser} from 'firebase/auth';
import useAppStore from '../../store/useAppStore';
import useAuthStore from '../../store/useAuthStore';

const ProfileScreen = ({ navigation }) => {
  const {user, logout} = useAuth();
  const {setIsLoading} = useAppStore((state) => state);
  const {eventCount, taskCount} = useAuthStore(state => state)

  const permanentDeleteAccount = async () => {
    setIsLoading(true);
    try {
      const eventsRef = collection(db, 'events');
      const q = query(eventsRef, where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);

      const deletePromises = querySnapshot.docs.map((eventDoc) => {
        deleteDoc(doc(db, 'events', eventDoc.id));
      });

      // Delete all events first
      await Promise.all(deletePromises);

      // Delete user from auth table
      const currentUser = auth.currentUser;
      await deleteUser(currentUser);

      setIsLoading(false);
      logout();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const deleteAccountHandler = () => {
    Alert.alert(
      'Are you sure?',
      'Deleting your account will permanently erase all your data, and this action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: permanentDeleteAccount,
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const editProfileHandler = () => {
    navigation.navigate('EditProfile')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image source={AvatarSm} style={styles.avatar} />
        </View>

        <Text bold md>
          User Name
        </Text>
        <Text sm light>
          {user?.email}
        </Text>

        <Button
          inline
          onPress={editProfileHandler}
          text='Edit profile'
          rounded
          style={{marginTop: 20}}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.contentDetails}>
          <Text caption light>
            Details
          </Text>

          <View style={styles.list}>
            <View style={styles.listItem}>
              <Ionicons
                name='calendar-number'
                size={24}
                color={GlobalStyle.colors.primary.main}
              />
              <Text light style={{flex: 1, marginHorizontal: 5}}>
                Total events created
              </Text>
              <Text
                bold
                md
                color={eventCount ? 'secondary' : 'light'}
                style={{marginHorizontal: 5, paddingVertical: 0}}
              >
                {eventCount}
              </Text>
            </View>

            <View style={styles.listItem}>
              <Ionicons
                name='checkbox'
                size={24}
                color={GlobalStyle.colors.primary.main}
              />
              <Text light style={{flex: 1, marginHorizontal: 5}}>
                Total tasks created
              </Text>
              <Text
                bold
                md
                color={taskCount ? 'secondary' : 'light'}
                style={{marginHorizontal: 5, paddingVertical: 0}}
              >
                {taskCount}
              </Text>
            </View>
          </View>
        </View>

        <Button
          outlined
          color={'dark'}
          text={'Logout'}
          rounded
          onPress={logout}
        />

        <Button
          flat
          color={'error'}
          text={'DELETE ACCOUNT'}
          rounded
          onPress={deleteAccountHandler}
          style={{marginTop: 15}}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyle.colors.background,
  },
  header: {
    paddingVertical: 50,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
  contentDetails: {
    flex: 1,
  },
  list: {
    backgroundColor: GlobalStyle.colors.primary.light,
    borderRadius: 8,
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
});
