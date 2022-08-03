import React from "react";

import Select from "../../../features/Form/Select";
import Input from "../../../features/Form/Input";

export default function AgentTechnicianItem({ edit, selectedStatus, state }) {
  const [technician, setTechnician] = React.useState([]);

  const getSelectOptions = (array) => {
    return array.map((item) => (
      <option id={item._id} key={item._id}>
        {item.name + ", " + item.area}
      </option>
    ));
  };

  const getTechnician = (id) => {
    const technician = state.technicians.filter(
      (item) => item.agent._id === id
    );
    setTechnician(technician);
  };

  const getTargetAgent = (technicianId) => {
    const technician = state.technicians.find(
      (item) => item._id === technicianId
    );
    const agent = technician.agent;
    const text = `${agent.name}, ${agent.phone}, ${agent.city}, ${agent.region}`;
    return text;
  };

  const getTargetTechnician = (technicianId) => {
    const technician = state.technicians.find(
      (item) => item._id === technicianId
    );
    const text = `${technician.name}, ${technician.phone}, ${technician.city}, ${technician.region}`;
    return text;
  };
  return (
    <>
      {edit ? (
        selectedStatus === "Technician Assigned" ? (
          <>
            <Select
              customeClass="col-12 mb-3"
              title="Agent"
              name="agnet"
              options={getSelectOptions(state.agents)}
              onChange={(event) => {
                let index = event.target.selectedIndex;
                let optionElement = event.target.childNodes[index];
                let id = optionElement.getAttribute("id");
                getTechnician(id);
              }}
            />
            <Select
              customeClass="col-12 mb-3"
              title="Technician"
              name="technician"
              disabled={technician.length === 0}
              options={getSelectOptions(technician)}
            />
          </>
        ) : null
      ) : null}

      {state.order.technicianId && selectedStatus !== "Technician Assigned" ? (
        <>
          <Input
            title="Agent"
            defaultValue={getTargetAgent(state.order.technicianId)}
            type="text"
            cutomeClass="col-12 mb-3"
            disabled={edit}
          />
          <Input
            title="Technician"
            defaultValue={getTargetTechnician(state.order.technicianId)}
            type="text"
            cutomeClass="col-12 mb-3"
            disabled={edit}
          />
        </>
      ) : null}
    </>
  );
}
