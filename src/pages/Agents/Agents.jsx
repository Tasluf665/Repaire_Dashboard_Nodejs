import React from "react";

import CommonTable from "../../components/custome/CommonTable";
import { getAgents } from "../../server/Agent";
import { useAuth } from "../../context/AuthContext";

const Agents = () => {
  const [loading, setLoading] = React.useState(true);
  const [allAgents, setAllAgents] = React.useState([]);
  const [error, setError] = React.useState();

  const { currentUser } = useAuth();

  React.useEffect(() => {
    const getData = async () => {
      const allAgents = await getAgents(currentUser.token);
      setAllAgents(allAgents);
      setLoading(false);
    };

    try {
      getData();
    } catch (ex) {
      setError(ex.message);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const customerTableHead = [
    "",
    "name",
    "phone",
    "region",
    "city",
    "area",
    "location",
    "",
  ];

  return (
    <>
      {error ? (
        <div
          className="col-12 d-flex justify-content-center"
          style={{ marginTop: "30px" }}
        >
          <h1>{error}</h1>
        </div>
      ) : (
        <CommonTable
          loading={loading}
          title="Agents"
          linkAdd="/addagents"
          btnName="Add Agents"
          customerTableHead={customerTableHead}
          allAgents={allAgents}
        />
      )}
    </>
  );
};

export default Agents;
