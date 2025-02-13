import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../UI/Text';
import GlobalStyle from '../../constants/colors';

const AgendaListItemComponent = ({date, agenda}) => {
  const {title, notes, time} = agenda;

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      {notes && (
        <Text
          color='info'
          cursive
        >
          {notes}
        </Text>
      )}

      {time && <Text color='success' overline>{time}</Text>}
    </View>
  );
};

export default AgendaListItemComponent;

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginRight: 20,
    borderLeftColor: GlobalStyle.colors.secondary.main,
    borderLeftWidth: 4,
    borderRadius: 2,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
});
