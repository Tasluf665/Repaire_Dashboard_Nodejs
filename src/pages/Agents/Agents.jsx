import React from "react";
import { Link } from "react-router-dom";

import CommonTable from "../../components/custome/CommonTable";
import { getAgents } from "../../server/Agent";
import { useAuth } from "../../context/AuthContext";

const Agents = () => {
  const [loading, setLoading] = React.useState(true);
  const [allAgents, setAllAgents] = React.useState([]);
  const [filterAllAgents, setFilterAllAgents] = React.useState([]);
  const [dataShow, setDataShow] = React.useState();
  const [error, setError] = React.useState();

  const { currentUser, logout } = useAuth();

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
        setDataShow(allAgents);
        setFilterAllAgents(allAgents);
        setLoading(false);
      }
    };
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = (event) => {
    const value = event.target.value;
    let filterData = allAgents.filter((item) => item.phone.includes(value));
    setDataShow(filterData);
    setFilterAllAgents(filterData);
  };

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

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.countId}</td>
      <td>{item.name}</td>
      <td>{item.phone}</td>
      <td>{item.region}</td>
      <td>{item.city}</td>
      <td>{item.area}</td>
      <td>{item.location}</td>
      <td>
        <Link
          to={{
            pathname: "/updateagents",
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
          title="Agents"
          linkAdd="/addagents"
          btnName="Add Agents"
          handleSearch={handleSearch}
          customerTableHead={customerTableHead}
          filterData={filterAllAgents}
          dataShow={dataShow}
          setDataShow={setDataShow}
          renderBody={renderBody}
        />
      )}
    </>
  );
};

export default Agents;
