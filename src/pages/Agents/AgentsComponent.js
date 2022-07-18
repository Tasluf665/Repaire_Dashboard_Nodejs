import React from "react";
import CommonTable from "../../components/custome/CommonTable";
import { useTableContext } from "../../context/TableContext";

export default function AgentsComponent() {
  const { error } = useTableContext;
  return (
    <>
      {error ? (
        <div
          className="col-12 d-flex justify-content-center"
          style={{ marginTop: "30px" }}
        >
          <h1>{error}</h1>
        </div>
      ) : (
        <CommonTable />
      )}
    </>
  );
}
