import React from "react";
import WrapperComponent from "../../components/custome/WrapperComponent";

import FormPage from "../../features/Form/FormPage";
import useAddUpdateToDB from "../../hooks/useAddUpdateToDB";

import { reducer, initialState } from "../../reducers/AddDataReducer";

export default function AddAgents() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { addToServer } = useAddUpdateToDB(dispatch);

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

  return (
    <WrapperComponent error={state.error} loading={false}>
      <FormPage title="Agent" handleSubmit={addAgent} dispatch={dispatch} />
    </WrapperComponent>
  );
}
