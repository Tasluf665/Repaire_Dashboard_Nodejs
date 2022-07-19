import React from "react";

export default function TableCardBody(props) {
  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card__body">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
