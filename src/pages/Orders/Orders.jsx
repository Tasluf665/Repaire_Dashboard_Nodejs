import React from "react";
import _ from "lodash";

import WrapperComponent from "../../components/custome/WrapperComponent";
import Table from "../../features/table/Table";
import TableTitle from "../../features/table/TableTitle";
import TableSearchbar from "../../features/table/TableSearchbar";
import { OrderTableHead } from "../../data/Order";
import { get_order_td_item } from "../../utils/table/get_order_td_item";

import { initialState, reducer } from "../../reducers/TableReducers";
import useTable from "../../hooks/useTable";
const Order = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { hanldeSearch, handlePaginationClick } = useTable(
    "orders",
    1,
    10,
    dispatch,
    state
  );

  const filterData = (data) => {
    const filter = data.map((item) => {
      let temp = _.pick(item, [
        "_id",
        "category",
        "categoryType",
        "bookingTime",
        "arrivalDate",
        "phone",
        "status",
      ]);

      temp.bookingTime = new Date(temp.bookingTime).toLocaleDateString();
      temp.arrivalDate = new Date(temp.arrivalDate).toLocaleDateString();
      temp.status = temp.status[temp.status.length - 1].statusState;
      return temp;
    });
    return filter;
  };

  return (
    <WrapperComponent error={state.error} loading={state.loading}>
      <TableTitle title="Order" linkAdd="" btnName="Add Order" />
      <TableSearchbar hanldeSearch={hanldeSearch} />
      <Table
        currPage={state.currPage}
        data={state.data}
        customerTableHead={OrderTableHead}
        filterData={filterData}
        handlePaginationClick={handlePaginationClick}
        linkAddress="/updateorder"
        get_td_item={get_order_td_item}
      />
    </WrapperComponent>
  );
};

export default Order;
