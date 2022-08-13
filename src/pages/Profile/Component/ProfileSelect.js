import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

export default function ProfileSelect(props) {
  return (
    <Form.Group as={Col} className="col-5">
      <Form.Label>
        <h4>Gender</h4>
      </Form.Label>
      <Form.Select
        aria-label="Default select example"
        required={true}
        name="gender"
      >
        <option
          value="Male"
          selected={props.defaultValue === "Male" ? true : false}
        >
          Male
        </option>
        <option
          value="Female"
          selected={props.defaultValue === "Female" ? true : false}
        >
          Female
        </option>
        <option
          value="Other"
          selected={props.defaultValue === "Other" ? true : false}
        >
          Other
        </option>
      </Form.Select>
    </Form.Group>
  );
}
