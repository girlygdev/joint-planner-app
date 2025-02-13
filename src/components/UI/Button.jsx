import {Pressable, StyleSheet} from 'react-native';
import GlobalStyle from '../../constants/colors';
import Text from './Text';

const Button = ({text, onPress, flat, light, color='primary', outlined, style, disabled=false, inline, lightText, rounded}) => {
  return (
    <Pressable
      onPress={onPress.bind(this)}
      disabled={disabled}
      style={({pressed}) => [
        styles.button,
        pressed && styles.pressed,
        color && {backgroundColor: GlobalStyle.colors[color].main, ...GlobalStyle.shadow[1]},
        light && {backgroundColor: GlobalStyle.colors[color].light, ...GlobalStyle.shadow[1]},
        outlined && {
            borderWidth: 1,
            backgroundColor: 'transparent',
            borderColor: GlobalStyle.colors[color ?? 'primary'].main,
            ...GlobalStyle.shadow.unset
        },
        flat && styles.flat,
        inline && {width: 'auto'},
        rounded && styles.rounded,
        style,
      ]}
    >
      <Text
        sm
        center
        style={[
            color && {color: GlobalStyle.colors[color].contrast},
            outlined && {color: GlobalStyle.colors[color ?? 'primary'].main},
            flat && {color: GlobalStyle.colors[color].main},
            lightText && { color: GlobalStyle.colors.text.light}
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    backgroundColor: GlobalStyle.colors.primary.main,
    borderRadius: 4,
    padding: 8,
    width: '100%',
  },
  flat: {
    paddingVertical: 0,
    backgroundColor: 'transparent',
    ...GlobalStyle.shadow.unset
  },
  pressed: {
    opacity: 0.5,
  },
  rounded: {
    paddingHorizontal: 20,
    borderRadius: 50
  }
});
