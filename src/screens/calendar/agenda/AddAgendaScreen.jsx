import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import moment from 'moment';
import GlobalStyle from '../../../constants/colors';
import AgendaFormComponent from '../../../components/calendar/AgendaFormComponent';
import useAuthStore from '../../../store/useAuthStore';
import {db} from '../../../../firebaseConfig';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';
import useAppStore from '../../../store/useAppStore';

const AddAgendaScreen = ({route, navigation}) => {
  const {date} = route.params;
  const {user} = useAuthStore((state) => state);
  const {setIsLoading} = useAppStore(state => state)

  const saveAgendaHandler = async (values) => {
    setIsLoading(true);

    try {
      const data = {
        date: date,
        content: values,
        timestamp: serverTimestamp(),
        uid: user.uid,
      };

      await addDoc(collection(db, 'events'), data);

      setIsLoading(false);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    if (date) {
      navigation.setOptions({
        title: moment(date).format('MMM DD, YYYY'),
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: 'poppins',
        },
      });
    }
  }, [navigation, date]);

  return (
    <View style={styles.container}>
      <AgendaFormComponent onSubmit={saveAgendaHandler} />
    </View>
  );
};

export default AddAgendaScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: GlobalStyle.colors.background,
    padding: 20,
  },
});
