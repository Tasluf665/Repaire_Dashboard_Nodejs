import React from "react";
import { getRange } from "../../utils/table/getRange";

export default function TablePagination({
  count,
  currPage,
  handlePaginationClick,
}) {
  return (
    <div className="table__pagination">
      {getRange(count).map((item, index) => (
        <div
          key={index}
          className={`table__pagination-item ${
            currPage === index ? "active" : ""
          }`}
          onClick={() => handlePaginationClick(index)}
        >
          {item + 1}
        </div>
      ))}
    </div>
  );
}
