import React from "react";
import Swal from "sweetalert2";

import { useAuth } from "../context/AuthContext";

export default function useAddUpdateToDB(dispatch) {
  const { currentUser } = useAuth();

  const showResultAnimation = (result) => {
    if (result.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result.error,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Agent is successfully updated",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const updateToServer = async (linkName, data, id) => {
    try {
      let response = await fetch(
        `http://localhost:3001/api/${linkName}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": currentUser.token,
          },
          body: JSON.stringify(data),
        }
      );

      let result = await response.json();
      if (!result.error) {
        dispatch({ type: "DataAddedToServer" });
        showResultAnimation(result);
      } else dispatch({ type: "Error", value: result.error });
    } catch (ex) {
      dispatch({ type: "Error", value: ex.message });
    }
  };

  const addToServer = async (linkName, data) => {
    try {
      let response = await fetch(`http://localhost:3001/api/${linkName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": currentUser.token,
        },
        body: JSON.stringify(data),
      });

      let result = await response.json();

      if (!result.error) {
        dispatch({ type: "DataAddedToServer" });
        showResultAnimation(result);
      } else dispatch({ type: "Error", value: result.error });
    } catch (ex) {
      dispatch({ type: "Error", value: ex.message });
    }
  };

  return { updateToServer, addToServer };
}
