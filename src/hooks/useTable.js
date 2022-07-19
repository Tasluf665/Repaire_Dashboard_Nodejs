import React from "react";
import { useAuth } from "../context/AuthContext";
import { fetchData } from "../utils/table/fetchData";

const useTable = (linkName, pageNumber, pageSize, dispatch, state) => {
  const { currentUser } = useAuth();

  React.useEffect(() => {
    const getData = async () => {
      const data = await fetchData(
        currentUser.token,
        linkName,
        pageNumber,
        pageSize
      );
      if (!data.error) dispatch({ type: "AddData", data: data });
      else dispatch({ type: "Error", value: data.error });
    };

    getData();
  }, []);

  const hanldeSearch = async (event) => {
    const search = event.target.value != "" ? event.target.value : null;
    try {
      const data = await fetchData(
        currentUser.token,
        linkName,
        pageNumber,
        pageSize,
        search
      );
      dispatch({
        type: "Search",
        currPage: 0,
        data: data,
        search: event.target.value,
      });
    } catch (ex) {
      dispatch({ type: "Error", value: ex.message });
    }
  };

  const handlePaginationClick = async (index) => {
    try {
      const data = await fetchData(
        currentUser.token,
        linkName,
        index + 1,
        pageSize,
        state.search
      );

      dispatch({ type: "Pagination", currPage: index, data: data });
    } catch (ex) {
      dispatch({ type: "Error", value: ex.message });
    }
  };

  return { hanldeSearch, handlePaginationClick };
};

export default useTable;
