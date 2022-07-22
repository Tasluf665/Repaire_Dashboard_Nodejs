import React from "react";
import { useAuth } from "../context/AuthContext";
import { fetchData } from "../utils/table/fetchData";
import { ADD_DATA, ERROR, SEARCH, PAGINATION } from "../reducers/TableReducers";

const useTable = (linkName, pageNumber, pageSize, dispatch, state) => {
  const { currentUser } = useAuth();

  React.useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData(
          currentUser.token,
          linkName,
          pageNumber,
          pageSize
        );
        if (!data.error) dispatch({ type: ADD_DATA, data: data });
        else dispatch({ type: ERROR, value: data.error });
      } catch (ex) {
        dispatch({ type: ERROR, value: ex.message });
      }
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
      if (!data.error) {
        dispatch({
          type: SEARCH,
          currPage: 0,
          data: data,
          search: event.target.value,
        });
      } else dispatch({ type: ERROR, value: data.error });
    } catch (ex) {
      dispatch({ type: ERROR, value: ex.message });
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

      if (!data.error)
        dispatch({ type: PAGINATION, currPage: index, data: data });
      else dispatch({ type: ERROR, value: data.error });
    } catch (ex) {
      dispatch({ type: ERROR, value: ex.message });
    }
  };

  return { hanldeSearch, handlePaginationClick };
};

export default useTable;
