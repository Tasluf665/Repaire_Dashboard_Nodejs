import React from "react";
import Input from "./Input";

export default function InputGroup(props) {
  return (
    <>
      <Input
        title="Name"
        defaultValue={props.name ? props.name : null}
        name="name"
        type="text"
        required={true}
      />
      <Input
        title="Email"
        defaultValue={props.email ? props.email : null}
        name="email"
        type="text"
      />
      <Input
        title="Phone"
        defaultValue={props.phone ? props.phone : null}
        name="phone"
        type="text"
        required={true}
      />
      <Input
        title="Whatsapp Number"
        defaultValue={props.whatsappNum ? props.whatsappNum : null}
        name="whatsappNum"
        type="text"
      />
      <Input
        title="Location"
        defaultValue={props.location ? props.location : null}
        name="location"
        type="text"
        required={true}
      />
    </>
  );
}
