import Swal from "sweetalert2";
import { objectToArray } from "./Common";

const AgentToDB = async (data, title, accessToken) => {
  if (title === "add") {
    let res = await fetch(
      `https://repair-45f86-default-rtdb.asia-southeast1.firebasedatabase.app/agents.json?auth=${accessToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      return "There is an Error";
    } else {
      return "Agent is Successfull added";
    }
  } else {
    let agentId = data.key;
    delete data.key;
    let res = await fetch(
      `https://repair-45f86-default-rtdb.asia-southeast1.firebasedatabase.app/agents/${agentId}.json?auth=${accessToken}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      return "There is an Error";
    } else {
      return "Agent is Successfull Updated";
    }
  }
};

export const handleSubmit = async (
  event,
  setValidated,
  title,
  accessToken,
  key
) => {
  const form = event.currentTarget;
  event.preventDefault();

  if (
    form.checkValidity() === false ||
    event.target.city.value === "" ||
    event.target.area.value === ""
  ) {
    event.stopPropagation();
  } else {
    const data = {
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      whatsappNum: event.target.whatsappNum.value,
      region: event.target.region.value,
      city: event.target.city.value,
      area: event.target.area.value,
      location: event.target.location.value,
      key: key,
    };

    const result = await AgentToDB(data, title, accessToken);
    if (result === "There is an Error") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: result,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  setValidated(true);
};

//Without any backend

export const getAgents = async (accessToken) => {
  const res = await fetch(
    `https://repair-45f86-default-rtdb.asia-southeast1.firebasedatabase.app/agents.json?auth=${accessToken}`
  );
  const data = await res.json();

  if (data ? data.error : false) {
    return data;
  }

  return objectToArray(data);
};
