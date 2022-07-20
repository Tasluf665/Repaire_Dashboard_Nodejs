import React from "react";
import { Form } from "react-bootstrap";

import SubmitButton from "./SubmitButton";
import InputGroup from "./InputGroup";
import AddressInputs from "./AddressInputs";
import FormTitle from "./FormTitle";

export default function FormPage(props) {
  const [validated, setValidated] = React.useState(false);

  return (
    <div className="col-12 d-flex justify-content-center">
      <div className="col-10">
        <FormTitle title={`Add ${props.title}`} />
        <Form
          className="col-12 row"
          noValidate
          validated={validated}
          onSubmit={(event) => {
            props.handleSubmit(event, setValidated);
          }}
        >
          <InputGroup />
          <AddressInputs />

          {props.children}
          <SubmitButton title="Submit" />
        </Form>
      </div>
    </div>
  );
}
