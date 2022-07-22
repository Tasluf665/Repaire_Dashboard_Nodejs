import React, { useState } from "react";

import UpdateFormPage from "../../features/Form/UpdateFormPage";
import { useAuth } from "../../context/AuthContext";
import WrapperComponent from "../../components/custome/WrapperComponent";
import useAddUpdateToDB from "../../hooks/useAddUpdateToDB";
import {
  reducer,
  initialState,
  ERROR,
  LOADING,
  FETCH_ALL_AGENTS_AND_TECHNICIANS_FROM_SERVER,
} from "../../reducers/TechnicianReducer";
import Select from "../../features/Form/Select";
import Input from "../../features/Form/Input";

export default function UpdateTechnician(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [edit, setEdit] = useState(false);

  const technicianId = props.location.state;
  const { currentUser } = useAuth();
  const { updateToServer } = useAddUpdateToDB(dispatch);

  React.useEffect(() => {
    const getDataFromServer = async () => {
      try {
        let res = await fetch(
          `http://localhost:3001/api/technicians/${technicianId}`,
          {
            headers: {
              "x-auth-token": currentUser.token,
            },
          }
        );
        const technician = await res.json();

        res = await fetch(`http://localhost:3001/api/agents`, {
          headers: {
            "x-auth-token": currentUser.token,
          },
        });
        const data = await res.json();
        const allAgents = data.data;

        if (!technician.error && !allAgents.error) {
          dispatch({
            type: FETCH_ALL_AGENTS_AND_TECHNICIANS_FROM_SERVER,
            value: { technician, allAgents },
          });
        } else {
          dispatch({
            type: ERROR,
            value: technician.error ? technician.error : allAgents.error,
          });
        }
      } catch (ex) {
        dispatch({ type: ERROR, value: ex.message });
      }
    };

    getDataFromServer();
  }, [technicianId, currentUser.token]);

  const updateTechnician = async (event, setValidated) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (
      form.checkValidity() === false ||
      event.target.city.value === "" ||
      event.target.area.value === ""
    ) {
      event.stopPropagation();
    } else {
      let index = event.target.agent.selectedIndex;
      let optionElement = event.target.agent.childNodes[index];
      let agentId = optionElement.getAttribute("id");

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
        agentId: agentId,
      };

      dispatch({ type: LOADING });
      updateToServer("technicians", data, technicianId);
    }

    setValidated(true);
  };

  const getOptions = (array) => {
    return array.map((item) => (
      <option id={item._id} key={item._id}>
        {item.name + ", " + item.area}
      </option>
    ));
  };
  return (
    <WrapperComponent error={state.error} loading={state.loading}>
      <UpdateFormPage
        title="Agent"
        data={state.technician}
        handleSubmit={updateTechnician}
        edit={edit}
        setEdit={setEdit}
        dispatch={dispatch}
      >
        {edit ? (
          <Select
            customeClass="col-12 mb-3"
            title="Agent"
            name="agent"
            required={true}
            options={getOptions(state.allAgents)}
          />
        ) : (
          <Input
            title="Agent"
            defaultValue={
              state.technician
                ? state.technician.agent.name +
                  ", " +
                  state.technician.agent.city
                : null
            }
            name="agent"
            type="text"
            cutomeClass="col-12 mb-3"
          />
        )}
      </UpdateFormPage>
    </WrapperComponent>
  );
}
