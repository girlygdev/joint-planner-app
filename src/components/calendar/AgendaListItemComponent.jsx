import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Text from '../UI/Text';
import GlobalStyle from '../../constants/colors';

const AgendaListItemComponent = ({date, agenda, onPress}) => {
  const {title, notes, time} = agenda;

  return (
    <Pressable style={({ pressed}) => [styles.container, pressed && styles.pressed]} onPress={onPress}>
      <Text>{title}</Text>
      
      {notes && (
        <Text
          color='info'
          cursive
        >
          {notes}
        </Text>
      )}

      {time && <Text color='primary' overline>{time}</Text>}
    </Pressable>
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
  pressed: {
    opacity: .7,
  }
});
