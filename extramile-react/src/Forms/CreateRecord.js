import React from 'react';
import { Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import { schema } from './schema';
import { Button } from 'react-bootstrap';
import { 
  CityInput, 
  StreetInput, 
  StateInput,
  ZipInput,
  SeverityInputSingle,
} from './FormComponents';

function CreateRecord(props) {
  return (
    <Formik
    innerRef={props.formRef}
    validationSchema={schema}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(()=> {
        console.log(values)
        fetch('http://localhost:3001/users/create', {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then ((res) => res.json())
        .then ((data) => {
          console.log(data);
        });
        setSubmitting(false);
      }, 400);
    }}
    initialValues={{
      street: '',
      city: '',
      state: '',
      zip: '',
      severity: '',
    }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
      <Form noValidate onSubmit={handleSubmit}>
        <Row><StreetInput value={values.street} onChange={handleChange} /></Row>
        <Row><CityInput value={values.city} onChange={handleChange}/></Row>
        <Row><StateInput value={values.state} onChange={handleChange}/></Row>
        <Row><ZipInput value={values.zip} onChange={handleChange} errors={errors}/></Row>
        <Row><SeverityInputSingle value={values.severity} onChange={handleChange}/></Row>
      </Form>
      )}
    </Formik>
  );
}
export default CreateRecord;