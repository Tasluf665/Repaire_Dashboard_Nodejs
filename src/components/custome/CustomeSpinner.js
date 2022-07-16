import React from "react";
import { Spinner } from "react-bootstrap";

export default function CustomeSpinner() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <Spinner animation="border" variant="success" />
    </div>
  );
}
