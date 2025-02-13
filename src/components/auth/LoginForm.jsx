import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import TextField from '../UI/TextField';
import {Formik} from 'formik';
import LoginSchema from '../../schemas/LoginSchema';
import Button from '../UI/Button';

const LoginForm = ({ onSubmit }) => {
  const [authValues, setAuthValues] = useState({
    email: '',
    password: '',
  });

  return (
    <Formik
      initialValues={authValues}
      onSubmit={onSubmit}
      validationSchema={LoginSchema}
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
                keyboardType: 'email-address'
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

          <Button
            text='Login'
            style={{marginTop: 8}}
            onPress={handleSubmit}
            color={'secondary'}
          />
        </>
      )}
    </Formik>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
});
