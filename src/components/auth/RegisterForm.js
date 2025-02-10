import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import TextField from '../UI/TextField';
import {Formik} from 'formik';
import RegisterSchema from '../../schemas/RegisterSchema';
import Button from '../UI/Button';

const RegisterForm = ({ onSubmit }) => {
  const [authValues, setAuthValues] = useState({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <Formik
      initialValues={authValues}
      onSubmit={onSubmit}
      validationSchema={RegisterSchema}
    >
      {({handleChange, touched, errors, values, handleSubmit}) => (
        <>
          <View style={styles.inputContainer}>
            <TextField
              label={'Email address'}
              error={touched.email && errors.email ? errors.email : ''}
              inputProps={{
                maxLength: 50,
                placeholder: 'Email',
                value: values.email,
                onChangeText: handleChange('email'),
                textContentType: 'emailAddress',
                autoComplete: 'email',
                autoCapitalize: 'none',
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextField
              label={'Confirm email'}
              error={
                touched.confirmEmail && errors.confirmEmail
                  ? errors.confirmEmail
                  : ''
              }
              inputProps={{
                maxLength: 50,
                placeholder: 'Confirm email',
                value: values.confirmEmail,
                onChangeText: handleChange('confirmEmail'),
                textContentType: 'emailAddress',
                autoCapitalize: 'none',
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextField
              label={'Password'}
              error={touched.password && errors.password ? errors.password : ''}
              inputProps={{
                maxLength: 50,
                placeholder: 'Password',
                value: values.password,
                onChangeText: handleChange('password'),
                textContentType: 'password',
                autoComplete: 'password',
                autoCapitalize: 'none',
                secureTextEntry: true,
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextField
              label={'Confirm Password'}
              error={
                touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : ''
              }
              inputProps={{
                maxLength: 50,
                placeholder: 'Confirm Password',
                value: values.confirmPassword,
                onChangeText: handleChange('confirmPassword'),
                textContentType: 'password',
                autoCapitalize: 'none',
                secureTextEntry: true,
              }}
            />
          </View>

          <Button
            text='Sign Up'
            style={{marginTop: 8}}
            onPress={handleSubmit}
            color={'secondary'}
          />
        </>
      )}
    </Formik>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
});
