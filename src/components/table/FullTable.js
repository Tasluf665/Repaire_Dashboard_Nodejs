import React from "react";

import Table from "./Table";
import TableCardBody from "./TableCardBody";
import TablePagination from "./TablePagination";

export default function FullTable({
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
        <Table
          tableHeader={customerTableHead}
          tableBodyData={filterData(data.data)}
          currPage={currPage}
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
