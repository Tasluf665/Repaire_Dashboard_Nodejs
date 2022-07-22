import React from "react";
import { useAuth } from "../context/AuthContext";

import { ERROR } from "../reducers/AgentReducer";

export default function useAddress(dispatch) {
  const { currentUser } = useAuth();
  const [region, setRegion] = React.useState([]);

  const getAddress = async (setData, id) => {
    try {
      const res = await fetch(
        id
          ? `http://localhost:3001/api/address?id=${id}`
          : `http://localhost:3001/api/address`,
        {
          headers: {
            "x-auth-token": currentUser.token,
          },
        }
      );
      const data = await res.json();
      if (!data.error) {
        setData(data);
      } else dispatch({ type: ERROR, value: data.error });
    } catch (ex) {
      dispatch({ type: ERROR, value: ex.message });
    }
  };

  React.useEffect(() => {
    getAddress(setRegion);
  }, []);

  return { region, getAddress };
}
