import React from "react";
import { Form } from "react-bootstrap";
import _ from "lodash";

import CustomeSpinner from "./CustomeSpinner";
import TopTitle from "./TopTitle";
import CustomeTable from "./CustomeTable";

export default function CommonTable(props) {
  const filterAllAgent = (allAgents) => {
    const filterAgent = [];
    allAgents.map((item) => {
      filterAgent.push(
        _.pick(item, ["name", "phone", "region", "city", "area", "location"])
      );
    });
    return filterAgent;
  };

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
        </div>
      )}
    </div>
  );
}
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
