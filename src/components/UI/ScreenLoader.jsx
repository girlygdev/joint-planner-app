import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Text from './Text';
import GlobalStyle from '../../constants/colors';


const ScreenLoader = ({ message }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={'large'}
        color={GlobalStyle.colors.primary.main}
      />
      <Text caption my={10}>{message}</Text>
      </View>
  );
};

export default ScreenLoader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyle.colors.overlay,
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    opacity: .9
  },
});
