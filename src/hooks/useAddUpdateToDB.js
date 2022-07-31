import _ from "lodash";
import Swal from "sweetalert2";

import { useAuth } from "../context/AuthContext";
import {
  DATA_ADDED_TO_SERVER,
  ERROR,
  DATA_UPDATED_TO_SERVER,
} from "../reducers/AgentReducer";

export default function useAddUpdateToDB(dispatch) {
  const { currentUser } = useAuth();

  const showResultAnimation = (result, linkName) => {
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
        title: `${_.startCase(linkName)} is successfully updated`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const updateToServer = async (linkName, data, id) => {
    try {
      let response = await fetch(
        `${process.env.BACKEND_BASE_URL}/api/${linkName}/${id}`,
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
        dispatch({ type: DATA_UPDATED_TO_SERVER, value: result });
        showResultAnimation(result, linkName);
      } else dispatch({ type: ERROR, value: result.error });
    } catch (ex) {
      dispatch({ type: ERROR, value: ex.message });
    }
  };

  const addToServer = async (linkName, data) => {
    try {
      console.log(JSON.stringify(data));
      let response = await fetch(
        `${process.env.BACKEND_BASE_URL}/api/${linkName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": currentUser.token,
          },
          body: JSON.stringify(data),
        }
      );

      let result = await response.json();

      if (!result.error) {
        dispatch({ type: DATA_ADDED_TO_SERVER });
        showResultAnimation(result, linkName);
      } else dispatch({ type: ERROR, value: result.error });
    } catch (ex) {
      console.log("In Ex");
      dispatch({ type: ERROR, value: ex.message });
    }
  };

  return { updateToServer, addToServer };
}
