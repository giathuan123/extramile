import { Form } from "react-bootstrap";

export const Street = (props) => {
  return (
    <Form.Group>
      <Form.Label>Street Address</Form.Label>
      <Form.Control
        type='input'
        name='street'
        value={props.value}
        onChange={props.onChange}
      />
    </Form.Group>
  );
}

export const City = (props) => {
  return (
    <Form.Group>
      <Form.Label>City</Form.Label>
      <Form.Control
        type='input'
        name='city'
        value={props.value}
        onChange={props.onChange}
      />
    </Form.Group>
  );
}

export const State = (props) => {
  return (
    <Form.Group>
      <Form.Label>State</Form.Label>
      <Form.Control
        type='input'
        name='state'
        value={props.value}
        onChange={props.onChange}
      />
    </Form.Group>
  );
}

export const Zip = (props) => {
  return (
    <Form.Group>
      <Form.Label>Zip</Form.Label>
      <Form.Control
        type='input'
        name='zip'
        value={props.value}
        onChange={props.onChange}
        isInvalid={!!props.errors.zip}
      />
      <Form.Control.Feedback type='invalid'>
        {props.errors.zip}
      </Form.Control.Feedback>
    </Form.Group>
  );
}

export const SeverityOne = (props) => {
  return (
    <Form.Group>
      <Form.Label>Severity</Form.Label>
      <Form.Select
        name='severity'
        value={props.value}
        onChange={props.onChange}
      >
        <option value="">#</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </Form.Select>
    </Form.Group>
  )
}
