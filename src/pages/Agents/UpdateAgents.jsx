import React, { useState } from "react";

import UpdateFormPage from "../../features/Form/UpdateFormPage";
import { useAuth } from "../../context/AuthContext";
import WrapperComponent from "../../components/custome/WrapperComponent";
import useAddUpdateToDB from "../../hooks/useAddUpdateToDB";
import { reducer, initialState } from "../../reducers/AddDataReducer";

export default function UpdateAgents(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [edit, setEdit] = useState(false);

  const agentId = props.location.state;
  const { currentUser } = useAuth();
  const { updateToServer } = useAddUpdateToDB(dispatch);

  React.useEffect(() => {
    const getAgent = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/agents/${agentId}`, {
          headers: {
            "x-auth-token": currentUser.token,
          },
        });
        const data = await res.json();

        if (data.error) {
          dispatch({ type: "Error", value: data.error });
        } else {
          dispatch({ type: "AgentFetch", value: data });
        }
      } catch (ex) {
        dispatch({ type: "Error", value: ex.message });
      }
    };

    getAgent();
  }, []);

  const updateAgent = async (event, setValidated) => {
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
        email: event.target.email.value,
        phone: event.target.phone.value,
        whatsappNumber: event.target.whatsappNum.value,
        region: event.target.region.value,
        city: event.target.city.value,
        area: event.target.area.value,
        location: event.target.location.value,
      };

      updateToServer("agents", data, agentId);
    }

    setValidated(true);
  };
  return (
    <WrapperComponent error={state.error} loading={state.loading}>
      <UpdateFormPage
        title="Agent"
        data={state.agent}
        handleSubmit={updateAgent}
        edit={edit}
        setEdit={setEdit}
        dispatch={dispatch}
      />
    </WrapperComponent>
  );
}
