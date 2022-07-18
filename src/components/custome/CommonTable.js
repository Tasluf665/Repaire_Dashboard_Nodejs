import React from "react";
import _ from "lodash";

import CustomeSpinner from "./CustomeSpinner";
import TopTitle from "./TopTitle";
import CustomeTable from "./CustomeTable";
import Searchbar from "./Searchbar";
import TableCardBody from "./TableCardBody";

import { getAgents } from "../../server/Agent";
import { useAuth } from "../../context/AuthContext";
import { useTableContext } from "../../context/TableContext";

export default function CommonTable(props) {
  const { currentUser } = useAuth();
  const searchRef = React.useRef();
  const {
    loading,
    title,
    linkAdd,
    btnName,
    customerTableHead,
    allAgents,
    count,
    setAllAgents,
    setCount,
    currPage,
    setCurrPage,
  } = useTableContext();

  const filterAllAgent = (allAgents) => {
    const filterAgent = [];
    allAgents.map((item) => {
      filterAgent.push(
        _.pick(item, ["name", "phone", "region", "city", "area", "location"])
      );
    });
    return filterAgent;
  };

  const getRange = () => {
    let pages = 1;

    let page = Math.floor(count / 10);
    pages = count % 10 === 0 ? page : page + 1;
    let range = [...Array(pages).keys()];

    return range;
  };

  const handleClick = async (index) => {
    const data = await getAgents(
      currentUser.token,
      index + 1,
      10,
      searchRef.current.value
    );
    setCurrPage(index);
    setAllAgents(data.agents);
    setCount(data.count);
  };

  const hanldeSearch = async (event) => {
    const data = await getAgents(
      currentUser.token,
      1,
      10,
      searchRef.current.value != "" ? searchRef.current.value : null
    );
    setCurrPage(0);
    setAllAgents(data.agents);
    setCount(data.count);
  };

  return (
    <div>
      {loading ? (
        <CustomeSpinner />
      ) : (
        <div>
          <TopTitle title={title} linkAdd={linkAdd} btnName={btnName} />
          <Searchbar hanldeSearch={hanldeSearch} searchRef={searchRef} />
          <TableCardBody>
            <CustomeTable
              tableHeader={customerTableHead}
              allAgents={filterAllAgent(allAgents)}
              currPage={currPage}
            />
            <div className="table__pagination">
              {getRange().map((item, index) => (
                <div
                  key={index}
                  className={`table__pagination-item ${
                    currPage === index ? "active" : ""
                  }`}
                  onClick={() => handleClick(index)}
                >
                  {item + 1}
                </div>
              ))}
            </div>
          </TableCardBody>
        </div>
      )}
    </div>
  );
}
