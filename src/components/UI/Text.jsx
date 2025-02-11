import {StyleSheet, Text as TextRN} from 'react-native'
import GlobalStyle from '../../constants/colors'

const Text = ({ children, bold, light, sm, md, lg, xl, overline, caption, m=0, my=0, mx=0, p=0, px=0, py=0, color, center, style}) => {
  return (
    <TextRN style={[
        styles.text,
        bold && styles.bold,
        light && styles.light,
        sm && styles.sm,
        md && styles.md,
        lg && styles.lg,
        xl && styles.xl,
        overline && styles.overline,
        caption && styles.caption,
        {margin: m},
        {marginHorizontal: mx},
        {marginVertical: my},
        {padding: p},
        {paddingHorizontal: px},
        {paddingVertical: py},
        color && {color: GlobalStyle.colors[color].main},
        center && styles.center,
        style
    ]}>
        {children}
    </TextRN>
  )
}

export default Text

const styles= StyleSheet.create({
    text: {
        fontFamily: 'poppins',
        fontSize: 16,
        color: GlobalStyle.colors.text.dark
    },
    bold: {
        fontFamily: 'poppins-bold'
    },
    light: {
        fontFamily: 'poppins-light'
    },
    center: {
        textAlign: 'center'
    },
    sm: {
        fontSize: 14,
    },
    md: {
        fontSize: 18,
    },
    lg: {
        fontSize: 20
    },
    xl: {
        fontSize: 22,
    },
    overline: {
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 2
    },
    caption: {
        fontSize: 12,
    }
})