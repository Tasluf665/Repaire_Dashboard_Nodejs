import React from "react";
import AgentsComponent from "./AgentsComponent";
import TableProvider from "../../context/TableContext";

const Agents = () => {
  return (
    <TableProvider>
      <AgentsComponent />
    </TableProvider>
  );
};

export default Agents;
