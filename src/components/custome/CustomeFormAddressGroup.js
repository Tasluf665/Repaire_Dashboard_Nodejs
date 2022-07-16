import React from "react";
import { Form } from "react-bootstrap";
import { getRegion, getAddressList } from "../../assets/Address/address";

import CustomeFormGroup from "./CustomeFormGroup";

export default function CustomeFormAddressGroup(props) {
  const [city, setCity] = React.useState([]);
  const [area, setArea] = React.useState([]);

  const getOptions = (array) => {
    return array.map((item) => (
      <option id={item.id} key={item.id}>
        {item.displayName}
      </option>
    ));
  };

  return (
    <>
      <CustomeFormGroup title="Region">
        <Form.Select
          aria-label="Default select example"
          name="region"
          required
          onChange={(event) => setCity(getAddressList(event.target.value))}
        >
          {getOptions(getRegion())}
        </Form.Select>
      </CustomeFormGroup>

      <CustomeFormGroup title="City">
        <Form.Select
          aria-label="Default select example"
          name="city"
          disabled={city.length === 0}
          onChange={(event) => setArea(getAddressList(event.target.value))}
        >
          {getOptions(city)}
        </Form.Select>
      </CustomeFormGroup>

      <CustomeFormGroup title="Area">
        <Form.Select
          aria-label="Default select example"
          name="area"
          disabled={area.length === 0}
        >
          {getOptions(area)}
        </Form.Select>
      </CustomeFormGroup>
    </>
  );
}
