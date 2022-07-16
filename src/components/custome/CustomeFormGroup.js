import React from "react";
import { Form } from "react-bootstrap";

export default function CustomeFormGroup(props) {
  return (
    <Form.Group
      className={props.cutomeClass ? props.cutomeClass : "col-6 mb-3"}
      controlId="nameControl"
    >
      <Form.Label>{props.title}</Form.Label>
      {props.children}
      <Form.Control.Feedback type="invalid">
        {`Please choose a ${props.title}.`}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
