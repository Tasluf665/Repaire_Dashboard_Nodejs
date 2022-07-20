import React from "react";
import { Form } from "react-bootstrap";

import SubmitButton from "./SubmitButton";
import Input from "./Input";
import Select from "./Select";

import useAddress from "../../hooks/useAddress";
import { useAuth } from "../../context/AuthContext";

export default function FormPage(props) {
  const [validated, setValidated] = React.useState(false);
  const { currentUser } = useAuth();

  const { region, getAddress } = useAddress();
  const [city, setCity] = React.useState([]);
  const [area, setArea] = React.useState([]);

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
          <Select
            title="Region"
            name="region"
            required={true}
            onChange={(event) => {
              let index = event.target.selectedIndex;
              let optionElement = event.target.childNodes[index];
              let id = optionElement.getAttribute("id");
              getAddress(setCity, id);
              setArea([]);
            }}
            data={region}
          />
          <Select
            title="City"
            name="city"
            required={true}
            disabled={city.length === 0}
            onChange={(event) => {
              let index = event.target.selectedIndex;
              let optionElement = event.target.childNodes[index];
              let id = optionElement.getAttribute("id");
              getAddress(setArea, id);
            }}
            data={city}
          />
          <Select
            title="Area"
            name="area"
            required={true}
            disabled={area.length === 0}
            data={area}
          />
          <Input
            title="Location"
            defaultValue={props.location ? props.location : null}
            name="location"
            type="text"
            required={true}
          />
          {props.children}
          <SubmitButton title="Submit" />
        </Form>
      </div>
    </div>
  );
}
