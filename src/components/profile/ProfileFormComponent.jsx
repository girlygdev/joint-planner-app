import {View, StyleSheet} from 'react-native';
import TextField from '../UI/TextField';
import {Formik} from 'formik';
import Button from '../UI/Button';
import {useState} from 'react';
import ProfileSchema from '../../schemas/ProfileSchema';

const ProfileFormComponent = ({
  onSubmit,
  initialValues = {name: '', email: ''},
}) => {
  const [initValues, setInitValues] = useState(initialValues);

  const submitHandler = (values) => {
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={initValues}
      enableReinitialize
      onSubmit={submitHandler}
      validationSchema={ProfileSchema}
    >
      {({
        handleChange,
        touched,
        errors,
        values,
        setFieldValue,
        handleSubmit,
      }) => (
        <>
          <View style={styles.inputContainer}>
            <TextField
              label={'Name'}
              error={touched.name && errors.name ? errors.name : ''}
              inputProps={{
                maxLength: 150,
                placeholder: 'Name',
                value: values.name,
                onChangeText: handleChange('name'),
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextField
              label={'Email'}
              error={touched.email && errors.email ? errors.email : ''}
              inputProps={{
                maxLength: 50,
                placeholder: 'Email',
                value: values.email,
                onChangeText: handleChange('email'),
                textContentType: 'emailAddress',
                autoComplete: 'email',
                autoCapitalize: 'none',
                keyboardType: 'email-address',
              }}
            />
          </View>

          <Button
            text='Save'
            onPress={handleSubmit}
            color={'secondary'}
            outlined
            rounded
            style={styles.submitButton}
          />
        </>
      )}
    </Formik>
  );
};

export default ProfileFormComponent;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  submitButton: {
    marginTop: 10
  },
  timeActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
});
