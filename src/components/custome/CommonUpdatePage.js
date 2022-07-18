import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import CustomeInput from "./CustomeInput";
import CustomeFormMultipleGroup from "./CustomeFormMultipleGroup";
import CenterButton from "./CenterButton";
import CustomeFormAddressGroup from "./CustomeFormAddressGroup";
import { useAuth } from "../../context/AuthContext";

export default function CommonUpdatePage(props) {
  const [validated, setValidated] = useState(false);
  const { currentUser } = useAuth();

  const detailsComponent = () => {
    return (
      <>
        <CustomeInput
          title="Region"
          defaultValue={props.location.state.region}
          type="text"
        />
        <CustomeInput
          title="City"
          defaultValue={props.location.state.city}
          type="text"
        />

        <CustomeInput
          title="area"
          defaultValue={props.location.state.area}
          type="text"
        />
      </>
    );
  };

  return (
    <div className="col-12 d-flex justify-content-center">
      <div className="col-10">
        <div className="d-flex justify-content-between">
          <h2 className="col-12 mb-4">Update {props.title}</h2>
          <div className="h-50">
            <Button
              variant=""
              style={styles.button}
              type="submit"
              onClick={() => props.setEdit(true)}
            >
              Edit
            </Button>
          </div>
        </div>
        <Form
          className="col-12 row"
          noValidate
          validated={validated}
          onSubmit={(event) =>
            props.handleSubmit(
              event,
              setValidated,
              currentUser.token,
              props.location.state._id
            )
          }
        >
          <CustomeFormMultipleGroup
            name={props.location.state.name}
            email={props.location.state.email}
            phone={props.location.state.phone}
            whatsappNum={props.location.state.whatsappNumber}
          />

          {props.edit ? <CustomeFormAddressGroup /> : detailsComponent()}

          <CustomeInput
            title="Location"
            defaultValue={props.location.state.location}
            type="text"
          />
          {props.children}
          {props.edit ? <CenterButton title="Update" /> : null}
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
