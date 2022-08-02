import React from "react";

import FormPage from "../../features/Form/FormPage";
import useAddUpdateToDB from "../../hooks/useAddUpdateToDB";
import Select from "../../features/Form/Select";
import { useAuth } from "../../context/AuthContext";
import WrapperComponent from "../../components/custome/WrapperComponent";
import {
  reducer,
  initialState,
  FETCH_ALL_AGENTS_FROM_SERVER,
  ERROR,
  LOADING,
} from "../../reducers/TechnicianReducer";

export default function AddTechnician() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { addToServer } = useAddUpdateToDB(dispatch);
  const { currentUser } = useAuth();

  React.useEffect(() => {
    const getAllAgent = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/api/agents`,
          {
            headers: {
              "x-auth-token": currentUser.token,
            },
          }
        );
        const data = await res.json();
        if (data.error) {
          dispatch({ type: ERROR, value: data.error });
        } else {
          const agents = data.data;
          dispatch({ type: FETCH_ALL_AGENTS_FROM_SERVER, value: agents });
        }
      } catch (ex) {
        dispatch({ type: ERROR, value: ex.message });
      }
    };

    getAllAgent();
  }, [currentUser.token]);

  const addTechnician = async (event, setValidated) => {
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
      addToServer("technicians", data);
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
      <FormPage
        title="Technician"
        handleSubmit={addTechnician}
        dispatch={dispatch}
      >
        <Select
          customeClass="col-12 mb-3"
          title="Agent"
          name="agent"
          required={true}
          options={getOptions(state.allAgents)}
        />
      </FormPage>
    </WrapperComponent>
  );
}
