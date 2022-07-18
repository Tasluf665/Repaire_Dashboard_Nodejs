import React from "react";
import { Form } from "react-bootstrap";

import CenterButton from "./CenterButton";
import CustomeFormAddressGroup from "./CustomeFormAddressGroup";
import CustomeFormMultipleGroup from "./CustomeFormMultipleGroup";
import CustomeInput from "./CustomeInput";
import { useAuth } from "../../context/AuthContext";

export default function CommonAddPage(props) {
  const [validated, setValidated] = React.useState(false);
  const { currentUser } = useAuth();

  return (
    <div className="col-12 d-flex justify-content-center">
      <div className="col-10">
        <h2 className="col-12 mb-4">Add {props.title}</h2>
        <Form
          className="col-12 row"
          noValidate
          validated={validated}
          onSubmit={(event) => {
            props.handleSubmit(event, setValidated, currentUser.token);
          }}
        >
          <CustomeFormMultipleGroup />
          <CustomeFormAddressGroup />

          <CustomeInput title="Location" type="text" />
          {props.children}
          <CenterButton title="Submit" />
        </Form>
      </div>
    </div>
  );
}
