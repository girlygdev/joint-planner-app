import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import moment from 'moment';
import GlobalStyle from '../../../constants/colors';
import AgendaFormComponent from '../../../components/calendar/AgendaFormComponent';
import useAuthStore from '../../../store/useAuthStore';
import {
  addDoc,
  collection,
  db,
  serverTimestamp,
} from '../../../../firebaseConfig';
import ScreenLoader from '../../../components/UI/ScreenLoader';

const AddAgendaScreen = ({route, navigation}) => {
  const {date} = route.params;
  const {user} = useAuthStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);

  const saveAgendaHandler = async (values) => {
    setIsLoading(true);

    try {
      const eventData = {
        ...values,
        date,
      };

      const data = {
        content: eventData,
        timestamp: serverTimestamp(),
        userId: user.uid,
      };

      await addDoc(collection(db, 'users', user.uid, 'events'), data);
      await addDoc(collection(db, 'events'), data);

      setIsLoading(false);
      navigation.goBack()
    } catch (error) {
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
    <View style={styles.root}>
      {isLoading && <ScreenLoader />}

      <View style={styles.container}>
        <AgendaFormComponent onSubmit={saveAgendaHandler} />
      </View>
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
