import * as yup from 'yup';

const RegisterSchema = yup.object().shape({
  email: yup
    .string()
    .email('Plase enter a valid email.')
    .required('Please enter your email.'),
  confirmEmail: yup
    .string()
    .email('Plase enter a valid email.')
    .required('Please confirm your email')
    .oneOf([yup.ref('email'), ''], 'Email did not match.'),
  password: yup.string().required('Please enter your password.'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), ''], 'Password did not match.'),
});

export default RegisterSchema;
