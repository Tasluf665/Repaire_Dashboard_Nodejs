import React from "react";
import { useAuth } from "../context/AuthContext";
import { fetchData } from "../utils/table/fetchData";
import { ADD_DATA, ERROR, SEARCH, PAGINATION } from "../reducers/TableReducers";

const useTable = (linkName, pageNumber, pageSize, dispatch, state) => {
  const { currentUser } = useAuth();

  React.useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData(
          currentUser.token,
          linkName,
          pageNumber,
          pageSize
        );

        if (!result.error)
          dispatch({
            type: ADD_DATA,
            data: { data: result.data, count: result.count },
          });
        else dispatch({ type: ERROR, value: result.error });
      } catch (ex) {
        console.log("🚀 ~ file: useTable.js ~ line 26 ~ getData ~ ex", ex);
        dispatch({ type: ERROR, value: ex.message });
      }
    };

    getData();
  }, [linkName, pageNumber, pageSize, dispatch, currentUser.token]);

  const hanldeSearch = async (event) => {
    const search = event.target.value !== "" ? event.target.value : null;
    try {
      const result = await fetchData(
        currentUser.token,
        linkName,
        pageNumber,
        pageSize,
        search
      );

      if (!result.error) {
        dispatch({
          type: SEARCH,
          currPage: 0,
          data: { data: result.data, count: result.count },
          search: event.target.value,
        });
      } else dispatch({ type: ERROR, value: result.error });
    } catch (ex) {
      console.log("🚀 ~ file: useTable.js ~ line 54 ~ hanldeSearch ~ ex", ex);
      dispatch({ type: ERROR, value: ex.message });
    }
  };

  const handlePaginationClick = async (index) => {
    try {
      const result = await fetchData(
        currentUser.token,
        linkName,
        index + 1,
        pageSize,
        state.search
      );

      if (!result.error)
        dispatch({
          type: PAGINATION,
          currPage: index,
          data: { data: result.data, count: result.count },
        });
      else dispatch({ type: ERROR, value: result.error });
    } catch (ex) {
      console.log(
        "🚀 ~ file: useTable.js ~ line 77 ~ handlePaginationClick ~ ex",
        ex
      );
      dispatch({ type: ERROR, value: ex.message });
    }
  };

  return { hanldeSearch, handlePaginationClick };
};

export default useTable;
