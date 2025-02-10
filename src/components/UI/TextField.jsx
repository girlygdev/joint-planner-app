import {StyleSheet, View, TextInput} from 'react-native'
import GlobalStyle from '../../constants/colors'
import Text from './Text'

const TextField = ({ label, error, inputProps, style }) => {
  return (
    <View>
        {label && <Text caption color={error ? 'error' : ''}>{label}</Text>}
        <TextInput style={[styles.input, style, error && styles.inputError]} {...inputProps} />
        { error && <Text caption color={'error'}>{error}</Text>}
    </View>
  )
}

export default TextField

const styles= StyleSheet.create({
    input: {
        fontFamily: 'poppins',
        fontSize: 16,
        color: GlobalStyle.colors.dark.main,
        margin: 0,
        backgroundColor: GlobalStyle.colors.light.light,
        borderRadius: 8,
        paddingHorizontal: 8
    },
    inputError: {
        borderColor: GlobalStyle.colors.error.main,
        borderWidth: 1
    }
})