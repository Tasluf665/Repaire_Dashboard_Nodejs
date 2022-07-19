import React from "react";
import { Form } from "react-bootstrap";

export default function TableSearchbar(props) {
  return (
    <div className="col-12 d-flex justify-content-center">
      <Form.Control
        type="text"
        placeholder="Search with Phone Number"
        name="search"
        onChange={props.hanldeSearch}
        style={styles.inputStyle}
      />
    </div>
  );
}
const styles = {
  inputStyle: {
    marginBottom: "25px",
    width: "40%",
  },
};
