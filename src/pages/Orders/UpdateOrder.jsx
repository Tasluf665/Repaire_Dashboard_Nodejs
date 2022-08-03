import React from "react";
import { Form, Button } from "react-bootstrap";

import WrapperComponent from "../../components/custome/WrapperComponent";
import { reducer, initialState } from "../../reducers/OrderReducer.js";
import useOrder from "../../hooks/useOrder";

import FormTitle from "../../features/Form/FormTitle";
import SubmitButton from "../../features/Form/SubmitButton";
import DisableInputItem from "./component/DisableInputItem";
import StatusInput from "./component/StatusInput";
import ProblemNoteInput from "./component/ProblemNoteInput";
import AgentTechnicianItem from "./component/AgentTechnicianItem";
import AmountItem from "./component/AmountItem";

export default function UpdateOrder(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [edit, setEdit] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState("Select");

  const { handleSubmit } = useOrder(dispatch, props.location.state);

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
            onSubmit={(event) => handleSubmit(event)}
          >
            <DisableInputItem state={state} edit={edit} />
            <ProblemNoteInput order={state.order} />
            <StatusInput
              edit={edit}
              setSelectedStatus={setSelectedStatus}
              order={state.order}
            />
            <AgentTechnicianItem
              edit={edit}
              selectedStatus={selectedStatus}
              state={state}
            />
            <AmountItem
              edit={edit}
              selectedStatus={selectedStatus}
              order={state.order}
            />
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
