import React from "react";

import useAddress from "../../hooks/useAddress";
import Select from "../../features/Form/Select";

export default function CustomeFormAddressGroup(props) {
  const { region, getAddress } = useAddress();
  const [city, setCity] = React.useState([]);
  const [area, setArea] = React.useState([]);

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
    </>
  );
}
