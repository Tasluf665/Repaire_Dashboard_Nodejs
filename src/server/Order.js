import Swal from "sweetalert2";

const saveNotification = async (
  customerId,
  accessToken,
  state,
  statusDetails,
  orderId
) => {
  let res;
  try {
    res = await fetch(
      `https://repair-45f86-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${customerId}/Notifications.json?auth=${accessToken}`
    );

    if (res.status !== 200) {
      throw new Error(
        "There is an Error. Cann't fetch notification from database"
      );
    }
  } catch (e) {
    return { error: true, errorMessage: e.message };
  }

  let notifications = await res.json();

  if (notifications === null) {
    notifications = [
      {
        state: state,
        details: statusDetails,
        time: new Date().valueOf(),
        orderId: orderId,
      },
    ];
  } else {
    notifications.push({
      state: state,
      details: statusDetails,
      time: new Date().valueOf(),
      orderId: orderId,
    });
  }

  try {
    let res2 = await fetch(
      `https://repair-45f86-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${customerId}.json?auth=${accessToken}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Notifications: notifications }),
      }
    );

    if (res2.status !== 200) {
      throw new Error(
        "There is an Error. Cann't add new notification in database"
      );
    }
  } catch (e) {
    return { error: true, errorMessage: e.message };
  }
};

const saveStatus = async (
  customerId,
  orderId,
  accessToken,
  state,
  statusDetails
) => {
  let res;

  try {
    res = await fetch(
      `https://repair-45f86-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${customerId}/Orders/${orderId}/status.json?auth=${accessToken}`
    );

    if (res.status !== 200) {
      throw new Error("There is an Error. Cann't fetch status from database");
    }
  } catch (e) {
    return { error: true, errorMessage: e.message };
  }

  let status = await res.json();

  if (status === null) {
    status = [
      {
        state: state,
        details: statusDetails,
        time: new Date().valueOf(),
      },
    ];
  } else {
    status.push({
      state: state,
      details: statusDetails,
      time: new Date().valueOf(),
    });
  }

  try {
    let res2 = await fetch(
      `https://repair-45f86-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${customerId}/Orders/${orderId}.json?auth=${accessToken}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: status }),
      }
    );
    if (res2.status !== 200) {
      throw new Error("There is an Error. Cann't add new status in database");
    }
  } catch (e) {
    return { error: true, errorMessage: e.message };
  }
};

const sendNotificationToExpo = async (
  //https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api
  status,
  statusDetails,
  orderId,
  expoPushToken
) => {
  try {
    await fetch("https://exp.host/--/api/v2/push/send", {
      mode: "no-cors",
      method: "POST",
      headers: {
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        to: expoPushToken,
        sound: "default",
        title: status,
        body: statusDetails,
        data: { data: orderId },
      }),
    });
  } catch (e) {
    return { error: true, errorMessage: e.message };
  }
};

const saveData = async (
  customerId,
  orderId,
  accessToken,
  problem,
  note,
  agent,
  technician,
  amount
) => {
  let res;

  try {
    res = await fetch(
      `https://repair-45f86-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${customerId}/Orders/${orderId}.json?auth=${accessToken}`
    );
    if (res.status !== 200) {
      throw new Error(
        "There is an Error. Cann't fetch Order Details from database"
      );
    }
  } catch (e) {
    return { error: true, errorMessage: e.message };
  }

  const allDetails = await res.json();

  const data = {
    problem: problem
      ? problem
      : allDetails.problem === undefined
      ? null
      : allDetails.problem,
    note: note ? note : allDetails.note === undefined ? null : allDetails.note,
    agent: agent
      ? agent
      : allDetails.agent === undefined
      ? null
      : allDetails.agent,
    technician: technician
      ? technician
      : allDetails.technician === undefined
      ? null
      : allDetails.technician,
    amount: amount
      ? amount
      : allDetails.amount === undefined
      ? null
      : allDetails.amount,
  };

  try {
    let res2 = await fetch(
      `https://repair-45f86-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${customerId}/Orders/${orderId}.json?auth=${accessToken}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (res2.status !== 200) {
      throw new Error(
        "There is an Error. Cann't add order details in database"
      );
    }
  } catch (e) {
    return { error: true, errorMessage: e.message };
  }
};

const OrderToDB = async (data, accessToken) => {
  const customerId = data.customerId;
  const orderId = data.orderId;

  let result;

  if (data.status && data.statusDetails) {
    let res = await fetch(
      `https://repair-45f86-default-rtdb.asia-southeast1.firebasedatabase.app/users/${customerId}/expoPushToken.json?auth=${accessToken}`
    );
    const expoPushToken = await res.json(); //There is a expo token in the firebase that we save eairly

    if (expoPushToken.error) {
      return {
        error: true,
        errorMessage: "Error to get the expoPushToken from user Database",
      };
    }

    result = await sendNotificationToExpo(
      data.status,
      data.statusDetails,
      orderId,
      expoPushToken
    );

    if (result ? result.error : false) {
      return {
        error: true,
        errorMessage: result.errorMessage,
      };
    }

    result = await saveNotification(
      customerId,
      accessToken,
      data.status,
      data.statusDetails,
      orderId
    );

    if (result ? result.error : false) {
      return {
        error: true,
        errorMessage: result.errorMessage,
      };
    }

    result = await saveStatus(
      customerId,
      orderId,
      accessToken,
      data.status,
      data.statusDetails
    );

    if (result ? result.error : false) {
      return {
        error: true,
        errorMessage: result.errorMessage,
      };
    }
  }

  result = await saveData(
    customerId,
    orderId,
    accessToken,
    data.problem,
    data.note,
    data.agent,
    data.technician,
    data.amount
  );

  if (result ? result.error : false) {
    return {
      error: true,
      errorMessage: result.errorMessage,
    };
  }

  return {
    error: false,
    successMessage: "Successfully updated",
  };
};

export const handleSubmit = async (
  event,
  setValidated,
  customerId,
  orderId,
  accessToken
) => {
  const form = event.currentTarget;
  event.preventDefault();

  if (form.checkValidity() === false) {
    event.stopPropagation();
  } else {
    let statusDetails = null;
    if (event.target.status.value !== "Select") {
      let index = event.target.status.selectedIndex;
      let optionElement = event.target.status.childNodes[index];
      statusDetails = optionElement.getAttribute("id");
    }
    const data = {
      problem: event.target.problem.value,
      note: event.target.note.value,
      status:
        event.target.status.value === "Select"
          ? null
          : event.target.status.value,
      statusDetails: statusDetails,
      customerId: customerId,
      orderId: orderId,
      agent: event.target.agent ? event.target.agent.value : null,
      technician: event.target.technician
        ? event.target.technician.value
        : null,
      amount: event.target.amount ? event.target.amount.value : null,
    };

    const result = await OrderToDB(data, accessToken);
    if (result.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result.errorMessage,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: result.successMessage,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  setValidated(true);
};

//Without any backend

export const getOrders = async (accessToken) => {
  const res = await fetch(
    `https://repair-45f86-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json?auth=${accessToken}`
  );
  const data = await res.json();

  if (data ? data.error : false) {
    return data;
  }

  let allOrders = [];

  for (let item in data) {
    if (data[item].Orders) {
      for (let order in data[item].Orders) {
        data[item].Orders[order].customerId = item;
        data[item].Orders[order].orderId = order;
        allOrders.push(data[item].Orders[order]);
      }
    }
  }

  return allOrders;
};
