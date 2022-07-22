import React from "react";
import _ from "lodash";

import WrapperComponent from "../../components/custome/WrapperComponent";
import Table from "../../features/table/Table";
import TableTitle from "../../features/table/TableTitle";
import TableSearchbar from "../../features/table/TableSearchbar";
import { AgentTableHead } from "../../data/Agent";

import { reducer, initialState } from "../../reducers/TableReducers";
import useTable from "../../hooks/useTable";

export default function Agents() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { hanldeSearch, handlePaginationClick } = useTable(
    "agents",
    1,
    10,
    dispatch,
    state
  );

  const filterData = (data) => {
    const filter = data.map((item) => {
      return _.pick(item, [
        "_id",
        "name",
        "phone",
        "region",
        "city",
        "area",
        "location",
        "id",
      ]);
    });
    return filter;
  };

  return (
    <WrapperComponent error={state.error} loading={state.loading}>
      <TableTitle title="Agents" linkAdd="/addagents" btnName="Add Agents" />
      <TableSearchbar hanldeSearch={hanldeSearch} />
      <Table
        currPage={state.currPage}
        data={state.data}
        customerTableHead={AgentTableHead}
        filterData={filterData}
        handlePaginationClick={handlePaginationClick}
        linkAddress="/updateagents"
      />
    </WrapperComponent>
  );
}
