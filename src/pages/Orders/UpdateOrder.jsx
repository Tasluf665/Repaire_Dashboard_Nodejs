import React from "react";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

import useAddUpdateToDB from "../../hooks/useAddUpdateToDB";
import WrapperComponent from "../../components/custome/WrapperComponent";
import { useAuth } from "../../context/AuthContext";
import {
  reducer,
  initialState,
  ERROR,
  LOADING,
  FETCH_DATA_FROM_SERVER,
} from "../../reducers/OrderReducer.js";

import FormTitle from "../../features/Form/FormTitle";
import Input from "../../features/Form/Input";
import Select from "../../features/Form/Select";
import SubmitButton from "../../features/Form/SubmitButton";

export default function UpdateOrder(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [edit, setEdit] = React.useState(false);
  const [validated, setValidated] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState("Select");

  const orderId = props.location.state;
  const { currentUser } = useAuth();
  const { updateToServer } = useAddUpdateToDB(dispatch);

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
        title: `Order has been updated`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleSubmit = async (event, setValidated) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (event.target.status.value === "Accepted") {
      let data = {
        problem: event.target.problem.value,
        note: event.target.note.value,
        statusDetails: "Your order has been accepted",
        statusState: "Accepted",
      };
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/orders/accept/${orderId}`,
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
      showResultAnimation(result);
    } else if (event.target.status.value === "Technician Assigned") {
      let index = event.target.technician.selectedIndex;
      let optionElement = event.target.technician.childNodes[index];
      let technicianId = optionElement.getAttribute("id");

      let data = {
        technicianId,
        statusDetails: "Technician has been assigned to your order",
        statusState: "Technician Assigned",
      };

      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/orders/assigned/${orderId}`,
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
      showResultAnimation(result);
    } else if (event.target.status.value === "Product Repaired") {
      let data = {
        amount: event.target.amount.value,
        statusDetails: "Your Product has been repaired. Please pay your bill",
        statusState: "Product Repaired",
      };

      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/orders/repaired/${orderId}`,
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
      showResultAnimation(result);
    }
  };

  const DisableInputItem = () => {
    return (
      <>
        <Input
          title="Name"
          defaultValue={state.order ? state.order.name : null}
          type="text"
          disabled={edit}
        />
        <Input
          title="Phone"
          defaultValue={state.order ? state.order.phone : null}
          type="text"
          disabled={edit}
        />
        <Input
          title="Address"
          defaultValue={state.order ? state.order.address : null}
          type="text"
          cutomeClass="col-12 mb-3"
          disabled={edit}
        />
        <Input
          title="Booking Time"
          defaultValue={
            state.order
              ? new Date(state.order.bookingTime).toLocaleDateString()
              : null
          }
          type="text"
          disabled={edit}
        />
        <Input
          title="Arrival Time"
          defaultValue={
            state.order
              ? new Date(state.order.arrivalDate).toLocaleDateString() +
                ", " +
                new Date(state.order.arrivalTime).toLocaleTimeString()
              : null
          }
          type="text"
          disabled={edit}
        />
        <Input
          title="Category"
          defaultValue={state.order ? state.order.category : null}
          type="text"
          disabled={edit}
        />
        <Input
          title="Category Type"
          defaultValue={state.order ? state.order.categoryType : null}
          type="text"
          disabled={edit}
        />
        <Input
          title="Product"
          defaultValue={state.order ? state.order.product : null}
          type="text"
          disabled={edit}
        />
        <Input
          title="Type"
          defaultValue={state.order ? state.order.type : null}
          type="text"
          disabled={edit}
        />
      </>
    );
  };

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
              order: result.order,
              technicians: allTechniciansResult.data,
              agents: allAgentsResult.data,
            },
          });
        } else {
          dispatch({ type: ERROR, value: result.error });
        }
      } catch (ex) {
        dispatch({ type: ERROR, value: ex.message });
      }
    };
    getDataFromServer();
  }, []);

  const getOptions = () => {
    let array = [
      { id: 0, value: "Select" },
      { id: 1, value: "Pending" },
      { id: 2, value: "Accepted" },
      { id: 3, value: "Technician Assigned" },
      { id: 4, value: "Product Repaired" },
      { id: 5, value: "Payment Complete" },
    ];
    return array.map((item) => (
      <option id={item.id} key={item.id}>
        {item.value}
      </option>
    ));
  };

  const getSelectOptions = (array) => {
    return array.map((item) => (
      <option id={item._id} key={item._id}>
        {item.name + ", " + item.area}
      </option>
    ));
  };

  const getTargetAgent = (technicianId) => {
    const technician = state.technicians.find(
      (item) => item._id === technicianId
    );
    const agent = technician.agent;
    const text = `${agent.name}, ${agent.phone}, ${agent.city}, ${agent.region}`;
    return text;
  };

  const getTargetTechnician = (technicianId) => {
    const technician = state.technicians.find(
      (item) => item._id === technicianId
    );
    const text = `${technician.name}, ${technician.phone}, ${technician.city}, ${technician.region}`;
    return text;
  };

  return (
    <WrapperComponent error={state.error} loading={state.loading}>
      <div className="col-12 d-flex justify-content-center">
        <div className="col-10">
          <FormTitle title={`Update Order`}>
            <Button
              variant=""
              style={styles.button}
              type="submit"
              onClick={() => setEdit(true)}
            >
              Edit
            </Button>
          </FormTitle>
          <Form
            className="col-12 row"
            noValidate
            validated={validated}
            onSubmit={(event) => handleSubmit(event, setValidated)}
          >
            {DisableInputItem()}
            <Input
              title="Problem"
              defaultValue={state.order ? state.order.problem : null}
              type="text"
              name="problem"
              cutomeClass="col-12 mb-3"
            />
            <Input
              title="Note"
              defaultValue={state.order ? state.order.note : null}
              type="text"
              name="note"
            />
            {edit ? (
              <Select
                title="Status"
                name="status"
                options={getOptions()}
                onChange={(value) => setSelectedStatus(value.target.value)}
              />
            ) : (
              <Input
                title="Status"
                defaultValue={
                  state.order
                    ? state.order.status[state.order.status.length - 1]
                        .statusState
                    : null
                }
                type="text"
              />
            )}

            {edit ? (
              selectedStatus === "Technician Assigned" ? (
                <>
                  <Select
                    customeClass="col-12 mb-3"
                    title="Agent"
                    name="agnet"
                    options={getSelectOptions(state.agents)}
                  />
                  <Select
                    customeClass="col-12 mb-3"
                    title="Technician"
                    name="technician"
                    options={getSelectOptions(state.technicians)}
                  />
                </>
              ) : null
            ) : null}

            {state.order &&
            state.order.technicianId &&
            selectedStatus !== "Technician Assigned" ? (
              <>
                <Input
                  title="Agent"
                  defaultValue={getTargetAgent(state.order.technicianId)}
                  type="text"
                  cutomeClass="col-12 mb-3"
                  disabled={edit}
                />
                <Input
                  title="Technician"
                  defaultValue={getTargetTechnician(state.order.technicianId)}
                  type="text"
                  cutomeClass="col-12 mb-3"
                  disabled={edit}
                />
              </>
            ) : null}

            {edit ? (
              selectedStatus === "Product Repaired" ? (
                <Input title="Amount" type="text" name="amount" />
              ) : null
            ) : null}

            {state.order &&
            state.order.amount &&
            selectedStatus !== "Product Repaired" ? (
              <Input
                title="Amount"
                defaultValue={state.order.amount}
                type="text"
                disabled={!edit}
              />
            ) : null}

            {edit ? <SubmitButton title="Update" /> : null}
          </Form>
        </div>
      </div>
    </WrapperComponent>
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
