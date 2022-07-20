import React from "react";

import FormPage from "../../features/Form/FormPage";
import useAddUpdateToDB from "../../hooks/useAddUpdateToDB";
import Select from "../../features/Form/Select";
import { useAuth } from "../../context/AuthContext";
import { fetchData } from "../../utils/table/fetchData";

export default function AddTechnician() {
  const { addToServer } = useAddUpdateToDB();
  const [allAgents, setAllAgents] = React.useState([]);
  const { currentUser } = useAuth();

  React.useEffect(() => {
    const getAllAgent = async () => {
      const res = await fetch(`http://localhost:3001/api/agents`, {
        headers: {
          "x-auth-token": currentUser.token,
        },
      });

      const data = await fetchData(currentUser.token, "agents");
      const agents = data.data;
      setAllAgents(agents);
    };

    getAllAgent();
  }, []);

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
    <FormPage title="Technician" handleSubmit={addTechnician}>
      <Select
        customeClass="col-12 mb-3"
        title="Agent"
        name="agent"
        required={true}
        options={getOptions(allAgents)}
      />
    </FormPage>
  );
}
