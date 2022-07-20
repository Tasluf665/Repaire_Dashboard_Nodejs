import React, { useState } from "react";

import UpdateFormPage from "../../features/Form/UpdateFormPage";
import { useAuth } from "../../context/AuthContext";
import WrapperComponent from "../../components/custome/WrapperComponent";
import useAddUpdateToDB from "../../hooks/useAddUpdateToDB";

export default function UpdateAgents(props) {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [agent, setAgent] = useState();
  const [error, setError] = useState();

  const agentId = props.location.state;
  const { currentUser } = useAuth();
  const { updateToServer } = useAddUpdateToDB();

  React.useEffect(() => {
    const getAgent = async () => {
      const res = await fetch(`http://localhost:3001/api/agents/${agentId}`, {
        headers: {
          "x-auth-token": currentUser.token,
        },
      });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setAgent(data);
        setLoading(false);
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
    <WrapperComponent error={error} loading={loading}>
      <UpdateFormPage
        title="Agent"
        data={agent}
        handleSubmit={updateAgent}
        edit={edit}
        setEdit={setEdit}
      />
    </WrapperComponent>
  );
}
