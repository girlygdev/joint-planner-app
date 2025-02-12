import React from 'react'
import { View } from 'react-native'
import Text from '../UI/Text'

const EmptyAgendaComponent = () => {
  return (
    <View>
        <Text color='light' caption bold center>No planned event on this day.</Text>
        <Text color='light' caption center>Click the + button to plan your next activity.</Text>
    </View>
  )
}

export default EmptyAgendaComponent
