import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import moment from 'moment';
import GlobalStyle from '../../../constants/colors';
import AgendaFormComponent from '../../../components/calendar/AgendaFormComponent';
import {db} from '../../../../firebaseConfig';
import ScreenLoader from '../../../components/UI/ScreenLoader';
import {serverTimestamp, doc, updateDoc} from 'firebase/firestore';

const EditAgendaScreen = ({route, navigation}) => {
  const {event} = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const editAgendaHandler = async (values) => {
    setIsLoading(true);

    try {
      const eventRef = doc(db, 'events', event.id)
      
      await updateDoc(eventRef, {
        content: values,
        timeStamp: serverTimestamp()
      })

      setIsLoading(false);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    if (event) {
      navigation.setOptions({
        title: event.title ?? moment(event.date).format('MMM DD, YYYY'),
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: 'poppins',
        },
      });
    }
  }, [navigation, event]);

  if (!event) return null;

  return (
    <View style={styles.root}>
      {isLoading && <ScreenLoader />}

      <View style={styles.container}>
        <AgendaFormComponent
          initialValues={{
            title: event.title ?? '',
            time: event.time ?? null,
            notes: event.notes ?? '',
          }}
          onSubmit={editAgendaHandler}
        />
      </View>
    </View>
  );
};

export default EditAgendaScreen;

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
