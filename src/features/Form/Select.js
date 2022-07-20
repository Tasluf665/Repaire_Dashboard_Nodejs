import React from "react";
import { Form } from "react-bootstrap";

export default function Select(props) {
  return (
    <Form.Group
      className={props.customeClass ? props.customeClass : "col-6 mb-3"}
      controlId="nameControl"
    >
      <Form.Label>{props.title}</Form.Label>
      <Form.Select
        aria-label="Default select example"
        name={props.name}
        required={props.required}
        onChange={props.onChange}
        disabled={props.disabled}
      >
        {props.options}
      </Form.Select>
      <Form.Control.Feedback type="invalid">
        {`Please choose a ${props.title}.`}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
