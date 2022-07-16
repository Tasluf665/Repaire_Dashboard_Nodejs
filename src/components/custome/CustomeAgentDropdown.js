import React from "react";
import { Form } from "react-bootstrap";

import CustomeFormGroup from "./CustomeFormGroup";

export default function CustomeAgentDropdown(props) {
  const getOptions = (array) => {
    return array.map((item) => {
      return (
        <option value={item.key} key={item.key}>
          {item.name +
            ", " +
            item.phone +
            ", " +
            item.region +
            ", " +
            item.city}
        </option>
      );
    });
  };
  return (
    <CustomeFormGroup
      title={props.title ? props.title : "Agent"}
      cutomeClass="col-12 mb-3"
    >
      <Form.Select
        aria-label="Default select example"
        name={props.title ? props.title.toLowerCase() : "agent"}
        required
      >
        {getOptions(props.allAgents)}
      </Form.Select>
    </CustomeFormGroup>
  );
}
