import { useAuth } from "../context/AuthContext";
import {
  DATA_ADDED_TO_SERVER,
  ERROR,
  DATA_UPDATED_TO_SERVER,
} from "../reducers/AgentReducer";
import { showResultAnimation } from "../utils/showResultAnimation";

export default function useAddUpdateToDB(dispatch) {
  const { currentUser } = useAuth();

  const updateToServer = async (linkName, data, id) => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/${linkName}/${id}`,
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
        dispatch({ type: DATA_UPDATED_TO_SERVER, value: result.data });
        showResultAnimation(result, result.success);
      } else {
        dispatch({ type: ERROR, value: result.error });
      }
    } catch (ex) {
      console.log(
        "🚀 ~ file: useAddUpdateToDB.js ~ line 37 ~ updateToServer ~ ex",
        ex
      );
      dispatch({ type: ERROR, value: ex.message });
    }
  };

  const addToServer = async (linkName, data) => {
    try {
      console.log(JSON.stringify(data));
      let response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/${linkName}`,
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
        showResultAnimation(result, result.success);
      } else {
        dispatch({ type: ERROR, value: result.error });
      }
    } catch (ex) {
      console.log(
        "🚀 ~ file: useAddUpdateToDB.js ~ line 66 ~ addToServer ~ ex",
        ex
      );
      dispatch({ type: ERROR, value: ex.message });
    }
  };

  return { updateToServer, addToServer };
}
