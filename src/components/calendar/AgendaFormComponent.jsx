import {View, StyleSheet, Pressable} from 'react-native';
import TextField from '../UI/TextField';
import {Formik} from 'formik';
import Button from '../UI/Button';
import AgendaSchema from '../../schemas/AgendaSchema';
import {useState} from 'react';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import {Platform} from 'react-native';
import moment from 'moment';
import Text from '../UI/Text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GlobalStyle from '../../constants/colors';

const AgendaFormComponent = ({
  initialValues = {title: '', notes: '', time: null},
  onSubmit,
}) => {
  const [initValues, setInitValues] = useState(initialValues);
  const [showPicker, setShowPicker] = useState(false);

  const changeAndroidTimeHandler = (event, date, setFieldValue) => {
    if (date) {
      const time = moment(date).format('hh:mm A');
      setFieldValue('time', time);
    }
    setShowPicker(false);
    }

  const showTimePickerHandler = (setFieldValue) => {
    if (Platform.OS == 'android') {
      DateTimePickerAndroid.open({
        value: new Date(),
        onChange: (event, date) => changeAndroidTimeHandler(event, date, setFieldValue),
        mode: 'time',
        is24Hour: false,
      });
    } else {
      setShowPicker(true);
    }
  };

  const submitHandler = (values) => {
    const formData = {
      title: values.title ?? '',
      notes: values.notes ?? ''
    }

    if (values.time) {
      if (Platform.OS == 'ios') {
        formData.time = moment(values.time).format('hh:mm A')
      } else {
        formData.time = values.time
      }
    }

    onSubmit(formData)
  }

  return (
    <Formik
      initialValues={initValues}
      enableReinitialize
      onSubmit={submitHandler}
      validationSchema={AgendaSchema}
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
              label={'Title'}
              error={touched.title && errors.title ? errors.title : ''}
              inputProps={{
                maxLength: 150,
                placeholder: 'Title',
                value: values.title,
                onChangeText: handleChange('title'),
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextField
              label={'Notes'}
              error={
                touched.notes && errors.notes
                  ? errors.notes
                  : ''
              }
              inputProps={{
                maxLength: 200,
                placeholder: 'Notes',
                value: values.notes,
                onChangeText: handleChange('notes'),
                multiline: true,
                numberOfLines: 5,
              }}
              style={{
                height: 120,
                verticalAlign: 'top',
              }}
            />
          </View>

          <View style={styles.inputContainer2}>
            <Text sm>Time</Text>

            {showPicker && Platform.OS == 'ios' ? (
              <DateTimePicker
                mode='time'
                value={values.time ?? new Date()}
                onChange={(event, time) => setFieldValue('time', time)}
              />
            ) : (
              <View style={styles.timeActionContainer}>
                <Button
                  flat
                  color={values.time ? 'dark' : 'light'}
                  text={values.time ?? 'Unset'}
                  onPress={showTimePickerHandler.bind(this, setFieldValue)}
                  inline
                />

                {values.time && (
                  <Pressable
                    style={{marginLeft: 8}}
                    onPress={() => setFieldValue('time', null)}
                  >
                    <Ionicons
                      size={18}
                      name='trash-bin-outline'
                      color={GlobalStyle.colors.error.main}
                    />
                  </Pressable>
                )}
              </View>
            )}
          </View>

          <Button
            text='Save'
            onPress={handleSubmit}
            color={'primary'}
            style={styles.submitButton}
          />
        </>
      )}
    </Formik>
  );
};

export default AgendaFormComponent;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  submitButton: {
    marginTop: 8,
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
