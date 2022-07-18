import React from "react";
import _ from "lodash";

import FullTable from "../../components/table/FullTable";
import TopTitle from "../../components/custome/TopTitle";
import Searchbar from "../../components/custome/Searchbar";
import WrapperComponent from "../../components/custome/WrapperComponent";
import { getTechnicians } from "../../server/Technician";
import { useAuth } from "../../context/AuthContext";

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

const Technician = () => {
  const { currentUser } = useAuth();

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState();
  const [data, setData] = React.useState([]);
  const [currPage, setCurrPage] = React.useState(0);

  React.useEffect(() => {
    const getData = async () => {
      const data = await getTechnicians(currentUser.token, 1, 10);
      setData(data);
      setLoading(false);
    };

    try {
      getData();
    } catch (ex) {
      setError(ex.message);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const searchRef = React.useRef();

  const hanldeSearch = async () => {
    try {
      const data = await getTechnicians(
        currentUser.token,
        1,
        10,
        searchRef.current.value != "" ? searchRef.current.value : null
      );
      setCurrPage(0);
      setData(data);
    } catch (ex) {
      setError(ex.message);
    }
  };

  const filterData = (data) => {
    const filter = [];
    data.map((item) => {
      let temp = _.pick(item, ["name", "phone", "region", "city", "area"]);
      temp.agent = item.agent.name;
      filter.push(temp);
    });
    return filter;
  };

  const handlePaginationClick = async (index) => {
    try {
      const data = await getTechnicians(
        currentUser.token,
        index + 1,
        10,
        searchRef.current.value
      );
      setCurrPage(index);
      setData(data);
    } catch (ex) {
      setError(ex.message);
    }
  };

  return (
    <WrapperComponent error={error} loading={loading}>
      <>
        <TopTitle
          title="Technician"
          linkAdd="/addtechnicians"
          btnName="Add Technicians"
        />
        <Searchbar hanldeSearch={hanldeSearch} searchRef={searchRef} />
        <FullTable
          currPage={currPage}
          data={data}
          customerTableHead={customerTableHead}
          filterData={filterData}
          handlePaginationClick={handlePaginationClick}
          linkAddress="/updatetechnicians"
        />
      </>
    </WrapperComponent>
  );
};

export default Technician;
