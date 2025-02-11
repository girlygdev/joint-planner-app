import {Pressable, StyleSheet} from 'react-native';
import GlobalStyle from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IconButton = ({icon, onPress, color='primary', style, disabled=false}) => {
  return (
    <Pressable
      onPress={onPress.bind(this)}
      disabled={disabled}
      style={({pressed}) => [
        styles.button,
        pressed && styles.pressed,
        color && {backgroundColor: GlobalStyle.colors[color].main, ...GlobalStyle.shadow[1]},
        style,
      ]}
    >
        <Ionicons name={icon} size={28} color={GlobalStyle.colors[color].contrast} />
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
    height: 50
  },
  pressed: {
    opacity: 0.5,
  },
});
