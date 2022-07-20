import React from "react";
import { useAuth } from "../context/AuthContext";

const useAddress = () => {
  const { currentUser } = useAuth();
  const [region, setRegion] = React.useState([]);

  const getAddress = async (setData, id) => {
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
    setData(data);
  };

  React.useEffect(() => {
    getAddress(setRegion);
  }, []);

  return { region, getAddress };
};

export default useAddress;
