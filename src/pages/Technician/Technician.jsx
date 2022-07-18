import React from "react";
import { Link } from "react-router-dom";

import CommonTable from "../../components/custome/CommonTable";
import { getAgents } from "../../server/Agent";
import { getTechnicians } from "../../server/Technician";
import { useAuth } from "../../context/AuthContext";

const Technician = () => {
  const [loading, setLoading] = React.useState(true);
  const [allTechnicians, setAllTechnicians] = React.useState([]);
  const [filterAllTechnicians, setFilterAllTechnicians] = React.useState([]);
  const [allAgents, setAllAgents] = React.useState([]);
  const [dataShow, setDataShow] = React.useState();
  const [error, setError] = React.useState();

  const { currentUser, logout } = useAuth();

  React.useEffect(() => {
    const getData = async () => {
      const accessToken = await currentUser.accessToken;
      const allAgents = await getAgents(accessToken);
      const allTechnicians = await getTechnicians(accessToken);

      if (allTechnicians.error || allAgents.error) {
        if (allAgents.error === "Auth token is expired") {
          logout();
        }
        setError(allAgents.error);
      } else {
        setAllAgents(allAgents);
        setAllTechnicians(allTechnicians);
        setDataShow(allTechnicians);
        setFilterAllTechnicians(allTechnicians);
        setLoading(false);
      }
    };
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = (event) => {
    const value = event.target.value;

    let filterData = allTechnicians.filter((item) =>
      item.phone.includes(value)
    );
    setDataShow(filterData);
    setFilterAllTechnicians(filterData);
  };

  const customerTableHead = [
    "",
    "name",
    "phone",
    "region",
    "city",
    "area",
    "agent",
    "",
  ];

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.countId}</td>
      <td>{item.name}</td>
      <td>{item.phone}</td>
      <td>{item.region}</td>
      <td>{item.city}</td>
      <td>{item.area}</td>
      <td>{allAgents.find((agent) => agent.key === item.agentId).phone}</td>
      <td>
        <Link
          to={{
            pathname: "/updatetechnician",
            state: item,
          }}
          style={{ textDecoration: "none" }}
        >
          Details
        </Link>
      </td>
    </tr>
  );

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
          title="Technicians"
          linkAdd="/addtechnician"
          btnName="Add Technician"
          handleSearch={handleSearch}
          customerTableHead={customerTableHead}
          filterData={filterAllTechnicians}
          dataShow={dataShow}
          setDataShow={setDataShow}
          renderBody={renderBody}
        />
      )}
    </>
  );
};

export default Technician;
