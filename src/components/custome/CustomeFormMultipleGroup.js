import React from "react";
import { Form } from "react-bootstrap";
import CustomeFormGroup from "./CustomeFormGroup";
import CustomeInput from "./CustomeInput";

export default function CustomeFormMultipleGroup({
  name,
  email,
  phone,
  whatsappNum,
}) {
  return (
    <>
      <CustomeInput
        title="Name"
        defaultValue={name ? name : null}
        type="text"
      />
      <CustomeInput
        title="Email"
        defaultValue={email ? email : null}
        type="text"
      />
      <CustomeInput
        title="Phone"
        defaultValue={phone ? phone : null}
        type="text"
      />
      <CustomeFormGroup title="Whatsapp Number">
        <Form.Control
          type="number"
          placeholder="Enter Whatsapp Number"
          name="whatsappNum"
          defaultValue={whatsappNum ? whatsappNum : null}
        />
      </CustomeFormGroup>
    </>
  );
}
