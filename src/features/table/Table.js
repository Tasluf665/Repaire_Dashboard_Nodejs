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
}) {
  return (
    <>
      <TableCardBody>
        <TableBody
          tableHeader={customerTableHead}
          tableBodyData={filterData(data.data)}
          linkAddress={linkAddress}
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
