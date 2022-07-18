import React from "react";
<<<<<<< HEAD
import { Form } from "react-bootstrap";
=======
>>>>>>> 405dd40fab289a58c1eacd76ac41203d08af69b9
import _ from "lodash";

import CustomeSpinner from "./CustomeSpinner";
import TopTitle from "./TopTitle";
import CustomeTable from "./CustomeTable";
<<<<<<< HEAD

export default function CommonTable(props) {
=======
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

>>>>>>> 405dd40fab289a58c1eacd76ac41203d08af69b9
  const filterAllAgent = (allAgents) => {
    const filterAgent = [];
    allAgents.map((item) => {
      filterAgent.push(
        _.pick(item, ["name", "phone", "region", "city", "area", "location"])
      );
    });
    return filterAgent;
  };

<<<<<<< HEAD
  return (
    <div>
      {props.loading ? (
        <CustomeSpinner />
      ) : (
        <div>
          <TopTitle
            title={props.title}
            linkAdd={props.linkAdd}
            btnName={props.btnName}
          />
          <div className="col-12 d-flex justify-content-center">
            <Form.Control
              type="text"
              placeholder="Search with Phone Number"
              name="search"
              onChange={() => {}}
              style={styles.inputStyle}
            />
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card__body">
                  <CustomeTable
                    tableHeader={props.customerTableHead}
                    allAgents={filterAllAgent(props.allAgents)}
                  />
                </div>
              </div>
            </div>
          </div>
=======
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
>>>>>>> 405dd40fab289a58c1eacd76ac41203d08af69b9
        </div>
      )}
    </div>
  );
}
<<<<<<< HEAD
const styles = {
  inputStyle: {
    marginBottom: "25px",
    width: "40%",
  },
};

{
  /* <Table
    limit="10"
    headData={props.customerTableHead}
    renderHead={(item, index) => renderHead(item, index)}
    renderBody={(item, index) => props.renderBody(item, index)}
    bodyData={props.filterData}
    dataShow={props.dataShow}
    setDataShow={props.setDataShow}
/> */
}
=======
>>>>>>> 405dd40fab289a58c1eacd76ac41203d08af69b9
