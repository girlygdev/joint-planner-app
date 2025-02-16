import * as yup from 'yup';

const ProfileSchema = yup.object().shape({
  email: yup
    .string()
    .email('Plase enter a valid email.')
    .required('Please enter your email.'),
  name: yup
    .string()
    .max(50, 'Name can only be up to 50 characters.')
});

export default ProfileSchema;
