import React, { useState } from "react";

import { updateAgent } from "../../server/Agent";
import CommonUpdatePage from "../../components/custome/CommonUpdatePage";

export default function UpdateAgents(props) {
  const [edit, setEdit] = useState(false);
  return (
    <CommonUpdatePage
      title="Agent"
      location={props.location}
      handleSubmit={updateAgent}
      edit={edit}
      setEdit={setEdit}
    />
  );
}
