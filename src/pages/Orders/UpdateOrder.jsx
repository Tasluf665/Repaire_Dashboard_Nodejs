import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import CustomeInput from "../../components/custome/CustomeInput";
import CenterButton from "../../components/custome/CenterButton";
import CustomeFormGroup from "../../components/custome/CustomeFormGroup";
import CustomeSpinner from "../../components/custome/CustomeSpinner";
import CustomeAgentDropdown from "../../components/custome/CustomeAgentDropdown";
import { handleSubmit } from "../../server/Order";
import { getAgents } from "../../server/Agent";
import { getTechnicians } from "../../server/Technician";
import { useAuth } from "../../context/AuthContext";

export default function UpdateOrder(props) {
  const [edit, setEdit] = useState(false);
  const [validated, setValidated] = useState(false);
  const [statusValue, setStatusValue] = useState(true);
  const [allAgents, setAllAgents] = React.useState();
  const [allTechnicians, setAllTechnicians] = React.useState([]);
  const [accessToken, setAccessToken] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState();

  const { currentUser, logout } = useAuth();

  React.useEffect(() => {
    const getData = async () => {
      let token = await currentUser.accessToken;
      setAccessToken(token);
      const allAgents = await getAgents(token);
      const allTechnicians = await getTechnicians(token);

      if (allTechnicians.error || allAgents.error) {
        if (allAgents.error === "Auth token is expired") {
          logout();
        }
        setError(allAgents.error);
      } else {
        setAllAgents(allAgents);
        setAllTechnicians(allTechnicians);
        setLoading(false);
      }
    };
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getOptions = (array) => {
    return array.map((item) => (
      <option id={item.details} key={item.title}>
        {item.title}
      </option>
    ));
  };

  const options = [
    {
      title: "Select",
      details: "",
    },
    {
      title: "Pending",
      details: "Your Request is pending now",
    },
    {
      title: "Accepted",
      details: "Your request has been accepted",
    },

    {
      title: "Technician Assigned",
      details: "Technician Assigned has been assigned for you",
    },
    {
      title: "Product Repaired",
      details: "Your product has been repaired",
    },
    {
      title: "Payment Complete",
      details: "We have receive your payment",
    },
  ];

  const getSelectedAgent = (agentId) => {
    const targetagent = allAgents.find((item) => item.key === agentId);
    return (
      targetagent.name +
      ", " +
      targetagent.phone +
      ", " +
      targetagent.region +
      ", " +
      targetagent.city
    );
  };

  const getSelectedTechnician = (technicianId) => {
    const targetTechnician = allTechnicians.find(
      (item) => item.key === technicianId
    );
    return (
      targetTechnician.name +
      ", " +
      targetTechnician.phone +
      ", " +
      targetTechnician.region +
      ", " +
      targetTechnician.city
    );
  };

  const paymentInfo = () => {
    let total = 0;
    for (let item in state.Payment) {
      total =
        total +
        Number(
          state.Payment[item].paymentInfo.Total_Amount.replace("৳", "").trim()
        );
    }
    return total;
  };

  const state = props.location.state;

  return (
    <div>
      {loading ? (
        <CustomeSpinner />
      ) : (
        <>
          {error ? (
            <div
              className="col-12 d-flex justify-content-center"
              style={{ marginTop: "30px" }}
            >
              <h1>{error}</h1>
            </div>
          ) : (
            <div className="col-12 d-flex justify-content-center">
              <div className="col-10">
                <div className="d-flex justify-content-between">
                  <h2 className="col-12 mb-4">Update Order</h2>
                  <div className="h-50">
                    <Button
                      variant=""
                      style={styles.button}
                      type="submit"
                      onClick={() => setEdit(true)}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
                <Form
                  className="col-12 row"
                  noValidate
                  validated={validated}
                  onSubmit={(event) =>
                    handleSubmit(
                      event,
                      setValidated,
                      state.customerId,
                      state.orderId,
                      accessToken
                    )
                  }
                >
                  <CustomeInput
                    title="Name"
                    defaultValue={state.name}
                    type="text"
                    disabled={edit}
                  />
                  <CustomeInput
                    title="Phone"
                    defaultValue={state.phone}
                    type="text"
                    disabled={edit}
                  />
                  <CustomeInput
                    title="Address"
                    defaultValue={state.address}
                    type="text"
                    cutomeClass="col-12 mb-3"
                    disabled={edit}
                  />
                  <CustomeInput
                    title="Booking Time"
                    defaultValue={`${new Date(state.bookingTime).getDate()}-${
                      new Date(state.bookingTime).getMonth() + 1
                    }-${new Date(state.bookingTime).getFullYear()}`}
                    type="text"
                    disabled={edit}
                  />
                  <CustomeInput
                    title="Arrival Time"
                    defaultValue={`${state.date},  ${state.time}`}
                    type="text"
                    disabled={edit}
                  />
                  <CustomeInput
                    title="Category"
                    defaultValue={state.category}
                    type="text"
                    disabled={edit}
                  />
                  <CustomeInput
                    title="Category Type"
                    defaultValue={state.categoryType}
                    type="text"
                    disabled={edit}
                  />
                  <CustomeInput
                    title="Product"
                    defaultValue={state.product}
                    type="text"
                    disabled={edit}
                  />
                  <CustomeInput
                    title="Type"
                    defaultValue={state.type}
                    type="text"
                    disabled={edit}
                  />
                  <CustomeInput
                    title="Problem"
                    defaultValue={state.problem}
                    type="text"
                    cutomeClass="col-12 mb-3"
                  />
                  <CustomeInput
                    title="Note"
                    defaultValue={state.note}
                    type="text"
                  />
                  {edit ? (
                    <CustomeFormGroup title="Status">
                      <Form.Select
                        aria-label="Default select example"
                        name="status"
                        value={statusValue}
                        onChange={(event) => setStatusValue(event.target.value)}
                      >
                        {getOptions(options)}
                      </Form.Select>
                    </CustomeFormGroup>
                  ) : (
                    <CustomeInput
                      title="Status"
                      defaultValue={state.status[state.status.length - 1].state}
                      type="text"
                    />
                  )}

                  {statusValue === "Technician Assigned" ? (
                    <>
                      <CustomeAgentDropdown allAgents={allAgents} />
                      <CustomeAgentDropdown
                        allAgents={allTechnicians}
                        title="Technician"
                      />
                    </>
                  ) : null}

                  {state.agent && statusValue !== "Technician Assigned" ? (
                    <CustomeInput
                      title="Agent Details"
                      cutomeClass="col-12 mb-3"
                      defaultValue={getSelectedAgent(state.agent)}
                      type="text"
                      disabled={edit}
                    />
                  ) : null}

                  {state.technician && statusValue !== "Technician Assigned" ? (
                    <CustomeInput
                      title="Technician Details"
                      cutomeClass="col-12 mb-3"
                      defaultValue={getSelectedTechnician(state.technician)}
                      type="text"
                      disabled={edit}
                    />
                  ) : null}

                  {state.amount || statusValue === "Product Repaired" ? (
                    <CustomeInput
                      title="Amount"
                      defaultValue={state.amount}
                      type="text"
                    />
                  ) : null}

                  {state.Payment ? (
                    <CustomeInput
                      title="Customer Payment"
                      defaultValue={paymentInfo()}
                      type="text"
                      disabled={true}
                    />
                  ) : null}

                  {edit ? <CenterButton title="Update" /> : null}
                </Form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const styles = {
  button: {
    paddingLeft: 35,
    paddingRight: 35,
    backgroundColor: "var(--main-color)",
    color: "var(--txt-white)",
  },
};
