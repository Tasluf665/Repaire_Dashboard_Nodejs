import React from "react";
import { Form } from "react-bootstrap";

import CustomeFormGroup from "./CustomeFormGroup";

export default function CustomeInput(props) {
  return (
    <CustomeFormGroup title={props.title} cutomeClass={props.cutomeClass}>
      <Form.Control
        type={props.type}
        placeholder={`Select ${props.title}`}
        name={props.title.toLowerCase()}
        defaultValue={props.defaultValue}
        required
        disabled={props.disabled}
      />
    </CustomeFormGroup>
  );
}
