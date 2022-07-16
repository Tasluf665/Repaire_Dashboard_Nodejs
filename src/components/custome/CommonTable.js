import React from "react";
import { Form } from "react-bootstrap";

import CustomeSpinner from "./CustomeSpinner";
import TopTitle from "./TopTitle";
import Table from "../table/Table";

export default function CommonTable(props) {
  const renderHead = (item, index) => <th key={index}>{item}</th>;
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
              onChange={props.handleSearch}
              style={styles.inputStyle}
            />
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card__body">
                  <Table
                    limit="10"
                    headData={props.customerTableHead}
                    renderHead={(item, index) => renderHead(item, index)}
                    renderBody={(item, index) => props.renderBody(item, index)}
                    bodyData={props.filterData}
                    dataShow={props.dataShow}
                    setDataShow={props.setDataShow}
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
