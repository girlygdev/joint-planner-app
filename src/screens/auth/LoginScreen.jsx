import {Image, StyleSheet, View} from 'react-native';
import GlobalStyle from '../../constants/colors';
import Text from '../../components/UI/Text';
import Button from '../../components/UI/Button';
import LoginForm from '../../components/auth/LoginForm';
import {useAuth} from '../../hooks/auth/useAuth';
import useFirebaseAuthError from '../../hooks/auth/useFirebaseAuthError';
import InlineToast from '../../components/UI/InlineToast';
import useAppStore from '../../store/useAppStore';

const LoginScreen = ({navigation}) => {
  const {login} = useAuth();
  const {errorMessage, handleAuthError} = useFirebaseAuthError();
  const {setIsLoading} = useAppStore((state) => state);

  const loginAccountHandler = async (values) => {
    setIsLoading(true);

    try {
      await login(values.email, values.password);
      setIsLoading(false);
    } catch (error) {
      handleAuthError(error);
      setIsLoading(false);
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
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
        <Text lg bold>
          Sign in
        </Text>
        <Text sm>Log back in to your account.</Text>
      </View>

      <LoginForm onSubmit={loginAccountHandler} />

      {errorMessage && <InlineToast color='error' message={errorMessage} />}

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <Button
          text='Register'
          color={'primary'}
          flat
          onPress={navigateToRegister}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

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
    width: 200,
    height: 150,
  },
  form: {
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'poppins',
  },
  subtitle: {
    fontFamily: 'poppins-light',
  },
  footerContainer: {
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    borderTopWidth: 1,
    borderTopColor: GlobalStyle.colors.secondary.main,
    textAlign: 'center',
    fontSize: 12,
    paddingTop: 16,
  },
});
