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
    marginLeft: 30,
    marginRight: 20,
    // backgroundColor: GlobalStyle.colors.primary.light,
    borderLeftColor: GlobalStyle.colors.secondary.main,
    borderLeftWidth: 4,
    borderRadius: 2,
    marginBottom: 8,
    paddingHorizontal: 10,
    // ...GlobalStyle.shadow[0],
  },
});
