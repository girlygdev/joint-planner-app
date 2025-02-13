import React, {useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import moment from 'moment';
import GlobalStyle from '../../../constants/colors';
import AgendaFormComponent from '../../../components/calendar/AgendaFormComponent';
import {db} from '../../../../firebaseConfig';
import {serverTimestamp, doc, updateDoc, deleteDoc} from 'firebase/firestore';
import Button from '../../../components/UI/Button';
import useAppStore from '../../../store/useAppStore';

const EditAgendaScreen = ({route, navigation}) => {
  const {event} = route.params;
  const {setIsLoading} = useAppStore(state => state)

  const editAgendaHandler = async (values) => {
    setIsLoading(true);

    try {
      const eventRef = doc(db, 'events', event.id);

      await updateDoc(eventRef, {
        content: values,
        timeStamp: serverTimestamp(),
      });

      setIsLoading(false);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const deleteEventHandler = async () => {
    setIsLoading(true);

    try {
      const eventRef = doc(db, 'events', event.id);

      await deleteDoc(eventRef);

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
    <View style={styles.container}>
      <AgendaFormComponent
        initialValues={{
          title: event.title ?? '',
          time: event.time ?? null,
          notes: event.notes ?? '',
        }}
        onSubmit={editAgendaHandler}
      />

      <Button
        flat
        onPress={deleteEventHandler}
        text='Delete'
        color='error'
        style={{marginTop: 20}}
      />
    </View>
  );
};

export default EditAgendaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyle.colors.background,
    padding: 20,
  },
});
