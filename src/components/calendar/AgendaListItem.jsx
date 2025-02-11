import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../UI/Text';
import GlobalStyle from '../../constants/colors';

const AgendaListItem = ({date, agenda}) => {
  const {name, time} = agenda;
  
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      {time && <Text overline>{time}</Text>}
    </View>
  );
};

export default AgendaListItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    backgroundColor: GlobalStyle.colors.primary.light,
    borderLeftColor: GlobalStyle.colors.primary.main,
    borderLeftWidth: 4,
    padding: 8,
    borderRadius: 2,
    ...GlobalStyle.shadow[0],
  },
});
