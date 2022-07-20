import React from "react";

export default function FormTitle(props) {
  return (
    <div className="d-flex justify-content-between">
      <h2 className="col-12 mb-4">{props.title}</h2>
      <div className="h-50">{props.children}</div>
    </div>
  );
}
