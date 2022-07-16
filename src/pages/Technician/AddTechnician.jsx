import React, { useState } from "react";

import { handleSubmit } from "../../server/Technician";
import CommonAddPage from "../../components/custome/CommonAddPage";
import CustomeSpinner from "../../components/custome/CustomeSpinner";
import CustomeAgentDropdown from "../../components/custome/CustomeAgentDropdown";
import { useAuth } from "../../context/AuthContext";
import { getAgents } from "../../server/Agent";

export default function AddTechnician() {
  const [loading, setLoading] = React.useState(true);
  const [allAgents, setAllAgents] = useState([]);
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
        setAllAgents(allAgents);
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
            <CommonAddPage title="Technician" handleSubmit={handleSubmit}>
              <CustomeAgentDropdown allAgents={allAgents} />
            </CommonAddPage>
          )}
        </>
      )}
    </div>
  );
}
