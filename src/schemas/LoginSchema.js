import * as yup from 'yup';

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Plase enter a valid email.')
    .required('Please enter your email.'),
  password: yup.string().required('Please enter your password.'),
});

export default LoginSchema;
