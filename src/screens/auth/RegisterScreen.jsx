import {Image, StyleSheet, View} from 'react-native';
import GlobalStyle from '../../constants/colors';
import Text from '../../components/UI/Text';
import Button from '../../components/UI/Button';
import RegisterForm from '../../components/auth/RegisterForm';
import {useAuth} from '../../hooks/auth/useAuth';
import InlineToast from '../../components/UI/InlineToast';
import useFirebaseAuthError from '../../hooks/auth/useFirebaseAuthError';
import useAppStore from '../../store/useAppStore';

const RegisterScreen = ({navigation}) => {
  const {register} = useAuth();
  const {errorMessage, handleAuthError} = useFirebaseAuthError();
  const {setIsLoading} = useAppStore((state) => state);

  const createAccountHandler = async (values) => {
    setIsLoading(true);

    try {
      await register(values.email, values.password);
      setIsLoading(false);
    } catch (error) {
      handleAuthError(error);
      setIsLoading(false);
    }
  };

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
        <Text lg bold>
          Welcome to your next planner!
        </Text>
        <Text sm>Ready to sign up for an account?</Text>
      </View>

      <RegisterForm onSubmit={createAccountHandler} />

      {errorMessage && <InlineToast color='error' message={errorMessage} />}

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <Button text='Login' color={'primary'} flat onPress={navigateToLogin} />
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
    marginTop: 24,
  },
  footerText: {
    borderTopWidth: 1,
    borderTopColor: GlobalStyle.colors.secondary.main,
    textAlign: 'center',
    fontSize: 12,
    paddingTop: 16,
  },
});
