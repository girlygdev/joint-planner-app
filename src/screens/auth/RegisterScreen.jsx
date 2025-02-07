import {Image, StyleSheet, View, ScrollView} from 'react-native';
import GlobalStyle from '../../constants/colors';
import Text from '../../components/UI/Text';
import Button from '../../components/UI/Button';

const RegisterScreen = ({navigation}) => {
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/logo/logo.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.headerContainer}>
        <Text
          lg
          bold
        >
          Welcome to NextPlan.
        </Text>
        <Text sm>Ready to sign up for an account?</Text>
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <Button
          text='Login'
          color={'success'}
          flat
          onPress={navigateToLogin}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyle.colors.background,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  form: {
    padding: 20,
  },
  headerContainer: {},
  title: {
    fontSize: 20,
    fontFamily: 'poppins',
  },
  subtitle: {
    fontFamily: 'poppins-light',
  },
  footerContainer: {
    justifyContent: 'center',
    marginTop: 16,
  },
  footerText: {
    borderTopWidth: 1,
    borderTopColor: GlobalStyle.colors.secondary.main,
    textAlign: 'center',
    fontSize: 12,
    paddingTop: 16,
  },
});
