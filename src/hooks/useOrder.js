import React from "react";

import { ERROR, FETCH_DATA_FROM_SERVER } from "../reducers/OrderReducer";
import { useAuth } from "../context/AuthContext";
import { showResultAnimation } from "../utils/showResultAnimation";

export default function useOrder(dispatch, orderId) {
  const { currentUser } = useAuth();
  React.useEffect(() => {
    const getDataFromServer = async () => {
      try {
        let ordersResponse = await fetch(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/api/orders/${orderId}`,
          {
            headers: {
              "x-auth-token": currentUser.token,
            },
          }
        );
        const result = await ordersResponse.json();

        let allTechniciansResponse = await fetch(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/api/technicians/allTechnicians`,
          {
            headers: {
              "x-auth-token": currentUser.token,
            },
          }
        );
        const allTechniciansResult = await allTechniciansResponse.json();

        let allAgentsResponse = await fetch(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/api/agents/allAgents`,
          {
            headers: {
              "x-auth-token": currentUser.token,
            },
          }
        );
        const allAgentsResult = await allAgentsResponse.json();

        if (!result.error) {
          dispatch({
            type: FETCH_DATA_FROM_SERVER,
            value: {
              order: result.data,
              technicians: allTechniciansResult.data,
              agents: allAgentsResult.data,
            },
          });
        } else {
          dispatch({ type: ERROR, value: result.error });
        }
      } catch (ex) {
        console.log(
          "🚀 ~ file: useOrder.js ~ line 55 ~ getDataFromServer ~ ex",
          ex
        );
        dispatch({ type: ERROR, value: ex.message });
      }
    };
    getDataFromServer();
  }, [currentUser.token, dispatch, orderId]);

  const updateOrder = async (data, linkName) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/orders/${linkName}/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": currentUser.token,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();
      if (result.error) throw new Error(result.error);
      showResultAnimation(result, result.success);
    } catch (ex) {
      console.log("🚀 ~ file: useOrder.js ~ line 82 ~ updateOrder ~ ex", ex);
      dispatch({ type: ERROR, value: ex.message });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (event.target.status.value === "Accepted") {
      let data = {
        problem: event.target.problem.value,
        note: event.target.note.value,
        statusDetails: "Your order has been accepted",
        statusState: "Accepted",
      };
      updateOrder(data, "accept");
    } else if (event.target.status.value === "Technician Assigned") {
      let index = event.target.technician.selectedIndex;
      let optionElement = event.target.technician.childNodes[index];
      let technicianId = optionElement.getAttribute("id");

      let data = {
        technicianId,
        statusDetails: "Technician has been assigned to your order",
        statusState: "Technician Assigned",
      };

      updateOrder(data, "assigned");
    } else if (event.target.status.value === "Product Repaired") {
      let data = {
        amount: event.target.amount.value,
        statusDetails: "Your Product has been repaired. Please pay your bill",
        statusState: "Product Repaired",
      };

      updateOrder(data, "repaired");
    }
  };

  return { handleSubmit };
}
