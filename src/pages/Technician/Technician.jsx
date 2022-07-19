import React from "react";
import _ from "lodash";

import WrapperComponent from "../../components/custome/WrapperComponent";
import Table from "../../features/table/Table";
import TableTitle from "../../features/table/TableTitle";
import TableSearchbar from "../../features/table/TableSearchbar";
import { TechnicianTableHead } from "../../data/Technicien";

import { initialState, reducer } from "../../reducers/TableReducers";
import useTable from "../../hooks/useTable";

const Technician = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { hanldeSearch, handlePaginationClick } = useTable(
    "technicians",
    1,
    10,
    dispatch,
    state
  );

  const filterData = (data) => {
    const filter = [];
    data.map((item) => {
      let temp = _.pick(item, ["name", "phone", "region", "city", "area"]);
      temp.agent = item.agent.name;
      filter.push(temp);
    });
    return filter;
  };

  return (
    <WrapperComponent error={state.error} loading={state.loading}>
      <TableTitle
        title="Technicians"
        linkAdd="/addtechnicians"
        btnName="Add Technicians"
      />
      <TableSearchbar hanldeSearch={hanldeSearch} />
      <Table
        currPage={state.currPage}
        data={state.data}
        customerTableHead={TechnicianTableHead}
        filterData={filterData}
        handlePaginationClick={handlePaginationClick}
        linkAddress="/updatetechnicians"
      />
    </WrapperComponent>
  );
};

export default Technician;
