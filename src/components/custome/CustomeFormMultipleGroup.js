import React from "react";
import { Form } from "react-bootstrap";
import Input from "../../features/Form/Input";

export default function CustomeFormMultipleGroup({
  name,
  email,
  phone,
  whatsappNum,
}) {
  return (
    <>
      <Input
        title="Name"
        defaultValue={name ? name : null}
        name="name"
        type="text"
        required={true}
      />
      <Input
        title="Email"
        defaultValue={email ? email : null}
        name="email"
        type="text"
        required={true}
      />
      <Input
        title="Phone"
        defaultValue={phone ? phone : null}
        name="phone"
        type="text"
        required={true}
      />
      <Input
        title="Whatsapp Number"
        defaultValue={whatsappNum ? whatsappNum : null}
        name="whatsappNum"
        type="text"
      />
    </>
  );
}
