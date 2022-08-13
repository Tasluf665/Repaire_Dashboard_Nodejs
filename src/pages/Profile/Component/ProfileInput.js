import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

export default function ProfileInput(props) {
  return (
    <Form.Group as={Col} className="col-5">
      <Form.Label>
        <h4>{props.title}</h4>
      </Form.Label>
      <Form.Control
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        required={true}
        defaultValue={props.defaultValue}
      />
    </Form.Group>
  );
}
