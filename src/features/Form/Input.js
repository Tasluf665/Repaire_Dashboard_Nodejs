import React from "react";
import { Form } from "react-bootstrap";

export default function Input(props) {
  return (
    <Form.Group
      className={props.cutomeClass ? props.cutomeClass : "col-6 mb-3"}
    >
      <Form.Label>{props.title}</Form.Label>
      <Form.Control
        type={props.type}
        placeholder={`Select ${props.title}`}
        name={props.name}
        defaultValue={props.defaultValue}
        required={props.required}
        disabled={props.disabled}
      />
      <Form.Control.Feedback type="invalid">
        {`Please choose a ${props.title}.`}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
