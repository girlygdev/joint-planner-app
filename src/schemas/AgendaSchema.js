import * as yup from 'yup';

const AgendaSchema = yup.object().shape({
  title: yup
    .string()
    .max(150, 'Maximum allowed characters reached.')
    .required('Please enter event name or title.'),
});

export default AgendaSchema;
