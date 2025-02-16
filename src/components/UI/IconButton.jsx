import {Pressable, StyleSheet} from 'react-native';
import GlobalStyle from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IconButton = ({
  icon,
  onPress,
  color = 'primary',
  flat,
  outlined,
  style,
  disabled = false,
}) => {
  return (
    <Pressable
      onPress={onPress.bind(this)}
      disabled={disabled}
      style={({pressed}) => [
        styles.button,
        pressed && styles.pressed,
        color &&
          !flat && {
            backgroundColor: GlobalStyle.colors[color].main,
            ...GlobalStyle.shadow[1],
          },
        flat && {backgroundColor: 'transparent'},
        outlined && {
          borderWidth: 2,
          backgroundColor: 'transparent',
          borderColor: GlobalStyle.colors[color ?? 'primary'].main,
          ...GlobalStyle.shadow.unset,
        },
        style,
      ]}
    >
      <Ionicons
        name={icon}
        size={28}
        color={
          flat
            ? GlobalStyle.colors[color].main
            : outlined
            ? GlobalStyle.colors[color].main
            : GlobalStyle.colors[color].contrast
        }
      />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyle.colors.primary.main,
    borderRadius: 25,
    padding: 8,
    width: 50,
    height: 50,
  },
  pressed: {
    opacity: 0.5,
  },
});
