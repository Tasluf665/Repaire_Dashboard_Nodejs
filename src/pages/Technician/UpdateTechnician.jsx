import React, { useState } from "react";

import CustomeInput from "../../components/custome/CustomeInput";
import { handleSubmit } from "../../server/Technician";
import CustomeSpinner from "../../components/custome/CustomeSpinner";
import CustomeAgentDropdown from "../../components/custome/CustomeAgentDropdown";
import CommonUpdatePage from "../../components/custome/CommonUpdatePage";
import { useAuth } from "../../context/AuthContext";
import { getAgents } from "../../server/Agent";

export default function UpdateTechnician(props) {
  const [edit, setEdit] = useState(false);
  const [agent, setAgent] = React.useState();
  const [allAgents, setAllAgents] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const { currentUser, logout } = useAuth();
  const [error, setError] = React.useState();

  React.useEffect(() => {
    const getData = async () => {
      const accessToken = await currentUser.accessToken;
      const allAgents = await getAgents(accessToken);

      if (allAgents.error) {
        if (allAgents.error === "Auth token is expired") {
          logout();
        }
        setError(allAgents.error);
      } else {
        const targetAgent = allAgents.find(
          (agent) => agent.key === props.location.state.agentId
        );
        setAllAgents(allAgents);
        setAgent(targetAgent);
        setLoading(false);
      }
    };
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {loading ? (
        <CustomeSpinner />
      ) : (
        <>
          {error ? (
            <div
              className="col-12 d-flex justify-content-center"
              style={{ marginTop: "30px" }}
            >
              <h1>{error}</h1>
            </div>
          ) : (
            <CommonUpdatePage
              title="Agent"
              location={props.location}
              handleSubmit={handleSubmit}
              edit={edit}
              setEdit={setEdit}
            >
              {edit ? (
                <CustomeAgentDropdown allAgents={allAgents} />
              ) : (
                <CustomeInput
                  title="Agent"
                  cutomeClass="col-12 mb-3"
                  defaultValue={
                    agent
                      ? agent.name +
                        ", " +
                        agent.phone +
                        ", " +
                        agent.region +
                        ", " +
                        agent.city
                      : null
                  }
                  type="text"
                />
              )}
            </CommonUpdatePage>
          )}
        </>
      )}
    </div>
  );
}
