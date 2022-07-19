import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function TableTitle(props) {
  return (
    <div className="d-flex justify-content-between">
      <h2 className="page-header">{props.title}</h2>
      <div className="h-50">
        <Link to={props.linkAdd}>
          <MDBBtn color="" style={styles.button}>
            {props.btnName}
          </MDBBtn>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  button: {
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: "var(--main-color)",
    color: "var(--txt-white)",
  },
};
