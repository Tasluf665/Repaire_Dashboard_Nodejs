import React from "react";

import Select from "./Select";
import useAddress from "../../hooks/useAddress";

export default function AddressInputs() {
  const { region, getAddress } = useAddress();
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
        options={getOptions(region)}
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
        options={getOptions(city)}
      />
      <Select
        title="Area"
        name="area"
        required={true}
        disabled={area.length === 0}
        options={getOptions(area)}
      />
    </>
  );
}
