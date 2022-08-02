import React from "react";

import TableBody from "./TableBody";
import TableCardBody from "./TableCardBody";
import TablePagination from "./TablePagination";

export default function Table({
  currPage,
  data,
  customerTableHead,
  filterData,
  handlePaginationClick,
  linkAddress,
  get_td_item,
}) {
  return (
    <>
      <TableCardBody>
        <TableBody
          tableHeader={customerTableHead}
          tableBodyData={filterData(data.data)}
          linkAddress={linkAddress}
          get_td_item={get_td_item}
        />
        <TablePagination
          count={data.count}
          currPage={currPage}
          handlePaginationClick={handlePaginationClick}
        />
      </TableCardBody>
    </>
  );
}
