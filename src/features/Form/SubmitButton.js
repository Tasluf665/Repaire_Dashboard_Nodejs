import React from "react";
import { Button } from "react-bootstrap";

export default function SubmitButton(props) {
  return (
    <div
      className="col-12 d-flex justify-content-center"
      style={{ marginTop: "30px" }}
    >
      <Button variant="" style={styles.button} type="submit">
        {props.title}
      </Button>
    </div>
  );
}

const styles = {
  button: {
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: "var(--main-color)",
    color: "var(--txt-white)",
  },
};
