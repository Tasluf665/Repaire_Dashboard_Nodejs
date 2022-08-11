import React, { useState } from "react";

import UpdateFormPage from "../../features/Form/UpdateFormPage";
import { useAuth } from "../../context/AuthContext";
import WrapperComponent from "../../components/custome/WrapperComponent";
import useAddUpdateToDB from "../../hooks/useAddUpdateToDB";
import { reducer, initialState } from "../../reducers/AgentReducer";
import {
  ERROR,
  FETCH_DATA_FROM_SERVER,
  LOADING,
} from "../../reducers/AgentReducer";

export default function UpdateAgents(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [edit, setEdit] = useState(false);

  const agentId = props.location.state;
  const { currentUser } = useAuth();
  const { updateToServer } = useAddUpdateToDB(dispatch);

  React.useEffect(() => {
    const getAgent = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/api/agents/${agentId}`,
          {
            headers: {
              "x-auth-token": currentUser.token,
            },
          }
        );
        const result = await res.json();

        if (result.error) {
          dispatch({ type: ERROR, value: result.error });
        } else {
          dispatch({ type: FETCH_DATA_FROM_SERVER, value: result.data });
        }
      } catch (ex) {
        console.log(
          "🚀 ~ file: UpdateAgents.jsx ~ line 41 ~ getAgent ~ ex",
          ex
        );
        dispatch({ type: ERROR, value: ex.message });
      }
    };

    getAgent();
  }, [agentId, currentUser.token]);

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

      dispatch({ type: LOADING });
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
