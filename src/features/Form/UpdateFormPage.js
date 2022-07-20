import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import InputGroup from "./InputGroup";
import AddressInputs from "./AddressInputs";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import FormTitle from "./FormTitle";

export default function UpdateFormPage(props) {
  const [validated, setValidated] = useState(false);

  const detailsComponent = () => {
    return (
      <>
        <Input
          title="Region"
          defaultValue={props.data.region ? props.data.region : null}
          name="region"
          type="text"
        />
        <Input
          title="City"
          defaultValue={props.data.city ? props.data.city : null}
          name="city"
          type="text"
        />
        <Input
          title="Area"
          defaultValue={props.data.area ? props.data.area : null}
          name="phone"
          type="text"
        />
      </>
    );
  };

  return (
    <div className="col-12 d-flex justify-content-center">
      <div className="col-10">
        <FormTitle title={`Update ${props.title}`}>
          <Button
            variant=""
            style={styles.button}
            type="submit"
            onClick={() => props.setEdit(true)}
          >
            Edit
          </Button>
        </FormTitle>
        <Form
          className="col-12 row"
          noValidate
          validated={validated}
          onSubmit={(event) => props.handleSubmit(event, setValidated)}
        >
          <InputGroup
            name={props.data.name}
            email={props.data.email}
            phone={props.data.phone}
            whatsappNum={props.data.whatsappNumber}
            location={props.data.location}
          />

          {props.edit ? <AddressInputs /> : detailsComponent()}

          {props.children}
          {props.edit ? <SubmitButton title="Update" /> : null}
        </Form>
      </div>
    </div>
  );
}

const styles = {
  button: {
    paddingLeft: 35,
    paddingRight: 35,
    backgroundColor: "var(--main-color)",
    color: "var(--txt-white)",
  },
};
