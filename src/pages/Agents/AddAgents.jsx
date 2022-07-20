import React from "react";

import FormPage from "../../features/Form/FormPage";
import useAddUpdateToDB from "../../hooks/useAddUpdateToDB";

export default function AddAgents() {
  const { addToServer } = useAddUpdateToDB();

  const addAgent = async (event, setValidated) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (
      form.checkValidity() === false ||
      event.target.city.value === "" ||
      event.target.area.value === ""
    ) {
      event.stopPropagation();
    } else {
      const data = {
        name: event.target.name.value,
        email:
          event.target.email.value === ""
            ? undefined
            : event.target.email.value,
        phone: event.target.phone.value,
        whatsappNumber:
          event.target.whatsappNum.value === ""
            ? undefined
            : event.target.whatsappNum.value,
        region: event.target.region.value,
        city: event.target.city.value,
        area: event.target.area.value,
        location: event.target.location.value,
      };

      addToServer("agents", data);
    }

    setValidated(true);
  };

  return <FormPage title="Agent" handleSubmit={addAgent} />;
}
