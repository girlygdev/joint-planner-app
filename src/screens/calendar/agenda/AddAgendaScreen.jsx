import React, {useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import moment from 'moment';
import GlobalStyle from '../../../constants/colors';
import AgendaFormComponent from '../../../components/calendar/AgendaFormComponent';

const AddAgendaScreen = ({route, navigation}) => {
  const {date} = route.params;

  const saveAgendaHandler = (values) => {
    console.log(values)
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
      <AgendaFormComponent onSubmit={saveAgendaHandler} />
    </View>
  );
};

export default AddAgendaScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: GlobalStyle.colors.background,
    padding: 20,
  },
});
