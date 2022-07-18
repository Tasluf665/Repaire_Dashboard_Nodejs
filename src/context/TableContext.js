import React from "react";
import { getAgents } from "../server/Agent";
import { useAuth } from "./AuthContext";

const TableContext = React.createContext();

export function useTableContext() {
  return React.useContext(TableContext);
}

export default function TableProvider({ children }) {
  const [loading, setLoading] = React.useState(true);
  const [allAgents, setAllAgents] = React.useState([]);
  const [count, setCount] = React.useState();
  const [error, setError] = React.useState();
  const [currPage, setCurrPage] = React.useState(0);

  const { currentUser } = useAuth();

  React.useEffect(() => {
    const getData = async () => {
      const data = await getAgents(currentUser.token, 1, 10);
      setAllAgents(data.agents);
      setCount(data.count);
      setLoading(false);
    };

    try {
      getData();
    } catch (ex) {
      setError(ex.message);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const customerTableHead = [
    "",
    "name",
    "phone",
    "region",
    "city",
    "area",
    "location",
    "",
  ];

  return (
    <TableContext.Provider
      value={{
        loading,
        title: "Agents",
        linkAdd: "/addagents",
        btnName: "Add Agents",
        customerTableHead,
        allAgents,
        count,
        setAllAgents,
        setCount,
        currPage,
        setCurrPage,
        error,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}
