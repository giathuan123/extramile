import React from 'react';
import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  date: Yup.string(),
  street: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  zip: Yup.string().min(5, "Too Short!").matches("^[0-9]{5}(?:-[0-9]{4})?$", "Zip codes of the form 12345 or 12345-6789 Only!"),
});

function Search(props) {
  
  return (
    <Formik
    validationSchema={schema}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(()=> {
        fetch('http://localhost:3001/users/api', {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then ((res) => res.json())
        .then ((data) => {
            props.setData(data);
            console.log(data);
        });
        setSubmitting(false);
      }, 400);
    }}
    initialValues={{
      date: '',
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
        <Row>
          <Col>
            <Form.Group
              controlId="validationFormit01"
            >
                <Form.Label>Date</Form.Label>
                <Form.Control 
                  type="date"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Street Address</Form.Label>
              <Form.Control 
                type="input"
                name="street"
                value={values.street}
                onChange={handleChange}
                isInvalid={!!errors.street}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>City Name</Form.Label>
              <Form.Control 
                type="input"
                name="city"
                value={values.city}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>State Name</Form.Label>
              <Form.Control 
                type="input"
                name="state"
                value={values.state}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group
              controlId="validationFormik05"
            >
              <Form.Label>Zip Code</Form.Label>
              <Form.Control 
                type="input"
                name="zip"
                value={values.zip}
                onChange={handleChange}
                isInvalid={!!errors.zip}
              />
              <Form.Control.Feedback type="invalid">
                {errors.zip}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Accident Severity</Form.Label>
              <Form.Select
                name="severity"
                value={values.severity}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">#</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <div className="divider"/>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      )}
    </Formik>
  );
}
export default Search;