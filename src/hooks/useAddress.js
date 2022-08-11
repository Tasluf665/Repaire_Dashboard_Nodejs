import React from "react";
import { useAuth } from "../context/AuthContext";

import { ERROR } from "../reducers/AgentReducer";

export default function useAddress(dispatch) {
  const { currentUser } = useAuth();
  const [region, setRegion] = React.useState([]);

  const getAddress = React.useCallback(
    async (setData, id) => {
      try {
        const res = await fetch(
          id
            ? `${process.env.REACT_APP_BACKEND_BASE_URL}/api/address?id=${id}`
            : `${process.env.REACT_APP_BACKEND_BASE_URL}/api/address`,
          {
            headers: {
              "x-auth-token": currentUser.token,
            },
          }
        );
        const result = await res.json();

        if (!result.error) {
          setData(result.data);
        } else dispatch({ type: ERROR, value: result.error });
      } catch (ex) {
        console.log("🚀 ~ file: useAddress.js ~ line 29 ~ ex", ex);
        dispatch({ type: ERROR, value: ex.message });
      }
    },
    [dispatch, currentUser.token]
  );

  React.useEffect(() => {
    getAddress(setRegion);
  }, [getAddress]);

  return { region, getAddress };
}
