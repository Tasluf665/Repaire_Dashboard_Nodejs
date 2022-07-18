import React from "react";

export default function TablePagination({
  count,
  currPage,
  handlePaginationClick,
}) {
  const getRange = () => {
    let pages = 1;

    let page = Math.floor(count / 10);
    pages = count % 10 === 0 ? page : page + 1;
    let range = [...Array(pages).keys()];

    return range;
  };

  return (
    <div className="table__pagination">
      {getRange().map((item, index) => (
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
